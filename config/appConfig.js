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
    CONTENTFUL: {
        ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
        SPACE: process.env.CONTENTFUL_SPACE,
        STATIC_MODEL_ID: process.env.CONTENTFUL_STATIC_MODEL_ID,
    },
    REDIS: {
        HOST: process.env.REDIS_HOST,
        PORT: process.env.REDIS_PORT,
        TIMEOUT: process.env.REDIS_TIMEOUT,
        CACHE_TTL: parseInt(process.env.CACHE_TTL, 10) || 60, // seconds
    },
    SOCKETIO: {
        LIVE_UPDATES_QUEUE_NAME: process.env.SOCKETIO_LIVE_UPDATES_QUEUE_NAME,
    },
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD: process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD === 'true',
    PUPPETEER_HEADLESS_CHROMIUM: process.env.PUPPETEER_HEADLESS_CHROMIUM === 'true',
    AUTH: {
        ACTIVE: process.env.AUTH_ACTIVE === 'true',
        USERNAME: process.env.AUTH_USERNAME,
        PASSWORD: process.env.AUTH_PASSWORD,
    },
    PROJECT_NAME: 'PROJECTNAME',
    PROJECT_WEBSITE: 'app.com',
};

export default Object.freeze(appConfig);
