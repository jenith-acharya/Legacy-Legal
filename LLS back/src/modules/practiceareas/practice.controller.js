const { uploadImage } = require("../../config/cloudinary.config");
const { deleteFile } = require("../../../utilis/helper");
const practiceService = require("./practice.service");
const slugify = require('slugify');

class PracticeController {
  async listForHome(req, res, next) { 
      try {
        const list = await practiceService.listPractices();
        res.json({ data: list , message: "List of practice areas for home" });
      } catch (error) {
          next(error);
      }
  }

  async countPractices(req, res, next) {
      try {
          const count = await practiceService.countPractices();
          res.json({ data: count, message: "Total practice areas", meta: null });
      } catch (error) {
          next(error);
      }
  }

  async listForTable(req, res, next) {
      try {
          const practices = await practiceService.listPractices();
          res.json({ data: practices, message: "Practice areas list", meta: null });
      } catch (error) {
          next(error);
      }
  }


  async createPractice(req, res, next) {
    try {
      const data = req.body;
  
      data.createdBy = req.authUser.id;
  
      if (!data.title) {
        throw { statusCode: 422, message: 'Title is required to generate slug' };
      }
      data.slug = slugify(data.title, { lower: true, strict: true });
  
      const response = await practiceService.createPractice(data);
  
      res.status(201).json({
        data: response,
        message: "Practice created successfully",
        meta: null
      });
    } catch (error) {
      next(error);
    }
  }

  async viewPractice(req, res, next) {
      try {
          const { practice } = req.params;
          if (!practice) return res.status(400).json({ message: "Practice ID is required" });

          const practiceDetail = await practiceService.getDetailByFilter({ _id: practice });
          if (!practiceDetail) return res.status(404).json({ message: "Practice not found" });

          res.status(200).json({ data: practiceDetail, message: "Practice details retrieved", meta: null });
      } catch (error) {
          next(error);
      }
  }

  async editPractice(req, res, next) {
      try {
          const { practice } = req.params;
          if (!practice) return res.status(400).json({ message: "Practice ID is required" });

          const data = req.body;
          const updatedPractice = await practiceService.updateById(practice, data);
          if (!updatedPractice) return res.status(404).json({ message: "Practice not found" });

          res.json({ data: updatedPractice, message: "Practice updated successfully", meta: null });
      } catch (error) {
          next(error);
      }
  }

  async deletePractice(req, res, next) {
      try {
          const { practice } = req.params;
          const deleted = await practiceService.deleteById(practice);
          if (!deleted) return res.status(404).json({ message: "Practice not found" });

          res.status(204).send();
      } catch (error) {
          next(error);
      }
  }
}

const practiceController = new PracticeController();
module.exports = practiceController;
