import { Place } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import { Typography, Box, Card, CardMedia, CardContent, Stack } from "@pankod/refine-mui";

import { PropertyCardProps } from "interfaces/property";


//prima parametra iz interfejsa i prikazuje na kartici automobila
const PropertyCard = ({id, title, location, price, photo}: PropertyCardProps) => {
  return (
    <Card
      component={Link} 
      to={`/properties/show/${id}`}
      sx={{
        maxWidth: '330px', 
        padding: '10px',
        '&:hover':{
          boxShadow: '0 22px 45px 2px rgba(176, 176, 176, 0.1)'
        },
        cursor:'pointer',
        textDecoration: 'none',
        backgroundImage:'url("https://t3.ftcdn.net/jpg/04/08/46/56/360_F_408465697_fyVlbgGers3R6eV599vOFYwD81xxJR1p.jpg")',
        border: '2px solid #ffffff'
      }}
      elevation={0}
    >

      <CardMedia
      component="img"
      width = "100%"
      height={210}
      image = {photo}
      alt ="card image"
      sx ={{borderRadius: '10px'}}
      />

      <CardContent sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between', gap: '10px', paddingX:'5px'}} >
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="#fff" fontFamily="Zen Maru Gothic">{title}</Typography>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Place
              sx={{fontSize: 25, color: '#7CB9E8' ,marginTop: 0.5}}
            />
            <Typography fontSize={15} color='#fff' fontFamily="Zen Maru Gothic" sx={{marginTop:"5px"}}>{location}</Typography>
          </Stack>
        </Stack>
        <Box px={1.5} py={0.5} borderRadius={1} bgcolor ="#7CB9E8" height = "fit-content" >
          <Typography fontSize={14} fontWeight={600} color="#fff" fontFamily="Zen Maru Gothic" style={{ whiteSpace: 'nowrap' }}>{price} €</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PropertyCard