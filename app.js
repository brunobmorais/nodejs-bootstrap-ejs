const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const createError = require('http-errors');

const CONFIG = require('./app/config/config');
const defaultRoute = require('./app/routes/default.route');

const app = express();

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use('/aplication', express.static(path.join(__dirname, '/')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));
app.use('/popper', express.static(path.join(__dirname, 'node_modules/popper.js/dist/')));
app.use('/assets', express.static(path.join(__dirname, 'assets/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', defaultRoute);

// 404
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render(`error/index`, {
    params: {
      title: 'Erro'
    }
  })
});

// set port, listen for requests
app.listen(CONFIG.port, () => {
  console.log(`Server is running on port ${CONFIG.port}.`);
});