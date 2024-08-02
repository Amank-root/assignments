const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const { z } = require("zod")
const email = z.string().email();
const vpassword = z.string().min(6);


/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
function signJwt(username, password) {
    // Your code here
    const checkUsename = email.safeParse(username).success;
    const checkPass = vpassword.safeParse(password).success;
    if (checkUsename && checkPass) {
        const data = jwt.sign({ username: username }, jwtPassword);
        return data
    }
    return null
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    // Your code here
    const data = jwt.verify(token, jwtPassword, (err, decode) => {
        if (err) {
            return false;
        }
        return true
    })
    return data;
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
*
* @param {string} token - The JWT string to decode.
* @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
*                         Returns false if the token is not a valid JWT format.
*/
function decodeJwt(token) {
    // Your code here
    try {
        let data = jwt.decode(token)
        if (data == null) return false
        return true
    } catch (err) {
        return false
    }
}


module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword,
};
