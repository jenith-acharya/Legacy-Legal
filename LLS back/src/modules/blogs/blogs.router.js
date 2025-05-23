const { loginCheck } = require('../../middlewares/auth.middleware');
const { hasPermission } = require('../../middlewares/rbac.middleware');
const { setPath, uploadFile } = require('../../middlewares/uploader.middleware');
const  {bodyValidator}  = require('../../middlewares/validator.middlware');
const { BlogCreateDTO, BlogUpdateDTO } = require('./blogs.request');
const blogController = require('./blogs.controller');

const router = require('express').Router();

// Public routes
router.route('/list-home')
    .get(blogController.listBlogs);



// router.route('/:blogsName')
//     .get(blogController.viewBlog);
 
// Admin protected routes
router.route('/')
    .get(loginCheck, hasPermission(['admin']), blogController.listBlogsForAdmin)
    .post(loginCheck, hasPermission(['admin']), setPath('blogs'), uploadFile().single('image'), bodyValidator(BlogCreateDTO), blogController.createBlog);

router.route('/:id')
    .get( blogController.viewBlogForAdmin)
    .patch(loginCheck, hasPermission(['admin']), setPath('blogs'), uploadFile().single('image'), bodyValidator(BlogUpdateDTO), blogController.editBlog)
    .delete(loginCheck, hasPermission(['admin']), blogController.deleteBlog);

module.exports = router;
