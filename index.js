const Sequelize = require('sequelize');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);



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