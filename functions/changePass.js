const buildResponse = require('../utils/buildResponse');
const Users = require('../model/User');
const users = new Users();
const codeConfirm = 3450;

module.exports.handler = (event) => {
    return new Promise(async (resolve) => {
        try {
            const body = JSON.parse(event.body);
            console.log(body)
            const { email } = body;
            const { password } = body;
            const { code } = body
            
            if(code === codeConfirm){
                await users.update(email, password);
                const response = buildResponse(200, {message: "Password changed"})
                resolve(response)
            }else{
                response = buildResponse(400,{error: "Invalid Code"});
                resolve(response);
            }
        } catch (err) {
            const response = buildResponse(400, { error: err.message });
            resolve(response);
        }

    });
};