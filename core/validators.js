const errorsItems = require('./errors');

const validateOffsetIsFinite = (offset) => {
    if (!isFinite(offset)) {
        throw new errorsItems.InvalidOffsetError();
    };
};

const validateLimitIsFinite = (limit) => {
    if (!isFinite(limit)) {
        throw new errorsItems.InvalidLimitError();
    };
};

const validateResult = (result) => {
    if (!result) {
        throw new errorsItems.InvalidIdError();
    };
};

const validateError = (error) => {
    if (error instanceof Error) {
        return `Error Code: ${error.code}, Message: ${error.message}`;
    } else {
        return `Unknown error: ${error}`;
    }
}

const validateOffsetAndLimit = (req, res, next) => {
    const { offset, limit } = req.query;

    if (!limit) {
        throw new errorsItems.InvalidLimitError();
    }

    if (!offset) {
        throw new errorsItems.InvalidOffsetError();
    }

    next();
};

const validateTitleAndCreatedAt = (req, res, next) => {
    const { title, createdAt } = req.body;
    if (!title) {
        throw new errorsItems.MissingTitleError();
    }
    if (!createdAt) {
        throw new errorsItems.MissingCreatedAtError();
    }

    next();
};

module.exports = {
    validateOffsetIsFinite,
    validateLimitIsFinite,
    validateResult,
    validateError,
    validateOffsetAndLimit,
    validateTitleAndCreatedAt
};