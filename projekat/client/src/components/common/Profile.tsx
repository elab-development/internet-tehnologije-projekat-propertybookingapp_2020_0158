import { Email, Phone } from "@mui/icons-material";
import { Box, Stack, Typography } from "@pankod/refine-mui";

import { ProfileProps, PropertyProps } from "interfaces/common";
import PropertyCard from "./PropertyCard";

import PieChart from "components/charts/PieChart";

import { useEffect, useState } from 'react';
import { useList } from '@pankod/refine-core';

const Profile = ({ type, name, avatar, email, properties }: ProfileProps) => {
    const { data: dataProp } = useList({
        resource: 'properties',
        config: {
            pagination: {
                pageSize: 6,
            },
        },
    });

    const [totalProperties, setTotalProperties] = useState<number>(0);

    useEffect(() => {
        if (dataProp) {
            setTotalProperties(dataProp.total);
        }
    }, [dataProp]);

    //provera url slike
    function checkImage(url: any) {
        const img = new Image();
        img.src = url;
        return img.width !== 0 && img.height !== 0;
    }

    return (
        <Box sx={{backgroundImage:'url("https://c4.wallpaperflare.com/wallpaper/542/50/545/simple-background-blue-simple-minimalism-wallpaper-preview.jpg")',
        padding:'10px', borderRadius:'25px', backgroundSize: 'cover',}}>
            {(type == 'Menadzer') ?
                    <Typography fontSize={25} fontWeight={700} color="white" fontFamily="Zen Maru Gothic">
                    Profil {type}a 
                </Typography>
            
            :
            <Typography fontSize={25} fontWeight={700} color="white" fontFamily="Zen Maru Gothic">
                {type} Profil
            </Typography>}

            <Box mt="20px" borderRadius="15px" padding="20px" sx={{ backgroundImage:'url("https://t3.ftcdn.net/jpg/04/08/46/56/360_F_408465697_fyVlbgGers3R6eV599vOFYwD81xxJR1p.jpg")',}}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 2.5,
                    }}
                >
                    <img
                        src="https://wallpapers.com/images/hd/miniature-house-real-estate-agent-bxaazfpgcg3oh7it.jpg"
                        alt="abstract"
                        className="my_profile-bg"
                        style={{borderRadius: "50% 20% / 10% 40%", width:"530px", height:"330px"}}
                    />
                    <Box
                        flex={1}
                        sx={{
                            marginTop: { md: "58px" },
                            marginLeft: { xs: "20px", md: "0px" },
                        }}
                    >
                        <Box
                            flex={1}
                            display="flex"
                            flexDirection={{ xs: "column", md: "row" }}
                            gap="20px"
                        >
                            <img
                                src={
                                    checkImage(avatar)
                                        ? avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                width={120}
                                height={120}
                                alt="user_profile"
                                className="my_profile_user-img"
                                style={{
                                    border: "3px solid #7CB9E8", // Specifies the border style, width, and color
                                    borderRadius: "20%", // Makes the border circular
                                }}
                            />

                            <Box
                                flex={1}
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-between"
                                gap="30px"
                            >
                                <Stack direction="column">
                                    <Typography
                                        fontSize={30}
                                        fontWeight={600}
                                        color="#fff"
                                        fontFamily="Zen Maru Gothic"
                                    >
                                        {name}
                                    </Typography>
                                    <Typography fontSize={22} color="#fff" fontFamily="Zen Maru Gothic">
                                        Menadzer Nekretnina
                                    </Typography>
                                </Stack>

                                <Stack direction="column" gap="30px">
                                    
                                    <Stack
                                        direction="row"
                                        flexWrap="wrap"
                                        gap="20px"
                                        pb={4}
                                    >
                                        <Stack flex={1} gap="15px">
                                            <Typography
                                                fontSize={25}
                                                fontWeight={500}
                                                color="#fff"
                                                fontFamily="Zen Maru Gothic"
                                            >
                                                Kontakt telefon
                                            </Typography>
                                            <Box
                                                display="flex"
                                                flexDirection="row"
                                                alignItems="center"
                                                gap="10px"
                                            >
                                                <Phone sx={{ color: "#7CB9E8", fontSize: "40px"  }} />
                                                <Typography
                                                    fontSize={25}
                                                    color="#fff"
                                                    noWrap
                                                    fontFamily="Zen Maru Gothic"
                                                >
                                                    +381 444 789
                                                </Typography>
                                            </Box>
                                        </Stack>

                                        <Stack flex={1} gap="15px">
                                            <Typography
                                                fontSize={25}
                                                fontWeight={500}
                                                color="#fff"
                                                fontFamily="Zen Maru Gothic"
                                            >
                                                Email adresa
                                            </Typography>
                                            <Box
                                                display="flex"
                                                flexDirection="row"
                                                alignItems="center"
                                                gap="10px"
                                            >
                                                <Email sx={{ color: "#7CB9E8", fontSize: "40px" }} />
                                                <Typography
                                                    fontSize={25}
                                                    color="#fff"
                                                    fontFamily="Zen Maru Gothic"
                                                >
                                                    {email}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {properties.length > 0 && (
                <Box mt={2.5} borderRadius="15px" padding="20px" sx={{   backgroundImage:'url("url("https://st.depositphotos.com/1000350/2282/i/450/depositphotos_22823894-stock-photo-dark-concrete-texture.jpg")")'}}>
                    {(type == 'Menadzer') ? 
                        <Typography fontSize={18} fontWeight={600} color="#fff">
                        Nekretnine {type}a:
                    </Typography>
                    :
                        <Typography fontSize={18} fontWeight={600} color="#fff">
                        {type}e nekretnine:
                    </Typography>}

                    <Box
                        mt={2.5}
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 4,
                            justifyContent: "center"
                        }}
                    >
                        {properties?.map((property: PropertyProps) => (
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
            )}

            <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart
                    title="Ukupan broj nekretnina u okviru veb aplikacije Homehub"
                    value={totalProperties}
                    series={[16, 16, 16, 16, 16, 16]}
                    colors={['#B9D9EB', '#008E97', '#6F00FF', '#1877F2', '#5D76A9', '#B0C4DE']}
                    numOfMyProps={properties.length}
                />
            </Box>  

        </Box>
    );
};

export default Profile;
