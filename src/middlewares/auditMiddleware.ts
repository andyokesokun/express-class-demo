import express, { Request, Response, NextFunction } from 'express';
import logger  from '../utils/logger';
//logger middleware
const auditLogger = (req: Request, res: Response, next: NextFunction) => {
    const { method, url, headers } = req;
    const date = new Date();

    // Log request details
    logger.log('info',`Request: ${method} ${url} ${date.toLocaleString()}`);
    logger.info(`header`, headers)

    // Capture response details
    const originalSend = res.send;
    res.send = function (body) {
        logger.info(`Response: ${res.statusCode}`, body);
        logger.info(`loggedIn-user:`, req.user);
        return originalSend.apply(this, [body]);     
 
    };
    
    next();
 
};

export default auditLogger;