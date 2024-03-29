import { Button} from "@pankod/refine-mui";

import { CustomButtonProps } from "interfaces/common";


//kupi sve parametre iz interfejsa
const CustomButton = ({type, title, backgroundColor, color, fullWidth, icon, handleClick, disabled}: CustomButtonProps) => {
  return (
    <Button
      disabled={disabled}
      type = {type === 'submit' ? 'submit' : 'button'}
      sx={{
        flex: fullWidth ? 1 : 'unset',
        padding: '10px 15px',
        width: fullWidth ? '100%' : 'fit-content',
        minWidth: 130,
        backgroundColor,
        color,
        fontSize: 20,
        fontWeight:600,
        gap:'10px',
        textTransform: 'capitalize',
        fontFamily: "Zen Maru Gothic",
        '&:hover':{
          opacity: 0.9,
          backgroundColor
        }
      }}

      onClick={handleClick}
      >

      {icon}
      {title}
    </Button>
  )
}

export default CustomButton