const Actor = require('./actors');
const Film = require('./films');
const ActorsFilms = require('./af');

module.exports = (Sequelize, config) => {
    const sequelize = new Sequelize(config.db, config.login, config.password, {
        host: config.host,
        dialect: config.dialect,
        logging: false
    });
    sequelize.authenticate().then(() => {
        console.log('Connection to database successful');
    }).catch((err) => {
            console.log('Unable to connect to database', err);
        });

    const films = Film(Sequelize, sequelize);
    const actors = Actor(Sequelize, sequelize);
    const actorsfilms = ActorsFilms(Sequelize, sequelize);

    actors.belongsToMany(films, {as: 'Films', through: 'ActorsFilms'});
    films.belongsToMany(actors, {as: 'Actors', through: 'ActorsFilms'});

    return {
        films,
        actors,
        actorsfilms,

        sequelize: sequelize,
        Sequelize: Sequelize,
    };
};