const appConfig = require('./../appConfig').default;

module.exports = {
    [appConfig.NODE_ENV]: {
        "username": appConfig.POSTRGESQL.USER,
        "password": appConfig.POSTRGESQL.PASSWORD,
        "database": appConfig.POSTRGESQL.DB,
        "host": appConfig.POSTRGESQL.URL,
        "dialect": appConfig.POSTRGESQL.DIALECT,
    },
};
