import React, { useContext } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Avatar,
} from "@pankod/refine-mui";
import { ColorModeContext } from "contexts";

import { Link } from "@pankod/refine-react-router-v6";


export const Header: React.FC = () => {

  const {mode, setMode} = useContext(ColorModeContext);
  const { data: user } = useGetIdentity();
  const shouldRenderHeader = true; // since we are using the dark/light toggle; we don't need to check if user is logged in or not.

  return shouldRenderHeader ? (
    <AppBar color="default" position="sticky" elevation={0} sx = {{
      backgroundImage: 'url("https://images4.alphacoders.com/552/552010.png")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}>
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          {/*<IconButton
            onClick={() => {
              setMode();
            }}
          >
            {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton> */}
            <Stack direction="column" alignItems="center" justifyContent="center">
              <Stack direction="row" gap="16px" alignItems="center" justifyContent="center">
              <Typography variant="subtitle2" color='white' fontSize="15px" sx={{fontFamily: "Zen Maru Gothic"}} fontWeight="bolder"> Prijavljen kao: </Typography>
                {user?.name ? (
                  <Typography variant="subtitle2" color='white' fontSize="15px" sx={{fontFamily: "Zen Maru Gothic"}} fontStyle="underline"                   component={Link} 
                  to={`/my-profile`}>{user?.name}</Typography>
                ) : null}
                {user?.avatar ? (
                  <Avatar sx={{
                    border: "3px solid #7CB9E8", // Specifies the border style, width, and color
                    borderRadius: "20%", // Makes the border circular
                  }} src={user?.avatar} alt={user?.name}       
                  component={Link} 
                  to={`/my-profile`}/>
                ) : null}
              </Stack>
              <Stack direction="row" gap="5px" alignItems="center" justifyContent="center">
              </Stack>
            </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  ) : null;
};
