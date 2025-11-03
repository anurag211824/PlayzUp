// Custom response class to standardize API responses
// Helps maintain a consistent structure for all API outputs
class ApiResponse {

    // The constructor initializes the response with status, data, and message
    constructor(
        statusCode,                 // HTTP status code (e.g., 200, 201, 404)
        data,                       // The actual data you want to send back to the client
        message = "Success"         // Default message if none is provided
    ) {
        // Store the status code (helps identify if request was successful or not)
        this.statusCode = statusCode

        // Attach the response data (can be object, array, or any value)
        this.data = data

        // Store the message to describe the outcome of the request
        this.message = message

        // Automatically set 'success' to true if statusCode < 400 (since 4xx & 5xx are errors)
        this.success = statusCode < 400
    }
}

// Export the ApiResponse class so it can be used in other modules
export { ApiResponse }
