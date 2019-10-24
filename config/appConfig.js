import dotenv from 'dotenv';

dotenv.config();

const appConfig = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    POSTRGESQL: {
        URL: process.env.POSTGRESQL_URL,
        USER: process.env.POSTGRESQL_USER,
        PASSWORD: process.env.POSTGRESQL_PASSWORD,
        DB: process.env.POSTGRESQL_DB,
        DIALECT: 'postgres',
    },
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL: {
        HOST: process.env.EMAIL_HOST,
        PORT: process.env.EMAIL_PORT,
        USER: process.env.EMAIL_USER,
        PASSWORD: process.env.EMAIL_PASSWORD,
    },
    PROJECT_NAME: process.env.PROJECT_NAME,
    PROJECT_WEBSITE: process.env.PROJECT_WEBSITE,
};

export default Object.freeze(appConfig);
