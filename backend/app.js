const express = require('express');
const passport = require('passport');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const authRouter = require('./routes/auth.router');
const passportInit = require('./routes/init.passport');
const flash = require('connect-flash');
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
// Accept requests from the client
app.use(cors());
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

// Start Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
passportInit();
// view engine setup
//   SET
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Connecting sockets to the server and adding them to the request
// so that we can access them later in the controller
const io = socketio(server);
io.on('connection', function(socket) {
  app.set('socket', socket);
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});
app.set('io', io);
//   USE
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// Set Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
// Direct all requests to the auth router
app.use('/users', require('./routes/users'));

// Set up port
server.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});

module.exports = app;
