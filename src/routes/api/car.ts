import {Router} from 'express'
import CarController from '../../controllers/car';
const carRoutes = Router();

// carRoutes.get('/', CarController.getCars)

const {getCars, createCar, findById} = CarController

carRoutes.get('/', getCars);
carRoutes.get('/:id', findById)
         .post('/', createCar);


export default carRoutes;