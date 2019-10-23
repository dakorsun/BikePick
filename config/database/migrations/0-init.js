import '../../../server/models';
import { sequelize } from '../../../server/setup/sequelize';

module.exports = {
    up: (queryInterface, Sequelize) => sequelize.sync(),
};
