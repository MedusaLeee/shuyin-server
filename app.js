const Koa = require('koa');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const logger = require('./helper/logHelper').getLogger('App');

const index = require('./routes/index');
const users = require('./routes/users');

const app = new Koa();

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(koaLogger());
app.use(require('koa-static')(__dirname + '/public')); // eslint-disable-line

app.use(views(__dirname + '/views', { // eslint-disable-line
  extension: 'pug'
}));

// logger
app.use(async(ctx, next) => {
  await next();
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx);
});

module.exports = app;
