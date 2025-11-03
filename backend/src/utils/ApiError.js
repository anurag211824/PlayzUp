// Custom error class that extends the built-in JavaScript 'Error' class
// Used to handle API-related errors in a clean and consistent way
class ApiError extends Error {

    // The constructor is called whenever you create a new ApiError instance
    constructor(
        statusCode,                        // HTTP status code (e.g., 404, 500)
        message = "Something went wrong",   // Default error message if none provided
        errors = [],                        // Optional array of detailed error messages
        stack = ""                          // Optional custom stack trace
    ) {
        // Call the parent Error class constructor and pass the message
        super(message)

        // Store the HTTP status code (used in API responses)
        this.statusCode = statusCode

        // Data property can be used later to attach any additional info (set to null by default)
        this.data = null

        // Message for the error (same as passed to 'super')
        this.message = message

        // Always mark success as false for an error response
        this.success = false

        // Array to store additional error details (e.g., validation errors)
        this.errors = errors

        // If a custom stack trace is provided, use it; otherwise, capture automatically
        if (stack) {
            this.stack = stack
        } else {
            // Captures the current stack trace (helps in debugging)
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

// Export the ApiError class so it can be imported and used in other files
export { ApiError }
