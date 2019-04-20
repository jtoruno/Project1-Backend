const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const buildResponse = require('../utils/buildResponse');
const BUCKET = process.env["POSTER_IMAGES_BUCKET"];
var s3 = new AWS.S3();
const Uuid = require('uuid')

module.exports.handler = (event) => {
    return new Promise(async(resolve) => {
        try{
            let encodeImage = JSON.parse(event.body).image
            let decodeImage = Buffer.from(encodeImage, 'base64');
            var filePath = "images/" + Uuid() + ".jpg"
            var params = {
                "Body": decodeImage,
                "Bucket": BUCKET,
                "Key": filePath,
                "ACL": "public-read"
            };
            s3.upload(params, function(err, data){
                if(err) {
                    console.log(err)
                    const response = buildResponse(400, {Message: err.message})
                    resolve(response)
                } else{
                    console.log(data)
                    const response = buildResponse(200, 
                    {   
                        url: data.Location,
                        body: JSON.stringify(data), 
                        message: "Correctly" 
                    })
                    resolve(response)
                }
            })


        } catch(e) {
            const response = buildResponse(400, {e : e.message})
            resolve(response);
        }
    })
}
