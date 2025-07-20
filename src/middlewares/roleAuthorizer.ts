import { NextFunction, Request, Response } from "express"
import { UserTokenResponse } from "../dtos"

export const roleAuthorizer  = (roles: string[]) => {
   
    return (req: Request, res: Response, next: NextFunction) =>{
      const user = req.user as UserTokenResponse;

      if( !roles.includes(user.role) ){
        res.status(403).json( { message: 'Unauthorized' } );
      }
      next();
    }
}