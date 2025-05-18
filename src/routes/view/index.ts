import {Router} from 'express'
import UserController from '../../controllers/user';
const viewRouter = Router();
const {getRenderedUser} = UserController;

viewRouter.get('/',  (req,res)=>{
    res.send('Server is up and running')
});

viewRouter.get('/users', getRenderedUser);

export default viewRouter;


