const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const BUCKET = process.env["POSTER_IMAGES_BUCKET"];
const Uuid = require('uuid')

class S3Provider {
    constructor(){
        this.s3 = new AWS.S3();
    }
    addImg(decodeImage){
        var filePath = "images/" + Uuid() + ".jpg"
        const params = {
            "Bucket": BUCKET,
            "ACL": "public-read",
            "Key": filePath,
            "Body": decodeImage
        }
        return this.s3.upload(params).promise()
        .then(result => {
            return result.Location
        })
    }
}

module.exports = S3Provider;