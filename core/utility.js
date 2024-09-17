const { CustomError } = require("./errors");

const setDuration = () => {
    return (req, res, next) => {
        req.start = Date.now();
        next();
    }
};

const pack = (startTime, result) => {
    if (!Array.isArray(result)) {
        result = [result];
    };
    return {
        data: result,
        count: result.length,
        duration: (Date.now() - startTime) + 'ms',
    };
};

const checkError = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(400).send(`Error Code: ${err.code}, Message: ${err.message}`);
    }
    res.status(500).send('An unexpected error');
};

module.exports = { setDuration, pack, checkError };