import dotenv from 'dotenv';

dotenv.config();

const appConfig = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    SUPPORTED_SPORTS: (process.env.SUPPORTED_SPORTS || '').split(','),
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
        FROM_EMAIL: process.env.EMAIL_FROM_EMAIL,
        FROM_NAME: process.env.EMAIL_FROM_NAME,
        API_KEY: process.env.EMAIL_API_KEY,
        SENDGRID_API_KEY: process.env.EMAIL_SENDGRID_API_KEY,
    },
    AUTH: {
        ACTIVE: process.env.AUTH_ACTIVE === 'true',
        USERNAME: process.env.AUTH_USERNAME,
        PASSWORD: process.env.AUTH_PASSWORD,
    },
    PROJECT_NAME: 'PROJECTNAME',
    PROJECT_WEBSITE: 'app.com',
};

export default Object.freeze(appConfig);
