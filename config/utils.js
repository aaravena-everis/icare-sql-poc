module.exports = {
    successfulResponse: function(message, data) {
        var response = {
            message: message,
            code: 200,
            data: data
        };
        return response;
    },
    errorResponse: function(code, message, debug) {
        var response = {
            message: message,
            code: code,
			debug: debug
        };
        return response;
    }
};