const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const buildResponse = require('../utils/buildResponse');
const BUCKET = process.env["POSTER_IMAGES_BUCKET"];
var s3 = new AWS.S3();
const Uuid = require('uuid')
const Rest = require('../model/Rest');
const rests = new Rest();

module.exports.handler = (event) => {
    return new Promise(async(resolve) => {
        try{
            let id = JSON.parse(event.body).id
            let encodeImage = JSON.parse(event.body).image
            let decodeImage = Buffer.from(encodeImage, 'base64');
            var filePath = "images/" + Uuid() + ".jpg"
            var params = {
                "Body": decodeImage,
                "Bucket": BUCKET,
                "Key": filePath,
                "ACL": "public-read"
            };
            let url;
            s3.upload(params, function(err, data){
                if(err) {
                    console.log(err)
                    const response = buildResponse(400, {Message: err.message})
                    resolve(response)
                } else{
                    console.log(data)
                    url = data.Location
                }
            })
            if(url !== undefined){
                try{
                    await rests.addImg(id,url)
                    const response = buildResponse(200, { message: "Correctly"})
                    resolve(response)
                } catch(e){
                    const response = buildResponse(200, { error: "error with url image"})
                    resolve(response)
                }
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
