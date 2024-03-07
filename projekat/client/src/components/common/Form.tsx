import { Box, Typography,  FormControl, FormHelperText, TextField, TextareaAutosize, Stack
, Select, MenuItem, Button} from "@pankod/refine-mui";

import { FormProps } from "interfaces/common";

//na formi ima dugme
import  CustomButton from './CustomButton'

const Form = ({ type, register, handleSubmit, handleImageChange, formLoading, 
  onFinishHandler, propertyImage} : FormProps) => {
  return (
    <Box sx={{backgroundImage:'url("https://c4.wallpaperflare.com/wallpaper/542/50/545/simple-background-blue-simple-minimalism-wallpaper-preview.jpg")',
    backgroundSize: 'cover', padding: "10px", borderRadius:"2%"}}>
      <Typography fontSize={30} fontWeight={700} color="#fff" fontFamily="Zen Maru Gothic" >
        {type} nekretninu
      </Typography>
      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc" sx={{backgroundImage:'url("https://c4.wallpaperflare.com/wallpaper/542/50/545/simple-background-blue-simple-minimalism-wallpaper-preview.jpg")',
    backgroundSize: 'cover', marginTop: "-20px"}}>
          <form style={{marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px',
          }}
          onSubmit={handleSubmit(onFinishHandler)}>
              <FormControl>
                  <FormHelperText
                   sx={{fontWeight: 500, margin:'10px 0', fontSize: 30, color: '#fff', fontFamily: 'Zen Maru Gothic'}}>Unesi naziv nekretnine</FormHelperText>
                  <TextField
                  fullWidth
                  required
                  id='outlined-basic'
                  color="info"
                  variant="outlined"
                  style={{backgroundColor:"white", fontFamily:"Zen Maru Gothic"}}
                  inputProps={{ style: { fontSize: "22px" } }}
                  {...register('title', {required:true})}
                  />
              </FormControl>
              <FormControl>
                  <FormHelperText
                   sx={{fontWeight: 500, margin:'10px 0', fontSize: 30, color: '#fff', fontFamily:"Zen Maru Gothic"}}>Unesi opis nekretnine</FormHelperText>
                  <TextareaAutosize
                    minRows={5}
                    required
                    placeholder="Write description"
                    color="info"
                    style={{width:'100%', background:'transparent', fontSize:'22px', backgroundColor:'#fff',
                  borderRadius:6, padding:10, color:'#919191', fontFamily:"Zen Maru Gothic"}}
                  {...register('description', {required:true})}
                  />
              </FormControl>

              <Stack direction="row" gap={4}>
                  <FormControl sx={{flex:1}}>
                        <FormHelperText sx={{
                          fontWeight:500,
                          margin:'10px 0',
                          fontSize:30,
                          color:'#fff',
                          fontFamily:"Zen Maru Gothic"
                        }}>
                              Izaberi tip nekretnine
                        </FormHelperText>
                        <Select
                          variant="outlined"
                          color="info"
                          style={{                          color:'#000',
                          fontFamily:"Zen Maru Gothic", backgroundColor:"white"}}
                          displayEmpty
                          required
                          inputProps={{'aria-label' : 'Without label'}}
                          defaultValue="apartment"
                          sx={{ fontSize: "22px" }}
                          {...register('propertyType', {required:true})}
                        >
                            <MenuItem value="Stanovi" sx={{ fontSize: "22px" }}>
                            Stan
                            </MenuItem>
                            <MenuItem value="Kuce" sx={{ fontSize: "22px" }}>
                            Kuca
                            </MenuItem>
                            <MenuItem value="Apartmani" sx={{ fontSize: "22px" }}>
                            Apartman
                            </MenuItem>
                            <MenuItem value="Vikendice" sx={{ fontSize: "22px" }}>
                            Vikendica
                            </MenuItem>
                            <MenuItem value="Komercijalne Nekretnine" sx={{ fontSize: "22px" }}>
                            Komercijalna Nekretnina
                            </MenuItem>
                            <MenuItem value="Zemljista" sx={{ fontSize: "22px" }}>
                            Zemljiste
                            </MenuItem>
                        </Select>
                  </FormControl>

                  <FormControl>
                  <FormHelperText
                   sx={{fontWeight: 500, margin:'10px 0', fontSize: 30,color:'#fff',
                   fontFamily:"Zen Maru Gothic"}}>Unesi cenu</FormHelperText>
                  <TextField
                  fullWidth
                  required
                  id='outlined-basic'
                  color="info"
                  variant="outlined"
                  type="number"
                  inputProps={{ style: { fontSize: "22px" } }}
                  style={{backgroundColor:"white", fontFamily:"Zen Maru Gothic"}}
                  {...register('price', {required:true})}
                  />
              </FormControl>
              </Stack>

              <FormControl>
                  <FormHelperText
                   sx={{fontWeight: 500, margin:'10px 0', fontSize: 30,                           color:'#fff',
                   fontFamily:"Zen Maru Gothic"}}>Unesi lokaciju</FormHelperText>
                  <TextField
                  fullWidth
                  required
                  id='outlined-basic'
                  color="info"
                  variant="outlined"
                  inputProps={{ style: { fontSize: "22px" } }}
                  style={{backgroundColor:"white", fontFamily:"Zen Maru Gothic"}}
                  {...register('location', {required:true})}
                  />
              </FormControl>

              <FormControl>
                  <FormHelperText
                   sx={{fontWeight: 500, margin:'10px 0', fontSize: 30, color: '#fff', fontFamily: 'Zen Maru Gothic'}}>Unesi link slike nekretnine koju je moguce rotirati za 360°</FormHelperText>
                  <TextField
                  fullWidth
                  required
                  id='outlined-basic'
                  color="info"
                  variant="outlined"
                  inputProps={{ style: { fontSize: "22px" } }}
                  style={{backgroundColor:"white", fontFamily:"Zen Maru Gothic"}}
                  {...register('image360', {required:true})}
                  />
              </FormControl>

              <Stack direction="column" gap={1} justifyContent="center" mb={2}>
                        <Stack direction="row" gap={2}>
                            <Typography color='#fff' fontSize={30} fontWeight={500}
                            my="10px">Slika nekretnine</Typography>
                            <Button component="label" sx={{ 
                              width: 'fit-content',                           color:'#fff',
                              fontFamily:"Zen Maru Gothic", textTransform:'capitalize', fontSize: 20, fontWeight:"bolder",
                              border: "3px solid #7CB9E8",
                              borderRadius: "20%",backgroundImage:'url("https://c4.wallpaperflare.com/wallpaper/542/50/545/simple-background-blue-simple-minimalism-wallpaper-preview.jpg")',}}>Okaci
                              <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={(e)=> {
                                  // @ts-ignore
                                  handleImageChange(e.target.files[0])
                                }}
                              />
                            </Button>
                        </Stack>
                        <Typography fontSize={25} color="#7CB9E8" sx={{
                          wordBreak:'break-all', fontStyle:"italic"
                        }}>{propertyImage?.name}</Typography>
              </Stack>

              <CustomButton
                type="submit"
                title={formLoading ? 'Postavljanje...' : 'Postavi'}
                backgroundColor="#7CB9E8"
                color="#fcfcfc"
              />
          </form>
      </Box>
    </Box>
  )
}

export default Form