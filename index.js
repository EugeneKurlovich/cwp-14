const Sequelize = require('sequelize');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);
let films = require('./data/films.json');
const actors = require('./data/actors.json');

db.sequelize.addHook('beforeBulkCreate', () => {
    console.log('beforeCreate');
});
db.sequelize.addHook('afterBulkCreate', () => {
    console.log('afterCreate');
});


WorkWork();

async function WorkWork() {
    await db.sequelize.sync({force: true});
    // 1. Валидация полей budget, year и rating фильма
     await db.films.create({
         title: "TEST",
         rating: 10,
         year: 1971,
         budget: 100,
         gross: 0,
         poster: "poster"
     });

}