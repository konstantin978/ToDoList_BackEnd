const errors = {
    INVALID_ID: {
        message: 'Invalid Id',
        code: 701 //custom,
    },
    INVALID_OFFSET: {
        message: 'Invalid Offset',
        code: 702
    },
    INVALID_LIMIT: {
        message: 'Invalid Limit',
        code: 703
    },
    MISSING_ID: {
        message: 'Missing Id',
        code: 704
    },
    MISSING_TITLE: {
        message: 'Missing Title field',
        code: 705
    },
    MISSING_CREATEDAT: {
        message: 'Missing CreatedAt field',
        code: 706
    },
    DATABASE_ERROR: {
        message: 'Database error occurred',
        code: 707
    }
};

class CustomError extends Error {
    constructor({ message, code }) {
        super(message);
        this.code = code;
    }
}

module.exports = { CustomError, errors };