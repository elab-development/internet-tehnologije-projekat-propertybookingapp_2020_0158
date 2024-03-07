import { useList } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";

import { ManagerCard } from "components";



const Managers = () => {

    const { data, isLoading, isError } = useList({ resource: "users" });

    //koristi se opcionalni operator ?. da bi se izbeglo pristupanje undefined vrednostima 
    //u objektu data. Ako data ne postoji, uzmemo prazan niz umesto undefined vrednosti.
    const allManagers = data?.data ?? [];

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Box sx={{    backgroundImage:'url("https://c4.wallpaperflare.com/wallpaper/542/50/545/simple-background-blue-simple-minimalism-wallpaper-preview.jpg")', 
        padding:'10px', borderRadius:'25px', backgroundSize: 'cover',}}>
            <Typography fontSize={25} fontWeight={700} color="white" fontFamily="Zen Maru Gothic">
                Lista Menadzera
            </Typography>

            <Box
                mt="20px"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    backgroundImage:'url("https://t3.ftcdn.net/jpg/04/08/46/56/360_F_408465697_fyVlbgGers3R6eV599vOFYwD81xxJR1p.jpg")',
                    borderRadius:'25px'
                }}
            >
                {allManagers.map((manager) => (
                    (manager.email !== "nekretnine.web2024@gmail.com") && (
                        <ManagerCard
                        key={manager._id}
                        id={manager._id}
                        name={manager.name}
                        email={manager.email}
                        avatar={manager.avatar}
                        noOfProperties={manager.allProperties.length}
                        />
                    )
                    ))}

            </Box>
        </Box>
    );
};

export default Managers;