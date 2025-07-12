import {NextFunction, Request, Response } from "express";
import { MongoServerError } from "mongodb";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    
    if (err instanceof MongoServerError) {
        res.status(500).json({ message: "This is on us..  we will getb back" });
    }
    
    res.status(500).json({ message: err.message })
}