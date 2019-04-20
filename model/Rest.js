const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const TABLE_NAME = process.env.POSTS_DYNAMODB_TABLE;

class Rests{
    constructor(){
        this.dynamodb = this.dynamo = new AWS.DynamoDB.DocumentClient();
    }
    save({ rest }) {
        const params = {
            TableName: TABLE_NAME,
            Item: rest
        };
        return this.dynamodb.put(params).promise()
            .then(result => {
                return result;
            });
    }
    getList(){
        const params = {
            TableName: TABLE_NAME
        };
        return this.dynamodb.scan(params).promise()
            .then(result =>{
                return result.Items;
            });
    }
    delete({id}){
        const params = {
            TableName: TABLE_NAME,
            Key: {
                id 
            }
        };
        return this.dynamodb.delete(params).promise()
            .then( result => {
                console.log(result)
                return result
            });
    }
}

module.exports = Rests;