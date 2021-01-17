---
id: passport 
title: Passport 
sidebar_label: Passport
---
Passport module wrapper built with [passport](http://www.passportjs.org)

## Installation

```npm
npm i @appolo/passport
```

## Options

| key | Description | Type | Default
| --- | --- | --- | --- |
| `session` | true to use session | `boolean` | false |

```typescript title="config/modules/all.ts"
import {RedisModule} from '@appolo/redis';

export = async function (app: App) {
     app.module.use(PassportModule.for({
        session:true
    }));
}
```

if we use a session we must load the express session middleware

```typescript title="config/middlewares/all.ts"
import session = require('express-session');

export = function (app: App) {
    app.route.use(
        session({
            secret: 'testtest',
            resave: false,
            saveUninitialized: false
        }));
}
```

## Usage
Now we define our passport strategies you can define as many strategies needed.

The `validate` method will be called the strategy arguments.
```typescript
import {PassportStrategy,strategy} from "@appolo/passport";
import GoogleStrategy = require('passport-google-oauth20');
import {define, singleton, inject} from "@appolo/inject";
import {UsersManager} from "../managers/usersManager";

@define()
@singleton()
@strategy(GoogleStrategy.Strategy)
export class GooglePassportStrategy extends PassportStrategy {

    @inject() usersManager: UsersManager;

    //the options will be passed to passport google strategy
    public get options() {
        return {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: '/auth/google/callback'
        }
    }

    public async validate(accessToken: string, refreshToken: string, profile: GoogleStrategy.Profile): Promise<any> {

        const newUser = {googleId: profile.id, displayName: profile.displayName, firstName: profile.name.givenName, lastName: profile.name.familyName, image: profile.photos[0].value,};

        let user = await this.usersManager.findOne({filter: {googleId: profile.id}});

        if (user) {
            return user;
        }

        user = await this.usersManager.create(newUser);

        return user;
    }
}


```
Now we define the user serializer
```typescript
import {define, singleton, inject} from "@appolo/inject";
import {UsersManager} from "../managers/usersManager";
import {serializer,PassportSerializer} from "@appolo/passport";

@define()
@singleton()
@serializer()
export class UserSerializer extends PassportSerializer {

    @inject() usersManager: UsersManager;

    public  serializeUser(user: any) {
        return  user.id
    }

    public  deserializeUser(id: any) {
        return this.usersManager.getById(id)
    }

}

```
Finally, we define strategy auth and callback routes.

We use authenticate middleware with given strategy.

Once the user is authenticated we can use the `req.isAuthenticated` and `req.user`
```typescript
import {controller, Controller, get, middleware, res, IResponse, IRequest, req} from '@appolo/route';
import {authenticate} from "@appolo/passport";
import {GooglePassportStrategy} from "./googlePassportStrategy";

@controller("/auth")
export class UsersController extends Controller {

    @get("/google")
    @middleware(authenticate(GooglePassportStrategy,{scope: ['profile']}))
    public loginGoogle() {
    }

    @get("/google/callback")
    @middleware(authenticate(GooglePassportStrategy, {failureRedirect: '/'}))
    public loginGoogleCallback(@res() res: IResponse) {
        res.redirect('/dashboard')
    }

    @get("/logout")
    public logout(@req() req: IRequest, @res() res: IResponse) {
        req.logout();
        res.redirect('/');
    }

    @get("/someRoute")
    public soumeRoute(@req() req: IRequest, @res() res: IResponse) {
       
        if(req.isAuthenticated){
            return req.user
        }
    }
    

}
```
