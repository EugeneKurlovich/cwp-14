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
    // 1.
    /*
     await db.films.create({
         title: "TEST",
         rating: 10,
         year: 2010,
         budget: 100,
         gross: 0,
         poster: "poster"
     });
*/
     // 2. 
     
    await db.films.bulkCreate(films.slice(0, 3));
   
    



}