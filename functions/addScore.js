const buildResponse = require('../utils/buildResponse');
const Rest = require('../model/Rest');
const rests = new Rest();

module.exports.handler = (event) => {
    return new Promise(async(resolve) => {
        try{
            const body = JSON.parse(event.body);
            console.log(body)
            const { id } = body;
            const { score } = body;
            if(id === undefined || score === undefined){
                const resp = buildResponse(400, {error : "Missing Params"})
                resolve(resp)
            }
            else{
                const res = await rests.addScore(id,score)
                console.log(res)
                const response = buildResponse(200, {message: "Restaurant score saved"})
                resolve(response);
            }
        } catch(e) {
            console.log(e)
            const response = buildResponse(400, {error : error.message})
            resolve(response);
        }
    })
}