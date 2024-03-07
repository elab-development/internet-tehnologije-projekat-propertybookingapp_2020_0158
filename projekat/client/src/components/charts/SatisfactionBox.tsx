import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { Typography, Box, Stack} from '@pankod/refine-mui'
import { SatisfactionBoxProps } from 'interfaces/home'



const SatisfactionBox = ({title, value} : SatisfactionBoxProps) => {

  return (
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
      gap={4}
      borderRadius="15px"
      minHeight="110px"
      width="120%"
      sx={{ backgroundImage:'url("https://media.istockphoto.com/id/170958625/photo/dark-blue-grunge-background.jpg?b=1&s=612x612&w=0&k=20&c=Njqazg0TAFGwJfTa9a6ByWvlumaa3wvtnEjdOgvwa1w=")', padding:'20px', borderRadius:'25px', backgroundSize: 'cover',}}
    

    >
      <Stack direction="column">
        <Typography fontSize={24} color="white" fontFamily="Zen Maru Gothic">{title}</Typography>
        <Typography fontSize={35} color="#fff" fontWeight={700} mt={1} fontFamily="Zen Maru Gothic" className='writer-text' sx={{animationDelay:"1s"}}>{value}</Typography>
      </Stack>


    <Stack>
      {(title == "Broj korisnika")?
    <PeopleAltIcon
    sx={{ color: "white", width:"170px", height:"170px", margin:"20px"}}
    />
    :
    <MapsHomeWorkIcon 
    sx={{ color: "white", width:"170px", height:"170px", margin:"20px"}}
    />
      }
 
    </Stack>
      
    </Box>
  )
}

export default SatisfactionBox