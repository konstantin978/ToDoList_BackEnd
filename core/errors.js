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


// Error Classes
class InvalidIdError extends CustomError {
    constructor() {
        super(errors.INVALID_ID);
    }
}

class InvalidOffsetError extends CustomError {
    constructor() {
        super(errors.INVALID_OFFSET);
    }
}

class InvalidLimitError extends CustomError {
    constructor() {
        super(errors.INVALID_LIMIT);
    }
}

class MissingIdError extends CustomError {
    constructor() {
        super(errors.MISSING_ID);
    }
}

class MissingTitleError extends CustomError {
    constructor() {
        super(errors.MISSING_TITLE);
    }
}

class MissingCreatedAtError extends CustomError {
    constructor() {
        super(errors.MISSING_CREATEDAT);
    }
}

class DatabaseError extends CustomError {
    constructor() {
        super(errors.DATABASE_ERROR);
    }
}

module.exports = {
    CustomError,
    InvalidIdError,
    InvalidOffsetError,
    InvalidLimitError,
    MissingIdError,
    MissingTitleError,
    MissingCreatedAtError,
    DatabaseError,
    errors
};
