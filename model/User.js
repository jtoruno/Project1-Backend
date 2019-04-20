const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const TABLE_NAME = process.env.USERS_DYNAMODB_TABLE;

class Users {
    constructor(){
        this.dynamodb = this.dynamo = new AWS.DynamoDB.DocumentClient();
    }

    save ({ user }){
        //save user in dynamodb
        const params = {
            TableName: TABLE_NAME,
            Item: user,
            ConditionExpression: "attribute_not_exists(email)"
        }

        return this.dynamodb.put(params).promise()
            .then( result => {
                return result;
            });
    };


    get({email}){
        //Query to get a item with a email param
        const params = {
            TableName: TABLE_NAME,
            Key: {
                email
            }
        };
        return this.dynamodb.get(params).promise()
        .then(result =>{
            return result.Item;
        });  
    };
    getList(){
        const params = {
            TableName: TABLE_NAME
        };
        return this.dynamodb.scan(params).promise()
        .then(result => {
            return result.Items
        })
    }
};

module.exports = Users;