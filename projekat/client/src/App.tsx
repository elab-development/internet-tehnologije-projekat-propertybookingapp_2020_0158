

import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import AccountBoxIcon from '@mui/icons-material/AccountBox';

import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

import './index.css';

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";


import { 
  Login,
  Home,
  AllProperties,
  CreateProperty,
  MyProfile,
  EditProperty,
  PropertyDetails,
  ManagerProfile,
  Managers,
  AdminHome

} from "pages";

//kreira instancu Axios-a koja će se koristiti za izvršavanje HTTP zahteva na serveru. pre slanja svakog zahteva, 
//koristi se interceptor (osluškivač) koji dodaje Authorization zaglavlje sa Bearer tokenom koji se nalazi u localStorage. 
//To se radi kako bi se korisnik autentifikovao prilikom slanja zahteva, tako što se njegov token prosledi serveru putem HTTP zaglavlja.
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {

  //authProvider nekretnine koji se koristi u React aplikacijama za upravljanje autentikacijom korisnika.
// nekretnine ima pet funkcija: login, logout, checkError, checkAuth i getUserIdentity.
const authProvider: AuthProvider = {
  //login se poziva kada se korisnik uloguje. Ona prima podatke o korisnikovom autentifikacionom token-u kao argument.
// U ovoj funkciji se proverava da li je autentifikacioni token ispravan i, ako jeste, izdvoji se profileObj koji sadrži 
//podatke o korisniku. Zatim se korisnikov name, email i avatar sačuvaju u bazi podataka, a zatim se kreira nekretnine user 
//koji se skladišti u localStorage. Ako je korisnik admin, to se takođe označava u localStorage.
login: async ({ credential }: CredentialResponse) => {
  const profileObj = credential ? parseJwt(credential) : null;

  // save user to mongodb
  if (profileObj) {
    const response = await fetch('http://localhost:8080/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: profileObj.name,
        email: profileObj.email,
        avatar: profileObj.picture,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...profileObj,
          avatar: profileObj.picture,
          userid: data._id,
        })
      );

      // proveri da li je admin i oznaci u bazi
      if (profileObj.email === 'nekretnine.web2024@gmail.com') {
        localStorage.setItem('isAdmin', 'true');
      } else {
        localStorage.removeItem('isAdmin');
      }
    } else {
      // autentifikacija neuspesna
      return Promise.reject();
    }
  }

  localStorage.setItem('token', `${credential}`);
  // autentifikacija uspesna
  return Promise.resolve();
},
  //Funkcija logout se poziva kada se korisnik izloguje. Ona briše podatke o korisniku, token-u i postavlja isAdmin na null.
  logout: () => {
    const token = localStorage.getItem("token");

    if (token && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAdmin");
      axios.defaults.headers.common = {};
      window.google?.accounts.id.revoke(token, () => {
        return Promise.resolve();
      });
    }

    return Promise.resolve();
  },
  //Funkcija checkError se poziva kada se desi greška u autentikaciji.
  checkError: () => Promise.resolve(),

  //Funkcija checkAuth se poziva kako bi se proverilo da li je korisnik ulogovan. 
//Ona proverava postoji li token u localStorage i u zavisnosti od toga, vraća Promise.resolve() ili Promise.reject().
  checkAuth: async () => {
    const token = localStorage.getItem("token");

    if (token) {
      return Promise.resolve();
    }
    return Promise.reject();
  },

  getPermissions: () => Promise.resolve(),

   //Funkcija getUserIdentity se poziva kako bi se dobili podaci o trenutno ulogovanom korisniku.
  // Ona proverava postoji li korisnik u localStorage i u zavisnosti od toga, vraća Promise.resolve() ili Promise.reject().
  getUserIdentity: async () => {
    const user = localStorage.getItem("user");
    if (user) {
      return Promise.resolve(JSON.parse(user));
    }
  },
};

//kreranje promenjive isAdmin samo ukoliko je u bazi data kolona true
const isAdmin = localStorage.getItem("isAdmin") === "true";

//ako je ulogovan admin
if(isAdmin){
  return(
    <ColorModeContextProvider>
    <CssBaseline />
    <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
    <RefineSnackbarProvider>
      <Refine
      //podatke daje server
        dataProvider={dataProvider("http://localhost:8080/api/v1")}
        notificationProvider={notificationProvider}
        ReadyPage={ReadyPage}
        catchAll={<ErrorComponent />}
        resources={[
          {
            name: "Properties",
            options:{ label: 'Nekretnine'},
            list:AllProperties,
            create:CreateProperty,
            show:PropertyDetails,
            edit:EditProperty,
            icon: <MapsHomeWorkIcon style={{height:'20px', width:'20px'}}></MapsHomeWorkIcon>
          },
          {
            name: "managers",
            options:{ label: 'Menadzeri'},
            list:Managers,
            show:ManagerProfile,
            icon: <PeopleAltIcon></PeopleAltIcon>
          },

        ]}
        Title={Title}
        Sider={Sider}
        Layout={Layout}
        Header={Header}
        routerProvider={routerProvider}
        authProvider={authProvider}
        LoginPage={Login}
        DashboardPage={AdminHome}
      />
    </RefineSnackbarProvider>
  </ColorModeContextProvider>
  );
}
//nije admin

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("http://localhost:8080/api/v1")}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "Properties",
              options:{ label: 'Nekretnine'},
              list:AllProperties,
              create:CreateProperty,
              show:PropertyDetails,
              edit:EditProperty,
              icon: <MapsHomeWorkIcon style={{height:'20px', width:'20px'}}></MapsHomeWorkIcon>
            },
            {
              name: "managers",
              options:{ label: 'Menadzeri'},
              list:Managers,
              show:ManagerProfile,
              icon: <PeopleAltIcon></PeopleAltIcon>
            },
            {
              name: "my-profile",
              options:{ label: 'Moj profil'},
              list:MyProfile,
              icon: <AccountBoxIcon></AccountBoxIcon>
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={routerProvider}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
