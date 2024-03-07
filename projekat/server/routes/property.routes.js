//Uvoz biblioteke Express koja se koristi za upravljanje rutama i zahtevima
import express from 'express';
//funkcije iz kontrolera
import { createProperty,deleteProperty,getAllProperties,getPropertyDetails,updateProperty} from '../controllers/property.controller.js';

//Kreiranje novog router auta koji se koristi za definisanje novih ruta
const router = express.Router();

router.route('/').get(getAllProperties);

router.route('/:id').get(getPropertyDetails);

router.route('/').post(createProperty);

//za azuriranje samo odredjenih delova
router.route('/:id').patch(updateProperty);

router.route('/:id').delete(deleteProperty);


export default router;

