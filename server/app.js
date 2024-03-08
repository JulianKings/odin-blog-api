import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config'
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
const LocalStrategy = Strategy;
import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt';
const LocalJWTStrategy = jwtStrategy;
const LocalExtractJWT = ExtractJwt;
import userModel from './models/user';
import bcrypt from 'bcryptjs';

import indexRouter from './routes/index';
import signUpRouter from './routes/signup';
import loginRouter from './routes/login';
import ssoRouter from './routes/sso';
import articleRouter from './routes/articles';
import settingsRouter from './routes/settings';
import commentsRouter from './routes/comments'

var app = express();

app.set('jwt_secret_password', process.env.JWT_SECURE_KEY);

// Set up mongoose connection
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.session());

app.use('/', indexRouter);
app.use('/sign-up', signUpRouter);
const loginRouterHandler = loginRouter(passport);
app.use('/login', loginRouterHandler);
const ssoRouterHandler = ssoRouter(passport);
app.use('/sso', passport.authenticate('jwt', { session: false }), ssoRouterHandler);
app.use('/article', articleRouter);
app.use('/settings', settingsRouter);
app.use('/comment', commentsRouter);

const nameField = 'userName';
const pwdField = 'password';

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: nameField,
      passwordField: pwdField
    },
    async (name, password, done) => {
      try {
        const user = await userModel.findOne({ username: name });

        if (!user) {
          return done(null, false, { path: nameField, msg: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return done(null, false, { path: pwdField, msg: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new LocalJWTStrategy(
    {
      secretOrKey: process.env.JWT_SECURE_KEY,
      jwtFromRequest: LocalExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
});

export default app;
