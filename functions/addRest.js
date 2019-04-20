const buildResponse = require('../utils/buildResponse');
const Rest = require('../model/Rest');
const rests = new Rest();
const Uuid = require('uuid')

module.exports.handler = (event) => {
    return new Promise(async(resolve, reject) => {
        try{
            const body = JSON.parse(event.body);
            const { name } = body
            const { x } = body
            const { y } = body
            const { food } = body
            const { contactInfo } = body
            const { schedule } = body
            
            const { images } = body
            
            //const { cost } = body
            //const { score } = body
            //const { comments } = body

            if(name == undefined || x == undefined || y == undefined || food == undefined || contactInfo == undefined ||
                schedule == undefined || images == undefined){
                const resp = buildResponse(400, {error : "Missing Params"})
                resolve(resp)
            }else{
                const rest = {
                    id : Uuid(),
                    name, x, y, food, contactInfo,
                    schedule, images,
                    cost : 0,
                    score : [],
                    comments: [],
                }
                await rests.save({rest})
                const response = buildResponse(200, {message: "Restaurant saved"})
                resolve(response);
    
            }
           
        } catch(e) {
            const response = buildResponse(400, {error : error.message})
            resolve(response);
        }
    });
};