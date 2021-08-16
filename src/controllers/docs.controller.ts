import { Request, Response } from 'express';

export class DocsController{
    public async showADocumentacionApi (req: Request, res: Response) {
        res.redirect('https://documenter.getpostman.com/view/3926054/Tzz7QdnP');
    }
}