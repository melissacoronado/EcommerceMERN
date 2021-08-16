"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesAuth = void 0;
const auth_controller_1 = require("../controllers/auth.controller");
class RoutesAuth {
    constructor() {
        this.authController = new auth_controller_1.AuthController();
    }
    routes(app) {
        app.route('/register')
            .post(this.authController.registerUser);
        app.route('/login')
            .post(this.authController.logInUser);
        app.route('/logout')
            .post(this.authController.isLoggedIn, this.authController.logOutUser);
    }
}
exports.RoutesAuth = RoutesAuth;
