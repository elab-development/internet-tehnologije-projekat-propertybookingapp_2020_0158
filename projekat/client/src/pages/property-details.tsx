/* eslint-disable no-restricted-globals */
import { Typography, Box, Stack} from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";


import {
    ChatBubble,
    Delete,
    Edit,
    Phone,
    Place,
} from "@mui/icons-material";


import { AuthProvider } from "@pankod/refine-core";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";
import axios from "axios";

import { CustomButton } from "components";

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}







const PropertyDetails = () => {


//////////////////ADMIN/////////////////////
//authProvider nekretnine koji se koristi u React aplikacijama za upravljanje autentikacijom korisnika.
// nekretnine ima pet funkcija: login, logout, checkError, checkAuth i getUserIdentity.
    const authProvider: AuthProvider = {
        
//login se poziva kada se korisnik uloguje. Ona prima podatke o korisnikovom autentifikacionom token-u kao argument.
// U ovoj funkciji se proverava da li je autentifikacioni token ispravan i, ako jeste, izdvoji se profileObj koji sadrži 
//podatke o korisniku. 
//Zatim se korisnikov name, email i avatar sačuvaju u bazi podataka, a zatim se kreira nekretnine user 
//koji se skladišti u localStorage. Ako je korisnik admin, to se takođe označava u localStorage.
        login: async({ credential }: CredentialResponse) => {
          const profileObj = credential ? parseJwt(credential) : null;
    
          //save user to mongodb
          if(profileObj){
            const response = await fetch('http://localhost:8080/api/v1/users', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                name: profileObj.name,
                email: profileObj.email,
                avatar: profileObj.picture,
              })
            })
    
            const data = await response.json();
    
            if(response.status === 200) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...profileObj,
                avatar: profileObj.picture,
                userid:data._id
              })
            );
              // proveri da li je  admin i oznaci u bazi
              if (profileObj.email === "nekretnine.web2024@gmail.com") {
                localStorage.setItem("isAdmin", "true");
              } else {
                localStorage.removeItem("isAdmin");
              }
            }
            else {
                 //autentifikacija neuspesna
              return Promise.reject()
            }
          }     
    
          localStorage.setItem("token", `${credential}`);
    //autentifikacija uspesna
          return Promise.resolve();
        },

        //Funkcija logout se poziva kada se korisnik izloguje. Ona briše podatke o korisniku, token-u i postavlja isAdmin na null.
        logout: () => {
          const token = localStorage.getItem("token");
    
          if (token && typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("isAdmin");
            axios.defaults.headers.common = {};
            window.google?.accounts.id.revoke(token, () => {
              return Promise.resolve();
            });
          }
    
          return Promise.resolve();
        },

        //Funkcija checkError se poziva kada se desi greška u autentikaciji.
        checkError: () => Promise.resolve(),

        //Funkcija checkAuth se poziva kako bi se proverilo da li je korisnik ulogovan. 
//Ona proverava postoji li token u localStorage i u zavisnosti od toga, vraća Promise.resolve() ili Promise.reject().
        checkAuth: async () => {
          const token = localStorage.getItem("token");
    
          if (token) {
            return Promise.resolve();
          }
          return Promise.reject();
        },
    
        getPermissions: () => Promise.resolve(),

         //Funkcija getUserIdentity se poziva kako bi se dobili podaci o trenutno ulogovanom korisniku.
    // Ona proverava postoji li korisnik u localStorage i u zavisnosti od toga, vraća Promise.resolve() ili Promise.reject().
        getUserIdentity: async () => {
          const user = localStorage.getItem("user");
          if (user) {
            return Promise.resolve(JSON.parse(user));
          }
        },
      };
    //kreranje promenjive isAdmin samo ukoliko je u bazi data kolona true
      const isAdmin = localStorage.getItem("isAdmin") === "true";
