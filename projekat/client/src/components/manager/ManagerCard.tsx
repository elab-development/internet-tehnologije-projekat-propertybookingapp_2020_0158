import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

import { useGetIdentity } from "@pankod/refine-core";
import { Box, Stack, Typography, color } from "@pankod/refine-mui";
import { Link } from "@pankod/refine-react-router-v6";

import { ManagerCardProp, InfoBarProps } from "interfaces/manager";

//checkImage prima url kao argument i proverava da li je slika sa ovog URL-a učitana i da li ima dimenzije različite od nule
function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}


//provera da li je link

const isLink = (str: string): boolean => {
    if(str.includes("https")){
        return true;
    }

    // Check if the string matches the URL regex
    return false;
};



//Komponenta InfoBar prikazuje ikonu i tekst. Prima automobil InfoBarProps koji ima dva svojstva: icon i name. 
//icon prikazuje ikonu koja se prosleđuje, a name prikazuje tekst. 
const InfoBar = ({ icon, name }: InfoBarProps) => (
    <Stack
        flex={1}
        minWidth={{ xs: "100%", sm: 300 }}
        gap={1.5}
        direction="row"
    >
        {icon}

       { (isLink(name))  ?         
        
        <Typography  fontSize={18} color="#fff" sx={{fontFamily:"Zen Maru Gothic", marginTop:"8px"}}>
            <a href={name} style={{color:"white"}}>{name}</a>
        </Typography>
        
        :


        <Typography fontSize={18} color="#fff" sx={{fontFamily:"Zen Maru Gothic", marginTop:"8px"}}>
            {name}
        </Typography> }
    </Stack>
);

const ManagerCard = ({
    id,
    name,
    email,
    avatar,
    noOfProperties,
}: ManagerCardProp) => {
    const { data: currentUser } = useGetIdentity();

    const generateLink = () => {
        //ako je to taj user ide odmah na njegov profil
        if (currentUser.email === email) return "/my-profile";

        //u suprotnom prikazuje izabranog menadzera
        return `/managers/show/${id}`;
    };

    return (
        <Box

            width="100%"
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: "20px",
                padding: "20px",
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
                },
            }}
        >
            <img
                src={
                    checkImage(avatar)
                        ? avatar
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                alt="user"
                width={90}
                height={90}
                style={{ objectFit: "cover",
                    border: "3px solid #7CB9E8", // Specifies the border style, width, and color
                    borderRadius: "20%", // Makes the border circular
                   }}
            />
            <Stack
                direction="column"
                justifyContent="space-between"
                flex={1}
                gap={{ xs: 3, sm: 2 }}
            >
                <Stack
                    gap={2}
                    direction="row"
                    flexWrap="wrap"
                    alignItems="center"
                >
                    <Typography fontSize={22} fontWeight={600} color="#fff" fontFamily="Zen Maru Gothic"                     component={Link}
                    //navigacija koja je prethodno definisana
                    to={generateLink()}>
                        {name}
                    </Typography>
                    <Typography fontSize={16} fontWeight={1500} color="#00CED1" fontFamily="Zen Maru Gothic" sx={{fontWeight:"bolder", marginTop:"10px",}}>
                        Menadzer Nekretnina
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    alignItems="center"
                    overflow="auto"
                    gap={1}
                >
                    <InfoBar
                        icon={<AttachEmailIcon sx={{ fontWeight: "1500", color: "#00CED1", height: "40px", width: "40px" }} />}
                        name={email}
                    />
                    <InfoBar
                        icon={<PhoneInTalkIcon sx={{fontWeight: "1500", color: "#00CED1", height: "40px", width: "40px" }} />}
                        name="+381 3234 141"
                    />
                    <InfoBar
                        icon={<HomeWorkIcon sx={{ fontWeight: "1500", color: "#00CED1", height: "40px", width: "40px" }} />}
                        name={`${noOfProperties} Nekretnina`}
                    />
                    <InfoBar
                        icon={<GitHubIcon sx={{ fontWeight: "1500", color: "#00CED1", height: "40px", width: "40px" }} />}
                        name={`https://github.com/`}
                    />
                    <InfoBar
                        icon={<LinkedInIcon sx={{ fontWeight: "1500", color: "#00CED1", height: "40px", width: "40px" }} />}
                        name={`https://rs.linkedin.com/`}
                    />

                    <InfoBar
                        icon={<InstagramIcon sx={{ fontWeight: "1500", color: "#00CED1", height: "40px", width: "40px" }} />}
                        name={`https://www.instagram.com/`}
                    />
                </Stack>
            </Stack>
        </Box>
    );
};

export default ManagerCard;