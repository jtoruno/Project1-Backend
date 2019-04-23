const buildResponse = require('../utils/buildResponse');
const Rest = require('../model/Rest');
const rests = new Rest();

module.exports.handler = (event) => {
    return new Promise(async(resolve) => {
        try{
            const body = JSON.parse(event.body);
            const { id } = body
            const { name } = body
            const { x } = body
            const { y } = body
            const { food } = body
            const { contactInfo } = body
            const { schedule } = body
            const { cost } = body

            await rests.updateRest(id,name,food,schedule,contactInfo, cost, x, y)
            const response = buildResponse(200, {message: "Restaurant updated"})
            resolve(response);

        } catch(e) {
            console.log(e)
            const response = buildResponse(400, {error : e.message})
            resolve(response);
        }
    })
}