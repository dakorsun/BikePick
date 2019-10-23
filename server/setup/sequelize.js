import Sequelize from 'sequelize';
import appConfig from '../../config/appConfig';

const sequelize = new Sequelize(appConfig.POSTRGESQL.DB, appConfig.POSTRGESQL.USER, appConfig.POSTRGESQL.PASSWORD, {
    host: appConfig.POSTRGESQL.URL,
    dialect: appConfig.POSTRGESQL.DIALECT,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

/**
 * It will terminate the server if can't connect to database
 * @return {Promise<void>}
 */
async function checkDBConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

export {
    Sequelize,
    sequelize,
    checkDBConnection,
};
