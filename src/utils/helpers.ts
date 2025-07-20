import { Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AUTH_TYPE } from "./enums";
import { UserTokenResponse } from "../dtos";

export const ensureUserCrendentialIsValid = async (
  username: string,
  password: string,
  res: Response
) => {
  const { getEncryptedPasswordByEmail } = User;
  const encryptedPassword = await getEncryptedPasswordByEmail(username);

  if (!encryptedPassword) {
    res.status(401).json({ message: "User email doen't exist" });
  }

  const passwordMatch = await bcrypt.compare(password, encryptedPassword!);
  if (!passwordMatch) {
    res.status(401).json({ message: "Invalid Password" });
  }
};

export const generateToken = (user: User, password: string, res: Response) => {
  const authType = process.env.AUTHENTICATION_TYPE as string;
  
  switch (authType) {
    case  AUTH_TYPE.JWT:
       return generateJwtToken(user);
      break;
    case AUTH_TYPE.BASIC:
      return generateBasicToken(user, password);
    default:
      res.status(401).json("Unsupported auth type");
  }
};

const generateBasicToken = (user: User, password: string) => {
  const { email: username, id: userId, name , role } = user;
  const credentials = `${username}:${password}:${userId}:${name}:${role}`;
  return Buffer.from(credentials, "ascii").toString("base64");
};

const generateJwtToken = (user: User) => {
  const secret = process.env.JWT_SECRET  as string;
  const expiresIn = Number(process.env.JWT_EXPIRE_TIME_SECONDS) || 1800;
  return  jwt.sign(
    { userId: user.id, name: user.name, role: user.role } as UserTokenResponse,
    secret,
    { expiresIn },
  );
};

export const verifyToken = async (token: string, res: Response) => {
     const authType = process.env.AUTHENTICATION_TYPE as string;
      switch (authType) {
        case  AUTH_TYPE.JWT:
          return verifyJwtToken(token, res);
        case AUTH_TYPE.BASIC:
          return verifyBasicAuth(token, res);
        default:
          res.status(401).json("Unsupported auth type");
      }
}

export const verifyBasicAuth = async (token: string, res: Response) => {
        
   if(token?.startsWith('Basic ')){
      token = token.split(' ')[1];
   }
    //decode base base64 string username:password:userId:name:role
    const credentials = Buffer.from(token!, 'base64').toString('ascii');

    const [username, password,userId,name, role] = credentials.split(':');
    await ensureUserCrendentialIsValid(username, password, res);
    return {userId,name, role} as UserTokenResponse;
}


export const verifyJwtToken =  (token: string, res: Response) => {     
   if(token?.startsWith('Bearer ')){
      token = token.split(' ')[1];
   }
    let userTokenResponse = {} as UserTokenResponse;
    const secret = process.env.JWT_SECRET as string;
     jwt.verify(token,secret, (err,user) =>{
        if(err){
          console.log(err);
          res.status(401).json({ message: "Unauthorized" });
        }
         userTokenResponse = user as UserTokenResponse;
    })
   
    return userTokenResponse;
}
