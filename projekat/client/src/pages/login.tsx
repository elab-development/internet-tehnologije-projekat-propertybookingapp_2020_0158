import { useEffect, useRef } from "react";
import { useLogin } from "@pankod/refine-core";
import { Container, Box } from "@pankod/refine-mui";


import { CredentialResponse } from "../interfaces/google";

export const Login: React.FC = () => {
  //definisemo funkciju useLogin() koja poziva funkciju mutate koja se kosristi za proveru kredincijala korisnika pre prijave na server.
  //prijava se vrsi klikom na google dugme.
  const { mutate: login } = useLogin<CredentialResponse>();

  //Google dugme za prijavu. Predstavljeno je kao funkcija.
  const GoogleButton = (): JSX.Element => {
    //useRef() React hook da bi se dobio referenca na HTML div element u kome će se prikazati Google dugme. 
    const divRef = useRef<HTMLDivElement>(null);
    //useEffect() React hook se koristi za inicijalizaciju Google API-ja i prikazivanje Google dugmeta
    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        // Ova funkcija se izvršava samo jednom, kada se komponenta učita.
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          //callback funkcija koja će se izvršiti kada korisnik uspešno prijavi 
          //se na Google nalog. Callback funkcija poziva login() funkciju, koja se 
          //dobija iz useLogin() funkcije, sa CredentialResponse objekta koji predstavlja kredencijale korisnika.
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        //izgled Google button-a
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "large",
          type: "standard",
          shape: "pill",
          width: "450px",

        });
        //Login neuspesan
      } catch (error) {
        console.log(error);
      }
    }, []); 

    return <div style={{border: "3.5px solid white", borderRadius: "30px"}} ref={divRef} />;
  };

  return (
    <Box
      component="div"
      sx={{
        background: "url(https://i.pinimg.com/originals/3d/08/e0/3d08e03cb40252526fee2036a67f07f1.gif)",
        backgroundSize: 'cover',
        width: '100vw', // Set width to 100% of viewport width
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(37, 41, 88, 0.8)", // RGBA value with alpha channel for transparency
            width: '900px',
            height: '500px',
            borderRadius: "10px",
            padding: "15px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)"
          }}
        >
          <div style={{ opacity: '100%' }}>
            <img src={"https://i.ibb.co/PDt0FVn/logo-veci-Photoroom-png-Photoroom.png"} alt="Homehub Logo" style={{ width: '600px', height: '550px', objectFit: 'contain', marginTop: "-150px" }} />
          </div>
          <Box mt={0.5} sx={{marginTop: "-150px"}}>
            <GoogleButton/>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
