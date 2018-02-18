export default function createResponse(success, statusCode, dataObject) {
    return {
        success: success,
        statusCode: statusCode,
        iat: Date.now(),
        data: dataObject
    }
}