import { Application } from "express";
import configureGoogleAuth from "./google";

const configureOAuthProviders = (app: Application) =>{
     configureGoogleAuth(app);
}

export default configureOAuthProviders;