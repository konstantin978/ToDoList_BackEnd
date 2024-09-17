const { Router } = require('express');
const ItemsService = require('../services/items');
const { setDuration, pack } = require('../core/utility');
const { validateError, validateOffsetAndLimit, validateTitleAndCreatedAt } = require('../core/validators');

const itemRouter = Router();

itemRouter.use(setDuration());

itemRouter.get('/', validateOffsetAndLimit, async (req, res) => {
    const { offset, limit } = req.query;
    const { start } = req;

    try {
        const data = await ItemsService.getAllItems(parseInt(offset), parseInt(limit));
        const result = pack(start, data);
        res.send(result);
    } catch (err) {
        const error = validateError(err);
        res.send(error);
    }
});


itemRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { start } = req;

    try {
        const data = await ItemsService.getItemById(id);
        const result = pack(start, data);
        res.send(result);
    } catch (err) {
        const error = validateError(err);
        res.send(error);
    }
});


itemRouter.post('/', validateTitleAndCreatedAt, async (req, res) => {
    const { title, createdAt } = req.body;
    const { start } = req;

    try {
        const data = await ItemsService.addItem(title, createdAt);
        const result = pack(start, data);
        res.send(result);
    } catch (err) {
        const error = validateError(err);
        res.send(error);
    }
});


itemRouter.patch('/:id', validateTitleAndCreatedAt, async (req, res) => {
    const { id } = req.params;
    const { title, createdAt } = req.body;
    const { start } = req;

    try {
        const data = await ItemsService.updateItemById(id, title, createdAt);
        const result = pack(start, data)
        res.send(result);
    } catch (err) {
        const error = validateError(err);
        res.send(error);
    }
});


itemRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { start } = req;

    try {
        const data = await ItemsService.deleteItemById(id);
        const result = pack(start, data);
        res.send(result);
    } catch (err) {
        const error = validateError(err);
        res.send(error);
    }
});


module.exports = itemRouter;