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
    addComment(id,comment){
        const params = {
            TableName: TABLE_NAME,
            Key: {
                id 
            },
            UpdateExpression: "SET comments = list_append(comments, :ps)",
            ExpressionAttributeValues: {
                ":ps": [comment]
            }

        };
        return this.dynamodb.update(params).promise()
            .then( result => {
                console.log(result)
                return result
            });

    }
    addScore(id,score){
        const params = {
            TableName: TABLE_NAME,
            Key: {
                id 
            },
            UpdateExpression: "SET score = list_append(score, :ps)",
            ExpressionAttributeValues: {
                ":ps": [score]
            }

        };
        return this.dynamodb.update(params).promise()
            .then( result => {
                return result
            });

    }
    addImg(id, imgUrl){
        const params = {
            TableName: TABLE_NAME,
            Key: {
                id 
            },
            UpdateExpression: "SET images = list_append(images, :ps)",
            ExpressionAttributeValues: {
                ":ps": [imgUrl]
            }

        };
        return this.dynamodb.update(params).promise()
            .then( result => {
                return result
            });

    }
    updateRest(id,name, food, schedule, contactInfo, cost, x, y){
        const params = {
            TableName: TABLE_NAME,
            Key: {
                id 
            },
            UpdateExpression: "set #N = :n, food = :f, schedule = :s, contactInfo = :c, cost = :co, x = :x, y =:y",
            ExpressionAttributeNames: {
                "#N": "name"
            },
            ExpressionAttributeValues: {
                ":n": name,
                ":f":food,
                ":s":schedule,
                ":c":contactInfo,
                ":co":cost,
                ":x":x,
                ":y":y,
            },
        }
        return this.dynamodb.update(params).promise()
            .then( result => {
                return result
            });
    }
}

module.exports = Rests;