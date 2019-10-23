require('@babel/register')({
    ignore: [ /(node_modules)/ ],
});
require('../../server/models');
const sequelize = require('../../server/setup/sequelize');

sequelize.sequelize.drop()
    .then(() => sequelize.sequelize.sync())
    .then(() => {
        console.log('Database tables successfully created');
        process.exit(0)
    })
    .catch((error) => {
        console.error(error);
        process.exit(1)
    });

