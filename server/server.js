const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middlewares/errorMiddleware');
const colors = require('colors');
var cors = require('cors');
const passportSetup = require('./config/passportSetup');
const passport = require('passport');
const expressSession = require('express-session');
const path = require('path');

const connectDB = require('./config/db');

const port = process.env.PORT || 4000;

connectDB();

const app = express();

app.use(
  expressSession({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/mails', require('./routes/mailRoutes'));

app.use(errorHandler);

// Serve static assets (e.g., CSS, JS, images)
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve the React application for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
