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
   /*  await db.films.create({
         title: "TEST",
         rating: 10,
         year: 1971,
         budget: 100,
         gross: 0,
         poster: "poster"
     });*/

     // 2. Пакетная вставка 3 фильмов
    await db.films.bulkCreate(films.slice(0, 3));
    await db.actors.bulkCreate(actors);
    await db.actorsfilms.bulkCreate([
        {actorId: 6245, filmId: 346},
        {actorId: 6245, filmId: 435},
        {actorId: 6245, filmId: 42664},
        {actorId: 3903, filmId: 346},
        {actorId: 3903, filmId: 42664},
        {actorId: 20302, filmId: 435},
    ]);
}