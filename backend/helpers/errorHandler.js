export function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error stack for debugging

    // Set a default status code and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ error: message });
}