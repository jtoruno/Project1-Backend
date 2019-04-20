const buildResponse = require('../utils/buildResponse');
const Rest = require('../model/Rest');
const rests = new Rest();

module.exports.handler = (event) => {
    return new Promise(async(resolve) => {
        try {
            const body = JSON.parse(event.body);
            const { id } = body
            if(id == undefined){
                const resp = buildResponse(400, {error : "Missing Params"})
                resolve(resp)
            }else{
                const result = await rests.delete({id})
                console.log(result)
                const response = buildResponse(200, {Message : "Delete correctly"})
                resolve(response)
            }
        } catch(e){
            response = buildResponse(400,{ errorMessage: e.message});
            resolve(response)
        }
    })
}