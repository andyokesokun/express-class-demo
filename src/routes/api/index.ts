import {Router} from 'express';
import userRouter  from './user';
import carRoutes from './car';
import authRoute from './auth';

const routes = Router();
routes.use('/users', userRouter);
routes.use('/cars', carRoutes);
routes.use('/auth', authRoute);



export default routes;