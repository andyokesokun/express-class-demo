import {Router} from 'express';
import userRouter  from './user';
import carRoutes from './car';

const routes = Router();
routes.use('/users', userRouter);
routes.use('/cars', carRoutes);
//cloths
//houses



export default routes;