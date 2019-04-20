const buildResponse = require('../utils/buildResponse');
const Users = require('../model/User');
const users = new Users();

module.exports.handler = () => {
    return new Promise(async(resolve, reject) => {
        try{
            const list = await users.getList();
            const response = buildResponse(200,list);
            resolve(response)

        }catch(e){
            const response = buildResponse(400,{error: err.message});
            reject(response);
        }
    })
}