import BlogsSvc from "../../pages/blogs/blogs.service";

export const getBlogsByName = async (_id : string) => {
    return await BlogsSvc.getRequest(`/blogs/${_id}`);
  };

