function buildResponse(statusCode, message, cookies, headers) {
    const response = {
        statusCode: statusCode,
        body: JSON.stringify(message),
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': true
        }
    };

    if(headers){
        response.headers = {...response.headers, headers};
    }

    if(cookies){
        response.headers['set-cookie'] = cookies;
    }
    return response;
}

module.exports = buildResponse;