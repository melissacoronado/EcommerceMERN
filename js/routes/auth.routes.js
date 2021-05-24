"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesAuth = void 0;
class RoutesAuth {
    routes(app, passport) {
        app.get('/auth/facebook', passport.authenticate('facebook'));
        app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), //sucessRedirect: '/home'
        function (req, res) {
            let userLogin = req.user;
            //console.log(userLogin);
            res.render('partials/main', { layout: 'home', userEmail: userLogin.email });
        });
        app.post('/auth/logout', (req, res) => {
            //console.log('/auth/logout');
            req.session.destroy(function (err) {
                //console.log('session.destroy');
                res.redirect('/auth/login');
            });
        });
        app.get('/auth/login', (req, res) => {
            res.render('partials/main', { layout: 'login' });
        });
    }
}
exports.RoutesAuth = RoutesAuth;
