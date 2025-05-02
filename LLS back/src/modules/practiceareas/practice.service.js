const PracticeModel = require("./practiceareas.model");

class PracticeService {
    
    // Create a new practice area
    createPractice = async (data) => {
        try {
            const practice = new PracticeModel(data);
            return await practice.save();
        } catch (exception) {
            throw exception;
        }
    };

    // List all practice areas with pagination and filtering
    listPractices = async (currentPage = 1, limit = 5, filter = {}) => {
        try {
            const skip = (currentPage - 1) * limit;
            const total = await PracticeModel.countDocuments(filter);
            const totalPages = Math.ceil(total / limit);
            const practices = await PracticeModel.find(filter)
                .populate(["_id", "title", "image", "description"])
                .skip(skip)
                .limit(limit)
                .sort({ _id: 'desc' });

            return { practices, totalPages, total, limit, currentPage };
        } catch (exception) {
            throw exception;
        }
    };

    // Get details of a practice area by filter
    getDetailByFilter = async (filter) => {
        try {
            const practiceDetail = await PracticeModel.findOne(filter);
            if (!practiceDetail) {
                throw { statusCode: 404, message: "Practice area not found" };
            }
            return practiceDetail;
        } catch (exception) {
            throw exception;
        }
    };

    // Delete a practice area by ID
    deleteById = async (id) => {
        try {
            const response = await PracticeModel.findByIdAndDelete(id);
            if (!response) {
                throw { statusCode: 404, message: "Practice area not found" };
            }
            return response;
        } catch (exception) {
            throw exception;
        }
    };

    // Update a practice area by ID
    updateById = async (id, data) => {
        try {
            const response = await PracticeModel.findByIdAndUpdate(id, data, { new: true });
            if (!response) {
                throw { statusCode: 404, message: "Practice area not found" };
            }
            return response;
        } catch (exception) {
            throw exception;
        }
    };

    // Count total practice areas
    countPractices = async () => {
        try {
            return await PracticeModel.countDocuments();
        } catch (exception) {
            throw exception;
        }
    };
}

// Create an instance of PracticeService
const practiceService = new PracticeService();

module.exports = practiceService;
