import {Application } from 'express';
import { DocsController } from '../controllers/docs.controller';

export class RoutesDocs { 
    public docsController: DocsController = new DocsController();
    
    public routes(app: Application): void {   
        
        app.route('/docapi')        
        .get(this.docsController.showADocumentacionApi);        
    }
}