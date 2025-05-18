import { Request, Response } from 'express';
// 404 error handling middleware]
const pageNotFound = (req: Request, res: Response) => {
    res.status(404).json({
        message: 'Page not found',
        status: 404
    });
}
export default pageNotFound;