
import Home from './home';
import AllProperties from './all-properties';
import CreateProperty from './create-property';
import EditProperty from './edit-property';
import MyProfile from './my-profile';
import { Login } from './login';
import PropertyDetails from './property-details';
import ManagerProfile from './manager-profile';
import Managers from './manager';
import AdminHome from './admin_homepage';


//predstavlja izvoz svih komponenti koje se koriste u aplikaciji. Svaka od ovih komponenti se uvozi iz svog odgovarajućeg fajla
// i nakon toga se izvozi na korišćenje drugim delovima aplikacije.
export {
  Home,
  Login,
  AllProperties,
  CreateProperty,
  MyProfile,
  EditProperty,
  PropertyDetails,
  ManagerProfile,
  Managers,
  AdminHome
};