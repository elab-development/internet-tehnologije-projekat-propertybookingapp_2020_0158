import { useList } from '@pankod/refine-core';

import{ Typography, Box, Stack} from '@pankod/refine-mui'

import TimelineIcon from '@mui/icons-material/Timeline';


import { SatisfactionBox } from 'components';
 

const AdminHome = () => {
    {/*za vracanje automobila koristimo ovu kuku */}
    const {data, isLoading, isError} = useList({
        resource:'properties',
        config: {
            pagination:{
            pageSize: 18
            }
        }

    })


    const { data: usersData, isLoading: usersLoading, isError: usersError } = useList({
        resource: 'users', // Assuming 'users' is the resource name for users
    });


//koristi se opcionalni operator ?. da bi se izbeglo pristupanje undefined vrednostima 
//u objektu data. Ako data ne postoji, uzmemo prazan niz umesto undefined vrednosti.
    const latestProperties = data?.data ?? [];


    const totalUsers = usersData?.data?.length ?? 0;
    const numberOfUsers = totalUsers - 1;

    if(isLoading) return <Typography>Loading...</Typography>
    if(isError) return <Typography>Something went wrong!</Typography>


    return(

        <Box sx = {{backgroundImage:'url("https://c4.wallpaperflare.com/wallpaper/542/50/545/simple-background-blue-simple-minimalism-wallpaper-preview.jpg")',
        padding:'20px', borderRadius:'25px', backgroundSize: 'cover',}}>
            <Typography fontSize={25} fontWeight={700} color="white">
                Statisticki podaci aplikacije <TimelineIcon />
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
            sx={{ backgroundImage:'url("https://media.istockphoto.com/id/170958625/photo/dark-blue-grunge-background.jpg?b=1&s=612x612&w=0&k=20&c=Njqazg0TAFGwJfTa9a6ByWvlumaa3wvtnEjdOgvwa1w=")', padding:'20px', borderRadius:'25px', backgroundSize: 'cover',}}
            >
                  <Typography fontSize="20px" fontWeight={600} color="#FFFFFF" fontFamily="Zen Maru Gothic" sx={{marginBottom:"10px"}}> Pregled lokacija nekretnina: </Typography>
                  <iframe src="https://snazzymaps.com/embed/582905" width="100%" height="600px" style={{border:"none;"}}></iframe>
            </Box>

            <Stack mt="25px" width="100%" direction={{xs: 'column', lg: 'row'}} gap={4}>
            <Box mt="20px" display="flex" flexWrap="wrap" gap={48}>
                <SatisfactionBox
                title="Broj nekretnina"
                value={latestProperties.length}
                
                />

                <SatisfactionBox
                title="Broj korisnika"
                value={numberOfUsers}
                
                />
         

            </Box>


            </Stack>


 

            </Box>
        
    )
}

export default AdminHome