const { uploadImage, cloudinary } = require("../../config/cloudinary.config");
const { deleteFile } = require("../../../utilis/helper");
const blogService = require("./blogs.services");
const slugify = require('slugify'); 

const getCloudinaryUrl = (publicId) => {
  return `https://res.cloudinary.com/${cloudinary.config().cloud_name}/image/upload/${publicId}`;
};


class BlogController {
  
  // Create a new blog post

  createBlog = async (req, res, next) => {
    try {
      const data = req.body;
      const image = req.file;
  
      
      
        const publicId = await uploadImage(`./public/uploads/blogs/${image.filename}`);
        data.image = publicId;
        // console.log("Image", data.image)
        deleteFile(`./public/uploads/blogs/${image.filename}`);
      
  
      
      if (!data.title) {
        throw { statusCode: 422, message: 'Blog title is required to generate slug' };
      }
  

      data.slug = slugify(data.title, { lower: true, strict: true }); 
      
  
      
      data.createdBy = req.authUser._id;
      
      const response = await blogService.createBlog(data);
  
      res.json({
        data: response,
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
      const { page = 1, limit = 5, search } = req.query;
      let filter = {};
      
      if (search) {
        filter.title = { $regex: search, $options: "i" };
      }

      const { blogs, totalPages, total, currentPage } = await blogService.listblogs(page, limit, filter);

      blogs.forEach(blog => {
        blog.image = getCloudinaryUrl(blog.image); // Use the URL function here
      });
      
      res.json({
        data: blogs,
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
        filter.title = { $regex: search, $options: "i" }
        
      }

      const { blogs, totalPages, total, currentPage } = await blogService.listblogs(page, limit, filter);

      blogs.forEach(blog => {
        blog.image = getCloudinaryUrl(blog.image); 
      });

      res.json({
        data: blogs,
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
      const blog = req.params.blogsName;
      if (!blog) {
        throw { statusCode: 400, message: "blogName is required" };
      }
      const blogDetail = await blogService.getDetailByFilter({ title: blog });
      if (!blogDetail) {
        throw { statusCode: 404, message: "blog not found" };
      }

      
      res.status(200).json({
        result: blogDetail,
        message: "Blog detail",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  
viewBlogForAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw { statusCode: 400, message: "Blog ID is required" };
    }

    // Fetch the blog detail by ID
    const blogDetail = await blogService.getDetailById({ _id: id });

    if (Array.isArray(blogDetail)) {
      blogDetail.forEach(blog => {
        blog.image = getCloudinaryUrl(blog.image); // Use the URL function here
      });
    } else {
      blogDetail.image = getCloudinaryUrl(blogDetail.image); // If it's a single object, format the image URL
    }

    res.status(200).json({
      data: blogDetail,
      message: "Blog post details for admin retrieved successfully",
      meta: null,
    });
  } catch (exception) {
    next(exception);
  }
};


  viewBlogByName = async (req, res, next) => {
    try {
      const { name } = req.params;
      if (!name) {
        throw { statusCode: 400, message: "Blog Name is required" };
      }
      const blogDetail = await blogService.getDetailByTitle({ name: name });
      res.status(200).json({
        data: blogDetail,
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
      const  id = req.params.id;
      if (!id) {
        throw { statusCode: 400, message: "Blog ID is required" };
      }
      const data = req.body;
      const image = req.file;

      if (image) {
        console.log("Image", image)
        const publicId = await uploadImage(`./public/uploads/blogs/${image.filename}`);
        data.image = publicId;
        deleteFile(`./public/uploads/blogs/${image.filename}`);
      }

    

      const response = await blogService.updateBlogByID(id, data);
  
      res.json({ data: response, message: "Blog post updated successfully", meta: null });
    } catch (exception) {
      next(exception);
    }
  };

  // Delete a blog post
  deleteBlog = async (req, res, next) => {
    try {
      const { id } = req.params;
      await blogService.deleteById(id);
      res.json({ data: null, message: "Blog post deleted successfully", meta: null });
    } catch (exception) {
      next(exception);
    }
  };
}

// Export the controller instance
const blogController = new BlogController();
module.exports = blogController;