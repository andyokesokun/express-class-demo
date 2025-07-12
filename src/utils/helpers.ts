import { Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AUTH_TYPE } from "./enums";

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
      return generateBasicToken(user.email, password);
    default:
      res.status(401).json("Unsupported auth type");
  }
};

const generateBasicToken = (username: string, password: string) => {
  const credentials = `${username}:${password}`;
  return Buffer.from(credentials, "ascii").toString("base64");
};

const generateJwtToken = (user: User) => {
  const secret = process.env.JWT_SECRET  as string;
  const expiresIn = Number(process.env.JWT_EXPIRE_TIME_SECONDS) || 1800;
  return  jwt.sign(
    { userId: user.id, name: user.name, role: user.role },
    secret,
    { expiresIn },
  );
};

export const verifyToken = async (token: string, res: Response) => {
     const authType = process.env.AUTHENTICATION_TYPE as string;
      switch (authType) {
        case  AUTH_TYPE.JWT:
            verifyJwtToken(token, res);
          break;
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
    //decode base base64 string username:password (daniel:passsd)
    const credentials = Buffer.from(token!, 'base64').toString('ascii');

    const [username, password] = credentials.split(':');
    await ensureUserCrendentialIsValid(username, password, res);
}


export const verifyJwtToken =  (token: string, res: Response) => {     
   if(token?.startsWith('Bearer ')){
      token = token.split(' ')[1];
   }
    const secret = process.env.JWT_SECRET as string;
     jwt.verify(token,secret, (err) =>{
        if(err){
          console.log(err);
          res.status(401).json({ message: "Unauthorized" });
        }
    })

}
