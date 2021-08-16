"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesDocs = void 0;
const docs_controller_1 = require("../controllers/docs.controller");
class RoutesDocs {
    constructor() {
        this.docsController = new docs_controller_1.DocsController();
    }
    routes(app) {
        app.route('/docapi')
            .get(this.docsController.showADocumentacionApi);
    }
}
exports.RoutesDocs = RoutesDocs;
