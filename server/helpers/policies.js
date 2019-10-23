import boom from 'boom';

import ROLES from './RolesEnum';

export const isAdministrator = async (req, res, next) => {
    const { role } = req.authUser;
    if (role !== ROLES.ROLE_ADMINISTRATOR) {
        throw boom.forbidden();
    }
    next();
};

export const isUser = async (req, res, next) => {
    const { role } = req.authUser;
    if (role !== ROLES.ROLE_USER) {
        throw boom.forbidden();
    }
    next();
};
