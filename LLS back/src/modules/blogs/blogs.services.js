const BlogModel = require("./blogs.model");

class BlogService {
    
    // Create a new blog post
    createBlog = async (data) => {
        try {
            const blog = new BlogModel(data);
            return await blog.save();
        } catch (exception) {
            throw exception;
        }
    };

     

    // Get all blog posts with pagination and filtering
    listblogs = async (currentPage = 1, limit = 5, filter = {}) => {
        try {
            const skip = (currentPage - 1) * limit;
            const total = await BlogModel.countDocuments(filter);
            const totalPages = Math.ceil(total / limit);
            const blogs = await BlogModel.find(filter)
                .populate('createdBy', ["_id", "name", "email", "image"])
                .skip(skip)
                .limit(limit)
                .sort({ _id: 'desc' });

            return { blogs, totalPages, total, limit, currentPage };
        } catch (exception) {
            throw exception;
        }
    };

    // Get blog posts for landing page (simplified version)
    landingPageBlogs = async (currentPage = 1, limit = 5, filter = {}) => {
        try {
            const skip = (currentPage - 1) * limit;
            const totalBlogs = await BlogModel.countDocuments(filter);
            const blogs = await BlogModel.find(filter).skip(skip).limit(limit);
            const hasMore = skip + limit < totalBlogs;
            
            return { blogs, hasMore };
        } catch (exception) {
            throw exception;
        }
    };

    // Get a single blog post by filter
    getDetailByFilter = async (filter) => {
        try {
            const blogDetail = await BlogModel.findOne(filter).populate('createdBy', ['_id', 'name', 'email']);
            if (!blogDetail) {
                throw { statusCode: 404, message: "Blog post not found" };
            }
            return blogDetail;
        } catch (exception) {
            throw exception;
        }
    };

    // Delete a blog post by ID
    deleteById = async (id) => {
        try {
            const response = await BlogModel.findByIdAndDelete(id);
            if (!response) {
                throw { statusCode: 404, message: "Blog post not found" };
            }
            return response;
        } catch (exception) {
            throw exception;
        }
    };

    // Update a blog post by title
    updateBlogByID = async (id, data) => {
        try {
            
            const response = await BlogModel.findByIdAndUpdate( id , data, { new: true });
            if (!response) {
                throw { statusCode: 404, message: "Blog post not found" };
            }
            return response;
        } catch (exception) {
            throw exception;
        }
    };

    getDetailById = async (id) => {
        try {
            const blogDetail = await BlogModel.findById(id).populate('createdBy', ['_id', 'name', 'email']);
            if (blogDetail) {
                return blogDetail;
            } else {
                throw { statusCode: 422, message: "Unable to process request" };
            }
        } catch (exception) {
            throw exception;
        }
    };

    // Count total blog posts
    countBlogs = async () => {
        try {
            return await BlogModel.countDocuments();
        } catch (exception) {
            throw exception;
        }
    };
}

// Create an instance of BlogService
const blogService = new BlogService();

module.exports = blogService;