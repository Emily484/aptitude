import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import session from 'express-session';
import MemoryStore from 'memorystore';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();


import indexRouter from './staticrouter/index';
import usersRouter from './user/user.router';
import applicationRouter from './application/application.router';
import publicDir from './constant';


var app = express();

// view engine setup
/* app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); */

app.use(cors({origin:process.env.CLIENT, credentials: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));
app.use(session({
   secret: 'secret',
   store: new (MemoryStore(session))({checkPeriod:86400000}),
   cookie: {}}));

/**
 Set routers: First argument takes a 'route' string.
 The route string is the string of characters after our domain name that specifies what we are looking for
 what we are routing to basically in the URL (URN).
 The second argument is the router
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/applications', applicationRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: any, res: any, next: Function) {
  // send error file
  res.status(err.status || 500);
  res.sendFile('/error.html', {root: publicDir});
});

module.exports = app;
