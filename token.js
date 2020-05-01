const jwt = require('jsonwebtoken');
const config = require('./config/config');

function generateAccessToken(userId) {
    const expiresIn = '7d';
    const audience = config.authentication.token.audience
    const issuer = config.authentication.token.issuer;
    const secret = config.authentication.token.secret;

    const token = jwt.sign({}, secret, {
        expiresIn: expiresIn,
        audience: audience,
        issuer: issuer,
        subject: userId.toString()
    });

    return token;
}

module.exports = {
    generateAccessToken: generateAccessToken
}
