import express, {Application, Request, Response, NextFunction } from 'express'

export class RoutesAuth { 

    public routes(app: Application, passport: any): void {   

        app.get('/auth/facebook',passport.authenticate('facebook'));

        app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),//sucessRedirect: '/home'
        function(req, res) {
            let userLogin = (<any>req).user;
            //console.log(userLogin);
            res.render('partials/main', {layout : 'home', userEmail: userLogin.email});
        });

        app.post('/auth/logout', (req: Request, res: Response) => {
            //console.log('/auth/logout');
            req.session.destroy(function (err) {
                //console.log('session.destroy');
                res.redirect('/auth/login'); 
            });
        })

        app.get('/auth/login',(req: Request, res: Response) => {
            res.render('partials/main', {layout : 'login' });
        })


    }
}
