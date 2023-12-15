
const logger = require("firebase-functions/logger");

class ApiResponse {
    constructor(returnCode, returnMessage, data) {
        this.returnCode = returnCode;
        this.returnMessage = returnMessage;
        this.data = data
    }
}
module.exports = ApiResponse;