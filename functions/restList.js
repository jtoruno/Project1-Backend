const buildResponse = require('../utils/buildResponse');
const Rests = require('../model/Rest');
const rests = new Rests();

module.exports.handler = () => {
    return new Promise(async(resolve) => {
        try{
            const RestaurantList = await rests.getList();
            const response = buildResponse(200, RestaurantList);
            resolve(response)
        } catch(e) {
            const response = buildResponse(400, {error: e.message});
            resolve(response)
        }
    })
}