const { uploadImage } = require("../../config/cloudinary.config");
const { deleteFile } = require("../../../utilis/helper");
const blogService = require("./blogs.services");

class BlogController {
  
  // Create a new blog post
  createBlog = async (req, res, next) => {
    try {
      const data = req.body;
      const image = req.file;

      // Upload image if provided
      if (image) {
        const imageUrl = await uploadImage(`./public/uploads/blogs/${image.filename}`);
        data.image = imageUrl;
        deleteFile(`./public/uploads/blogs/${image.filename}`);
      }

      data.createdBy = req.authUser.id;
      const response = await blogService.createBlog(data);

      res.json({
        result: response,
        message: "Blog post created successfully",
        meta: null,
      });
    } catch (exception) {
      console.log(`Error in createBlog ${exception}`);
      next(exception);
    }
  };

  // List all blog posts
  listBlogs = async (req, res, next) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      let filter = {};
      
      if (search) {
        filter.title = { $regex: search, $options: "i" };
      }

      const { blogs, totalPages, total, currentPage } = await blogService.listBlogs(page, limit, filter);

      res.json({
        result: blogs,
        message: "List of blog posts",
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

  // List all blog posts for Admin
  listBlogsForAdmin = async (req, res, next) => {
    try {
      const { page = 1, limit = 5, search } = req.query;
      let filter = {};
      
      if (search) {
        filter.title = { $regex: search, $options: "i" };
      }

      const { blogs, totalPages, total, currentPage } = await blogService.listBlogs(page, limit, filter);

      res.json({
        result: blogs,
        message: "List of blogs for admin",
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

  // View a single blog post
  viewBlog = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw { statusCode: 400, message: "Blog ID is required" };
      }
      const blogDetail = await blogService.getDetailById({ _id: id });
      res.status(200).json({
        result: blogDetail,
        message: "Blog post details retrieved successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  // View a single blog post for Admin
  viewBlogForAdmin = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw { statusCode: 400, message: "Blog ID is required" };
      }
      const blogDetail = await blogService.getDetailById({ _id: id });
      res.status(200).json({
        result: blogDetail,
        message: "Blog post details for admin retrieved successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  // Edit a blog post
  editBlog = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw { statusCode: 400, message: "Blog ID is required" };
      }
      const data = req.body;
      const image = req.file;
      if (image) {
        const imageUrl = await uploadImage(`./public/uploads/blogs/${image.filename}`);
        data.image = imageUrl;
        deleteFile(`./public/uploads/blogs/${image.filename}`);
      }
      const response = await blogService.updateById(id, data);
      res.json({ result: response, message: "Blog post updated successfully", meta: null });
    } catch (exception) {
      next(exception);
    }
  };

  // Delete a blog post
  deleteBlog = async (req, res, next) => {
    try {
      const { id } = req.params;
      await blogService.deleteById(id);
      res.json({ result: null, message: "Blog post deleted successfully", meta: null });
    } catch (exception) {
      next(exception);
    }
  };
}

// Export the controller instance
const blogController = new BlogController();
module.exports = blogController;
