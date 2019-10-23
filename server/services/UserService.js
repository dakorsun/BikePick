import models from './../models';

const User = models.User;

/**
 * @param {Object} userData - user fields to create
 * @return {Promise<User>} updated user
 */
export async function signUp(userData) {
    const user = User.build(userData);
    user.setPassword(userData.password || '');
    user.setConfirmationToken();
    const userRecord = await user.save();
    // await send confirmation email;
    return userRecord;
}

/**
 * @param {String} id - user id
 * @param {Object} updateFields - user fields to update
 * @return {Promise<User>} updated user
 */
export async function updateUser(id, updateFields) {
    const user = await User.findOne({ where: { id } });

    user.set(updateFields);
    if (updateFields.password) {
        user.setPassword(updateFields.password);
    }
    return user.save();
}

/**
 * @param {String} email - user email
 * @return {Promise<User>} user
 */
export async function findUserByEmail(email) {
    return User.findOne({ where: { email } });
}

export async function findUserById(id) {
    return User.findByPk(id);
}
