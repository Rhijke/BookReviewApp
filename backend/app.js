const express = require('express');
const passport = require('passport');
const socketio = require('socket.io');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const authRouter = require('./routes/auth.router');
const passportInit = require('./routes/init.passport');
const {
  PORT = 3002,
  NODE_ENV = 'development',
  SESS_SECRET = 'harbububububu'
} = process.env;
const app = express();
const server = require('http').Server(app);
const IN_PROD = NODE_ENV === 'production';
app.use(passport.initialize());
passportInit();

// Accept requests from the client
app.use(
  cors({
    origin: ['http:/localhost:3000/', 'http://127.0.0.1:3000/']
  })
);

// Create Sessions
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESS_SECRET,
    cookie: {
      sameSite: true,
      secure: IN_PROD
    }
  })
);
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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Direct all requests to the auth router
app.use('/', authRouter);

// Set up port
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

module.exports = app;
