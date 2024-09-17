const ItemsModel = require('../models/items');
const errorsItems = require('../core/errors');
const { validateOffsetIsFinite, validateLimitIsFinite, validateResult } = require('../core/validators');

class ItemsService {

    static getAllItems = async (offset, limit, options = {}) => {

        validateOffsetIsFinite(offset);
        validateLimitIsFinite(limit);

        const result = await ItemsModel
            .find()
            .skip(offset)
            .limit(limit)
            .exec();

        validateResult(result);
        return result;
    }


    static getItemById = async (id) => {
        const result = await ItemsModel.findById(id);
        validateResult(result);

        return result;
    }


    static addItem = async (title, createdAt) => {
        try {
            const result = new ItemsModel({ title, createdAt });
            await result.save();
            return result;
        } catch (err) {
            throw new errorsItems.DatabaseError();
        }
    }


    static updateItemById = async (id, title, createdAt) => {

        const result = await ItemsModel.findById(id);
        validateResult(result);

        result.title = title
        result.createdAt = createdAt

        await result.save();
        return result;
    }


    static deleteItemById = async (id) => {
        const result = await ItemsModel.findById(id);

        validateResult(result);

        await result.deleteOne();
        return 'Deleted Successfully';
    }

}


module.exports = ItemsService;