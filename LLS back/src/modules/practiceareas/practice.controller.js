const { uploadImage, cloudinary } = require("../../config/cloudinary.config");
const { deleteFile } = require("../../../utilis/helper");
const practiceService = require("./practice.service");
const slugify = require('slugify');

const getCloudinaryUrl = (publicId) => {
  return `https://res.cloudinary.com/${cloudinary.config().cloud_name}/image/upload/${publicId}`;
};

class PracticeController {

  // Create a new practice item
  createPractice = async (req, res, next) => {
    try {
      const data = req.body;
      const image = req.file;

      if (image) {
        const publicId = await uploadImage(`./public/uploads/practices/${image.filename}`);
        data.image = publicId;
        deleteFile(`./public/uploads/practices/${image.filename}`);
      }

      if (!data.title) {
        throw { statusCode: 422, message: 'Practice title is required to generate slug' };
      }

      data.slug = slugify(data.title, { lower: true, strict: true });
      data.createdBy = req.authUser._id;

      const response = await practiceService.createPractice(data);

      res.json({
        data: response,
        message: "Practice item created successfully",
        meta: null,
      });
    } catch (exception) {
      console.log(`Error in createPractice ${exception}`);
      next(exception);
    }
  };

  // List all practice items
  listPractices = async (req, res, next) => {
    try {
      const { page = 1, limit = 5, search } = req.query;
      let filter = {};

      if (search) {
        filter.title = { $regex: search, $options: "i" };
      }

      const { practices, totalPages, total, currentPage } = await practiceService.listPractices(page, limit, filter);

      practices.forEach(practice => {
        practice.image = getCloudinaryUrl(practice.image);
      });

      res.json({
        data: practices,
        message: "List of practice items",
        meta: {
          total,
          currentPage,
          totalPages,
          limit
        },
      });
    } catch (exception) {
      next(exception);
    }
  };

  // View a single practice item
  viewPractice = async (req, res, next) => {
    try {
      const practice = req.params.practiceName;
      if (!practice) {
        throw { statusCode: 400, message: "practiceName is required" };
      }
      const practiceDetail = await practiceService.getDetailByFilter({ title: practice });
      if (!practiceDetail) {
        throw { statusCode: 404, message: "Practice item not found" };
      }

      res.status(200).json({
        result: practiceDetail,
        message: "Practice item detail",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  // View practice item for Admin
  viewPracticeForAdmin = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw { statusCode: 400, message: "Practice ID is required" };
      }

      const practiceDetail = await practiceService.getDetailById({ _id: id });

      if (Array.isArray(practiceDetail)) {
        practiceDetail.forEach(practice => {
          practice.image = getCloudinaryUrl(practice.image);
        });
      } else {
        practiceDetail.image = getCloudinaryUrl(practiceDetail.image);
      }

      res.status(200).json({
        data: practiceDetail,
        message: "Practice item details for admin retrieved successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  // Edit a practice item
  editPractice = async (req, res, next) => {
    try {
      const id = req.params.id;
      if (!id) {
        throw { statusCode: 400, message: "Practice ID is required" };
      }
      const data = req.body;
      const image = req.file;

      if (image) {
        const publicId = await uploadImage(`./public/uploads/practices/${image.filename}`);
        data.image = publicId;
        deleteFile(`./public/uploads/practices/${image.filename}`);
      }

      const response = await practiceService.updateById(id, data);

      res.json({ data: response, message: "Practice item updated successfully", meta: null });
    } catch (exception) {
      next(exception);
    }
  };

  // Delete a practice item
  deletePractice = async (req, res, next) => {
    try {
      const { id } = req.params;
      await practiceService.deleteById(id);
      res.json({ data: null, message: "Practice item deleted successfully", meta: null });
    } catch (exception) {
      next(exception);
    }
  };
}

// Export the controller instance
const practiceController = new PracticeController();
module.exports = practiceController;
