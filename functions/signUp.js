const buildResponse = require('../utils/buildResponse');
const Users = require('../model/User');
const users = new Users();


module.exports.handler = (event) => {
    return new Promise(async (resolve, reject) => {
        try {
            const body = JSON.parse(event.body);
            console.log(body)
            const { email } = body;
            const { password } = body;
            const userObj = {
                email,
                password,
                admin: false
            }
            await users.save({ user: userObj });
            
            const response = buildResponse(200, { message: "SignUp Completed" });
            resolve(response);
        } catch (err) {
            const response = buildResponse(400, { error: err.message });
            resolve(response);
        }

    });
};