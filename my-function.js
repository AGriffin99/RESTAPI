console.log('Loading function');

exports.handler = async (event, context) => {
    let keyword = event.queryStringParameters.keyword
    let msg = 'Anitra says ' + keyword;
    return {
        'statusCode': 200,
        'body': JSON.stringify(msg)
    }
};