//////////////////////////////////////KRAJ ADMINA////////////////////////////////////////////////////////////

    const navigate = useNavigate();
    const { data: user } = useGetIdentity();
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    //useParams() je kuka iz React Routera koja se koristi za dobijanje parametara id.
    const { id } = useParams();

    const { data, isLoading, isError } = queryResult;

    const PropertyDetails = data?.data ?? {};

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    const isCurrentUser = user.email === PropertyDetails.creator.email;

   


    {/*za brisanje nekretnine*/}
    //handleDeleteProperty() funkcija se poziva kada korisnik klikne na dugme za brisanje nekretnine.
    // U ovoj funkciji se prikazuje prozor za potvrdu brisanja, a ako korisnik potvrdi brisanje, poziva 
    //se funkcija mutate() koja briše nekretnine. U slučaju uspešnog brisanja, korisnik se preusmerava na stranicu sa listom nekretnine.
    const handleDeleteProperty = () => {
        const response = confirm(
            "Are you sure you want to delete this property?",
        );
        if (response) {
            mutate(
                {
                    resource: "properties",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/properties");
                    },
                },
            );
        }
    };




    return (
        <Box
            borderRadius="15px"
            padding="20px"
            sx={{
                backgroundImage:'url("https://c4.wallpaperflare.com/wallpaper/542/50/545/simple-background-blue-simple-minimalism-wallpaper-preview.jpg")',
                backgroundSize: 'cover', // Make the background image cover the entire content box
            }}
            width="100%"
        >
            <Typography fontSize={25} fontWeight={700} color="#fff" fontFamily="Zen Maru Gothic">
                Vise o nekretnini:
            </Typography>

            <Box
                mt="20px"
                display="flex"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <Box flex={1} maxWidth={764}>
                    <img
                        src={PropertyDetails.photo}
                        alt="property-details-img"
                        height={546}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                        className="property-details-img"
                    />

                    <Box mt="15px">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            <Typography
                                fontSize={25}
                                fontWeight={500}
                                color="#fff"
                                textTransform="capitalize"
                                fontFamily="Zen Maru Gothic"
                            >
                                Tip Nekretnine: {
                                (PropertyDetails.propertyType === "Stanovi")?
                                "Stan"
                                :
                                (PropertyDetails.propertyType === "Kuce")?
                                "Kuca"
                                :
                                (PropertyDetails.propertyType === "Apartmani")?
                                "Apartman"    
                                :
                                (PropertyDetails.propertyType === "Vikendice")?
                                "Vikendica"    
                                :
                                (PropertyDetails.propertyType === "Komercijalne Nekretnine")?
                                "Komercijalna Nekretnina"    
                                :
                                (PropertyDetails.propertyType === "Zemljista")?
                                "Zemljiste"    
                                :
                                ""
                                }
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={30}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#fff"
                                    fontFamily="Zen Maru Gothic"
                                >
                                    {PropertyDetails.title}
                                </Typography>
                                <Stack
                                    mt={0.5}
                                    direction="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                    <Place sx={{ color: "#7CB9E8", fontSize: "35px" }} />
                                    <Typography fontSize={25} color="#fff" fontFamily="Zen Maru Gothic">
                                        {PropertyDetails.location}
                                    </Typography>
                                </Stack>
                            </Box>

                            <Box>
                                <Typography
                                    fontSize={30}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#fff"
                                    fontFamily="Zen Maru Gothic"
                                >
                                    Cena:
                                </Typography>
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    gap={1}
                                >
                                    <Typography
                                        fontSize={35}
                                        fontWeight="bolder"
                                        color="#7CB9E8"
                                        fontFamily="Zen Maru Gothic"
                                        fontStyle="italic"
                                    >
                                        {PropertyDetails.price}€
                                    </Typography>
                                    <Typography
                                        fontSize={14}
                                        color="#fff"
                                        mb={0.5}
                                    >
                                        
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={30} fontWeight="bolder" color="#fff" fontFamily="Zen Maru Gothic">
                                Opis:
                            </Typography>
                            <Typography fontSize={25} color="#fff" sx={{ textAlign: "justify"}} fontFamily="Zen Maru Gothic">
                                {PropertyDetails.description}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    <Stack
                        marginLeft="115px"
                        width="100%"
                        p={3}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            backgroundImage:'url("https://media.istockphoto.com/id/170958625/photo/dark-blue-grunge-background.jpg?b=1&s=612x612&w=0&k=20&c=Njqazg0TAFGwJfTa9a6ByWvlumaa3wvtnEjdOgvwa1w=")',
                        }}
                        border="3.5px solid #7CB9E8"
                        borderRadius={2}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(PropertyDetails.creator.avatar)
                                        ? PropertyDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    objectFit: "cover",
                                    border: "3.5px solid #7CB9E8", // Specifies the border style, width, and color
                                    borderRadius: "20%", // Makes the border circular
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={20}
                                    fontWeight={600}
                                    color="#fff"
                                    fontFamily="Zen Maru Gothic"
                                >
                                    {PropertyDetails.creator.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={20}
                                    fontWeight={400}
                                    color="#fff"
                                    fontFamily="Zen Maru Gothic"
                                >
                                    Menadzer nekretnina:
                                </Typography>
                            </Box>

                            <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <Place sx={{ color: "#7CB9E8", fontSize: "30px" }} />
                                <Typography
                                    fontSize={20}
                                    fontWeight={400}
                                    color="#fff"
                                    fontFamily="Zen Maru Gothic"
                                >
                                    Beograd, Srbija
                                </Typography>
                            </Stack>

                            {PropertyDetails.creator && (
                                <Typography
                                    mt={1}
                                    fontSize={20}
                                    fontWeight={600}
                                    color="#fff"
                                    fontFamily="Zen Maru Gothic"
                                >
                                    {PropertyDetails.creator.allProperties.length} Nekretnina
                                </Typography>
                            )}
                        </Stack>

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="column"
                            flexWrap="wrap"
                            gap={2}
                        >

                                {/*menjanje dugmeta u zavisnosti da li je admin ili ne*/}
                          {isAdmin ? (<CustomButton
                                title={"Izmeni"}
                                backgroundColor="#7CB9E8"
                                color="#FCFCFC"
                                fullWidth
                                icon={
                                     <Edit />
                                }
                                handleClick={() => {
                                    
                                        navigate(
                                            `/properties/edit/${PropertyDetails._id}`,
                                        );
                                }}
                            />) : (
                                <CustomButton
                                title={!isCurrentUser ? "Posalji poruku" : "Izmeni"}
                                backgroundColor="#7CB9E8"
                                color="#FCFCFC"
                                fullWidth
                                icon={
                                    !isCurrentUser ? <ChatBubble /> : <Edit />
                                }
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        navigate(
                                            `/properties/edit/${PropertyDetails._id}`,
                                        );
                                    } else{
                                        window.open('https://www.whatsapp.com/', '_blank');
                                    }
                                }}
                            />
                          )}
                                {/*menjanje dugmeta u zavisnosti da li je admin ili ne*/}
                            {isAdmin ? (
                            <CustomButton
                                title={"Obrisi"}
                                backgroundColor={
                                     "#7CB9E8"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={<Delete />}
                                handleClick={() => {
                                    handleDeleteProperty();
                                }}
                            />
                            ) : (
                                <CustomButton
                                title={!isCurrentUser ? "Pozovi" : "Obrisi"}
                                backgroundColor={
                                    !isCurrentUser ? "#7CB9E8" : "#7CB9E8"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={!isCurrentUser ? <Phone /> : <Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) handleDeleteProperty();
                                    else{
                                        window.open('https://www.whatsapp.com/', '_blank');
                                    }
                                }}
                            />
                          )}
  

                        </Stack>
                    </Stack>
                </Box>


        </Box>  
        <br></br>
            <Typography fontSize={30} fontWeight="bolder" color="#fff" fontFamily="Zen Maru Gothic" fontStyle="italic">
            360° Slika nekretnine 
            </Typography>
            <Box mt="20px">
                <Box maxWidth={1500}> 
                    <iframe
                        src={PropertyDetails.image360}
                        width="100%"  // Use width="100%" to make the iframe fill the container
                        height={546}
                        style={{ objectFit: "cover", border: "3.5px solid #7CB9E8", // Specifies the border style, width, and color
                        borderRadius: "20%", }}
                        className="property-360-img"
                    />
                </Box>
            </Box>


            <Box sx={{marginTop:"15px"}}>   
                    {isAdmin ? null : (
                        <CustomButton
                            title="Zakazi pregled date nekretnine uzivo"
                            backgroundColor="#7CB9E8"
                            color="#FCFCFC"
                            fullWidth
                            handleClick ={ () => {
                                alert('Termin uspesno zakazan!');
                              }}
                        />
                        )}
            </Box>


        </Box>
        
)};



export default PropertyDetails;