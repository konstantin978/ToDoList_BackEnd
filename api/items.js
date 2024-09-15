const { Router } = require('express');
const ItemsService = require('../services/items');
const { errors } = require('../errors');

const itemRouter = Router();
let error = null;

itemRouter.get('/', async (req, res) => {
    const { offset, limit } = req.query;
    if (!limit) {
        error = errors.INVALID_LIMIT;
        return res.send(`Error Code: ${error.code}, Message: ${error.message}`);
    }
    if (!offset) {
        error = errors.INVALID_OFFSET;
        return res.send(`Error Code: ${error.code}, Message: ${error.message}`);
    }

    try {
        const result = await ItemsService.getAllItems(parseInt(offset), parseInt(limit));
        res.send(result);
    } catch (err) {
        if (err instanceof Error) {
            return res.send(`Error Code: ${err.code}, Message: ${err.message}`);
        } else {
            return res.send(`Unknown error: ${err}`);
        }
    }
});

itemRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        error = errors.MISSING_ID;
        return res.send(`Error Code: ${error.code}, Message: ${error.message}`);
    }
    try {
        const result = await ItemsService.getItemById(id);
        res.send(result);
    } catch (err) {
        if (err instanceof Error) {
            return res.send(`Error Code: ${err.code}, Message: ${err.message}`);
        } else {
            return res.send(`Unknown error: ${err}`);
        }
    }
});


itemRouter.post('/', async (req, res) => {
    const { title, createdAt } = req.body;
    if (!title) {
        error = errors.MISSING_TITLE;
        return res.send(`Error Code: ${error.code}, Message: ${error.message}`);
    }
    if (!createdAt) {
        error = errors.MISSING_CREATEDAT;
        return res.send(`Error Code: ${error.code}, Message: ${error.message}`);
    }

    try {
        const result = await ItemsService.addItem(title, createdAt);
        res.send(result);
    } catch (err) {
        if (err instanceof Error) {
            return res.send(`Error Code: ${err.code}, Message: ${err.message}`);
        } else {
            return res.send(`Unknown error: ${err}`);
        }
    }
});

itemRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, createdAt } = req.body;
    if (!id) {
        error = errors.MISSING_ID;
        return res.send(`Error Code: ${error.code}, Message: ${error.message}`);
    }

    if (!title) {
        error = errors.MISSING_TITLE;
        return res.send(`Error Code: ${error.code}, Message: ${error.message}`);
    }
    if (!createdAt) {
        error = errors.MISSING_CREATEDAT;
        return res.send(`Error Code: ${error.code}, Message: ${error.message}`);
    }

    try {
        const result = await ItemsService.updateItemById(id, title, createdAt);
        res.send(result);
    } catch (err) {
        if (err instanceof Error) {
            return res.send(`Error Code: ${err.code}, Message: ${err.message}`);
        } else {
            return res.send(`Unknown error: ${err}`);
        }
    }
});

itemRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        error = errors.MISSING_ID;
        return res.send(`Error Code: ${error.code}, Message: ${error.message}`);
    }
    try {
        const result = await ItemsService.deleteItemById(id);
        res.send(result);
    } catch (err) {
        if (err instanceof Error) {
            return res.send(`Error Code: ${err.code}, Message: ${err.message}`);
        } else {
            return res.send(`Unknown error: ${err}`);
        }
    }
});

module.exports = itemRouter;