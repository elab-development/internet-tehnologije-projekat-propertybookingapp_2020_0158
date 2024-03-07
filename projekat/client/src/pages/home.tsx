import { useList } from '@pankod/refine-core';

import { useEffect, useState } from 'react';

import{ Typography, Box} from '@pankod/refine-mui'

import myImage from '../assets/city1.gif'; 
import myImage2 from '../assets/city2.gif';

import{
    PropertyCard
} from 'components';
 

const Home = () => {
    {/*za vracanje auta koristimo ovu kuku */}
    const {data, isLoading, isError} = useList({
        resource:'properties',
        config: {
            pagination:{
            pageSize: 6
            }
        }


    })


    // State to hold the total number of properties
    const [totalProperties, setTotalProperties] = useState<number>(0);

    useEffect(() => {
        // Calculate the total number of properties
        if (data) {
            setTotalProperties(data.total);
        }
    }, [data]);

//koristi se opcionalni operator ?. da bi se izbeglo pristupanje undefined vrednostima 
//u objektu data. Ako data ne postoji, uzmemo prazan niz umesto undefined vrednosti.
    const latestProperties = data?.data ?? [];

    if(isLoading) return <Typography>Loading...</Typography>
    if(isError) return <Typography>Something went wrong!</Typography>

    return(
        <Box sx={{ display: 'flex' ,backgroundImage:'url("https://c4.wallpaperflare.com/wallpaper/542/50/545/simple-background-blue-simple-minimalism-wallpaper-preview.jpg")',
         borderRadius:'35px', backgroundSize: 'cover',}}>
        <Box
        sx={{  flex: 1,
            backgroundImage:'url("https://c4.wallpaperflare.com/wallpaper/542/50/545/simple-background-blue-simple-minimalism-wallpaper-preview.jpg")',
            zIndex: 1, 
            padding: '20px',
            borderRadius:'35px',
            backgroundSize: 'cover',
        }}
        >
            <Typography  fontSize={25} fontWeight={700} color="#FFFFFF" sx={{fontFamily:"Zen Maru Gothic"}}>
               Homehub: Vasa pouzdana platforma za nekretnine
                 
            </Typography>
            
            
            <Box
                flex = {1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
                sx={{ backgroundImage:'url("https://media.istockphoto.com/id/170958625/photo/dark-blue-grunge-background.jpg?b=1&s=612x612&w=0&k=20&c=Njqazg0TAFGwJfTa9a6ByWvlumaa3wvtnEjdOgvwa1w=")', backgroundSize: 'cover',}}
                >
            <Typography fontSize={18} fontWeight={600} color="#FFFFFF" sx={{ textAlign: "justify", fontFamily: "Zen Maru Gothic"}}>
            Ukoliko tražite savršen dom ili želite prodati svoju nekretninu,
            Homehub je vaš najbolji saveznik. Naša inovativna web aplikacija
            nudi sve što vam je potrebno za jednostavnu i efikasnu kupovinu,
            prodaju ili iznajmljivanje nekretnina.
            Sa Homehub-om, možete pregledati širok spektar nekretnina
            sa detaljnim informacijama i fotografijama, pronaći savršeno
            mesto za vašu porodicu ili investiciju. Naša napredna pretraga
            omogućava vam da filtrirate rezultate prema vašim preferencijama,
            kao što su lokacija, cena, veličina i mnogi drugi parametri. Kao vlasnik nekretnine,
            Homehub vam pruža platformu za promociju vašeg objekta pred širokim krugom potencijalnih
            kupaca ili zakupaca. Jednostavno dodajte fotografije, opis i ostale detalje o nekretnini,
            i dopustite Homehub-u da obavi ostalo.
            Pored toga, Homehub vam pruža mogućnost da se povežete sa profesionalcima iz
            industrije nekretnina, kao što su agencije, pravni savetnici ili finansijski stručnjaci,
            kako biste osigurali glatku i uspešnu transakciju.
            Neka Homehub bude vaša prvobitna destinacija kada je
            u pitanju nekretnine - jednostavno, efikasno i pouzdano!"
            </Typography>
            <br></br>
            <Box
            id="chart"
            flex={1}
            display="flex"
            bgcolor="#fcfcfc"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            pl={3.5}
            py={2}
            gap={8}
            borderRadius="15px"
            minHeight="110px"
            width="fit-content"
            sx={{       backgroundImage:'url("https://media.istockphoto.com/id/170958625/photo/dark-blue-grunge-background.jpg?b=1&s=612x612&w=0&k=20&c=Njqazg0TAFGwJfTa9a6ByWvlumaa3wvtnEjdOgvwa1w=")'
            , backgroundSize: 'cover',}}

            >
              <img 
            src= {myImage}
            alt='property'
            style={{ 
                height: '441px', 
                width: '900px', 
                borderRadius: '10px 100px / 120px',
                marginLeft: "110px", marginRight:"110px"
              }}
            />

            </Box>
            

            </Box>


            <Box
                flex = {1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
                sx={{ backgroundImage:'url("https://media.istockphoto.com/id/170958625/photo/dark-blue-grunge-background.jpg?b=1&s=612x612&w=0&k=20&c=Njqazg0TAFGwJfTa9a6ByWvlumaa3wvtnEjdOgvwa1w=")', backgroundSize: 'cover',}}
                >
            <Typography fontSize={18} fontWeight={600} color="#FFFFFF" sx={{ textAlign: "justify", fontFamily: "Zen Maru Gothic"}}>
            Kao vlasnik nekretnine, Homehub vam pruža jednostavan način da promovišete
            svoju nekretninu i dostignete širok krug potencijalnih kupaca ili zakupaca.
            Sa našim alatima za promociju, možete privući pažnju na vašu nekretninu i postići
            brzu i uspešnu prodaju ili iznajmljivanje.
            Homehub takođe nudi mogućnost povezivanja sa stručnjacima iz industrije
            nekretnina, kao što su agenti, pravni savetnici i finansijski stručnjaci.
            Ovi profesionalci vam mogu pružiti savete i podršku tokom celog procesa kupovine
            ili prodaje nekretnine.
            Uz Homehub, pronalaženje savršenog doma ili prodaja vaše
            nekretnine nikada nije bilo lakše. Pridružite se Homehub
            zajednici danas i iskoristite sve prednosti koje naša platforma nudi!"
            </Typography>

            <br></br>
            <Box
            id="chart"
            flex={1}
            display="flex"
            bgcolor="#fcfcfc"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            pl={3.5}
            py={2}
            gap={8}
            borderRadius="15px"
            minHeight="110px"
            width="fit-content"
            sx={{       backgroundImage:'url("https://media.istockphoto.com/id/170958625/photo/dark-blue-grunge-background.jpg?b=1&s=612x612&w=0&k=20&c=Njqazg0TAFGwJfTa9a6ByWvlumaa3wvtnEjdOgvwa1w=")'
            , backgroundSize: 'cover',}}

            >
            <img src= {myImage2} alt='property' 
            style={{                 height: '441px', 
            width: '900px', 
             borderRadius: '10px 100px / 120px', marginLeft: "110px", marginRight:"110px"}} />       

            </Box>
            

            </Box>


            <Box
                flex = {1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
                sx={{ backgroundImage:'url("https://media.istockphoto.com/id/170958625/photo/dark-blue-grunge-background.jpg?b=1&s=612x612&w=0&k=20&c=Njqazg0TAFGwJfTa9a6ByWvlumaa3wvtnEjdOgvwa1w=")', backgroundSize: 'cover',}}
                >
                <Typography fontSize="18px" fontWeight={600} color="#FFFFFF" fontFamily="Zen Maru Gothic"> Najnovije nekretnine u ponudi:</Typography>
                <Box mt={2.5} sx={{display: 'flex', flexWrap:'wrap', gap:5, justifyContent: 'center'}}>
                {latestProperties.map((property) => (

                    <PropertyCard
                    key={property._id}
                    id={property._id}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    photo={property.photo}
                    />
                ))}
                </Box>

            </Box>
           
        </Box>
        </Box>
        
    )
}

export default Home