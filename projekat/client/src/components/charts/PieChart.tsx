import ReactApexChart from 'react-apexcharts'

import { Typography, Box, Stack} from '@pankod/refine-mui'
import { PieChartProps } from 'interfaces/home'

const PieChart = ({title, value, series, colors, numOfMyProps} : PieChartProps) => {
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
      gap={2}
      borderRadius="15px"
      minHeight="110px"
      width="fit-content"
      sx={{
        backgroundImage:'url("https://t3.ftcdn.net/jpg/04/08/46/56/360_F_408465697_fyVlbgGers3R6eV599vOFYwD81xxJR1p.jpg")',
      }}

    >

      <Stack direction="column">
        <Typography fontSize={25} color="white" fontFamily="Zen Maru Gothic" fontWeight="bolder">{title}</Typography>
        <Typography fontSize={35} color="#fff" fontWeight="bolder" mt={1} fontFamily="Zen Maru Gothic" className='writer-text' sx={{animationDelay:"0.5s", color: '#7CB9E8'}}>{value}</Typography>
        <Typography fontSize={25} color="white" fontFamily="Zen Maru Gothic" fontWeight="bolder">Od toga <span style={{ color: '#7CB9E8' }}>{numOfMyProps}</span> nekretnina kojima ste vi menadzer. </Typography>
      </Stack>

      <ReactApexChart style={{ padding: '20px' }}
        options={{
          chart: {type: 'donut'},
          colors,
          legend: { show: true, fontSize: "18px", fontWeight:"bolder",
          markers: {
            width: 20, 
            height: 20,
          },
        },
          dataLabels: { enabled: true },
          labels: ['Stanovi', 'Kuce', 'Apartmani', 'Vikendice', 'Komercijalne Nekretnine', 'Zemljista']
        }}
        series={series}
        type="donut"
        width="800px"
      />
    </Box>
  )
}

export default PieChart