const Sequelize = require('sequelize');
const config = require('config');
const fs = require('fs');
const path = require('path');

const pg = config.get('pg');
const sequelize = new Sequelize(pg.database, pg.username, pg.password, {
  host: pg.host,
  dialect: pg.dialect,
  pool: {
    max: 40,
    min: 1,
    acquire: 30000,
    idle: 10000
  }
});

fs
  .readdirSync(path.resolve(__dirnamem, '../models'))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
