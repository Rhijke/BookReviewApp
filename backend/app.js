const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash');
// Passport Config
let initPassport = require('./config/passport');
initPassport(passport);

// Set environment variables if there are none
const {
  PORT = 3002,
  NODE_ENV = 'development',
  SESS_NAME = 'sid',
  SESS_SECRET = 'secretKeyBookReviewApplication'
} = process.env;
const IN_PROD = NODE_ENV === 'production';
// Start express
const app = express();
// Create server
const server = require('http').Server(app);

// Create database
const db = require('./config/config').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log(`MongoDB connected.`))
  .catch(err => console.log(err));

// General config
//   SET
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Accept requests from the client
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3002'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

// Create Sessions
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESS_SECRET,
    name: SESS_NAME,
    cookie: {
      sameSite: true,
      secure: IN_PROD
    }
  })
);
// Enable body parser
app.use(express.urlencoded({ extended: false }));

// Start Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(flash());

// Set Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');

  next();
});
// Routes
app.use('/users', require('./routes/users'));
app.use('/', require('./routes/booklist'));
app.get('*', function(req, res) {
  res.status(404).send('what???');
});
// Set up port
server.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});

module.exports = app;
