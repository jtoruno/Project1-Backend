
const buildResponse = require('../utils/buildResponse');
const Rest = require('../model/Rest');
const rests = new Rest();
const S3Provider = require('../model/S3Provider');
const s3 = new S3Provider()

module.exports.handler = (event) => {
    return new Promise(async(resolve) => {
        try{
            let id = JSON.parse(event.body).id
            let encodeImage = JSON.parse(event.body).image
            let decodeImage = Buffer.from(encodeImage, 'base64');
            
            const url = await s3.addImg(decodeImage)
            if(url !== undefined){
                await rests.addImg(id,url)
                const response = buildResponse(200, { message: "Correctly"})
                resolve(response)
            }
            else{
                const response = buildResponse(200, { error: "error with url image"})
                resolve(response)
            }
        } catch(e) {
            console.log(e)
            const response = buildResponse(400, {error : e.message})
            resolve(response);
        }
    })
}
