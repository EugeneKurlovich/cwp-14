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
    
    /* await db.films.create({
         title: "asd",
         rating: 1000,
         year: 2010,
         budget: 100,
         gross: 0,
         poster: "qwe"
     });
*/
     // 2. 
     
    await db.films.bulkCreate(films.slice(0, 3));
    await db.actors.bulkCreate(actors);
    await db.actorsfilms.bulkCreate([
        {actorId: 0, filmId: 2},
        {actorId:2, filmId: 2},
    ]);

  //3
  await db.sequelize.query("update actors set liked = liked + 1 where films = 3 ");

  //4

  await db.actors.destroy({
    where: {
        liked: 0
    }
  });
    //5
    
    let film = await db.films.findById(2, {
        include: [{
            model: db.actors,
            as: 'Actors'
        }]
    });
    film.Actors.forEach((actor) => {
        console.log(actor.name);
});
   
    
//6
let modernfilms = db.films.scope('modern');
films = await modernfilms.findAll();
films.forEach((film) => {
    console.log(film.title);
});


//8
await db.sequelize.transaction().then(function (t) {
    return db.actors.update({
        liked: 0
    }, {transaction: t, where: {}}).then(function () {
        setTimeout(function () {
            console.log("rollback 10 sec");
            return t.rollback();
        }, 10000);
    });
});

   // 9. Демонстрация upgrade/downgrade методов миграции с добавление/удалением поля genres
    // sequelize init
    // sequelize model:generate --name film --attributes title:string,rating:float,budget:integer,gross:integer,poster:string
    // sequelize model:generate --name actor --attributes name:string,birth:string,films:integer,liked:integer,photo:string
    // sequelize db:migrate
    // sequelize db:migrate:undo
    //

}