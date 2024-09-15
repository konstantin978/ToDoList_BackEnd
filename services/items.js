const ItemsModel = require('../models/items');
const { errors, CustomError } = require('../errors');

class ItemsService {

    static getAllItems = async (offset, limit, options = {}) => {
        if (!isFinite(offset)) {
            throw new CustomError(errors.INVALID_OFFSET);
        }
        if (!isFinite(limit)) {
            throw new CustomError(errors.INVALID_LIMIT);
        }


        const result = await ItemsModel
            .find()
            .skip(offset)
            .limit(limit)
            .exec();
        return result;
    }


    static getItemById = async (id) => {
        const result = await ItemsModel.findById(id);
        if (!result) {
            throw new CustomError(errors.INVALID_ID);
        }

        return result;
    }

    static addItem = async (title, createdAt) => {
        try {
            const result = new ItemsModel({ title, createdAt });
            await result.save();
            return result;
        } catch (err) {
            throw new CustomError(errors.DATABASE_ERROR);
        }
    }


    static updateItemById = async (id, title, createdAt) => {

        const result = await ItemsModel.findById(id);
        if (!result) {
            throw new CustomError(errors.INVALID_ID);
        }

        result.title = title
        result.createdAt = createdAt

        await result.save();
        return result;
    }


    static deleteItemById = async (id) => {
        const result = await ItemsModel.findById(id);

        if (!result) {
            throw new CustomError(errors.INVALID_ID);
        }
        await result.deleteOne();
        return 'Deleted Successfully';
    }

}


module.exports = ItemsService;