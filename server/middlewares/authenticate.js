import jwt from "jsonwebtoken";
import boom from "boom";
import appConfig from "../../config/appConfig";

const authenticate = async (req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, appConfig.JWT_SECRET, (err, decoded) => {
            if (err) {
                throw boom.unauthorized('Invalid Token', 'local');
            } else {
                req.authUser = decoded;
                next();
            }
        });
    } else {
        throw boom.unauthorized('No token', 'local');
    }
};

export default authenticate;
