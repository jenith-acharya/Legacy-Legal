// import {  useFetchBlogsByName } from '../../service/queries/queries';
// import { useParams } from 'react-router-dom';
// import BlogOverview from './blogs.overview.component';
// import LoadingComponent from '../../components/common/loading/loading.component';

// const BlogPageoverview = () => {
//     const id = useParams<{ blogsName: string }>();
//     const { data, isLoading } = useFetchBlogsByName(id as string);
  
//   if (isLoading) {
//     return <LoadingComponent/>
//   }
//   console.log(data)


//     return (
//     <>
    
//      <BlogOverview blog = {data}/>
     
//     </>
    
//     );
//   }
 
  


// export default BlogPageoverview;