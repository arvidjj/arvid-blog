require("dotenv").config();
var createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var path = require('path');
var logger = require('morgan');
const cors = require('cors');
var cookies = require("cookie-parser");

//passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const session = require('express-session');
const User = require('./models/user');
const bcrypt = require('bcrypt');

//mongoose
const mongoose = require("mongoose");


// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

var app = express();

app.use(cookies());
// Configure CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_END ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: "strict", secure: false, maxAge: 3600000, path: '/' }
}));
app.use(passport.initialize());
app.use(passport.session());

//JWT
const cookieExtractor = req => {
  let jwt = null 
  //console.log(req.cookies['jwauth'])
  if (req && req.cookies) {
      jwt = req.cookies['jwauth']
  }

  return jwt
}
passport.use(new JwtStrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: cookieExtractor,
  },
  async (token, done) => {
    try {
      return done(null, token.user);
    } catch (err) {
      done(err);
    }
  }
));

//SESSION
passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: 'Incorrect email' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
}
);

/////////////////


// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

//mongodb connect
mongoose.connect(process.env.MONGODB_URL);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
