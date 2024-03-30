import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs =()=>{
  const {blogs,loading} = useBlogs()
  if (loading === true){
    return <div>
      Loading ...
    </div> 
  }
  return (
    <>
    <div className=" border-b-2 border-b-slate-300">
            <AppBar />
            </div>
    <div className=" flex justify-center items-center flex-col">
      <div className=" text-5xl pt-4 pb-6">
        Blogs
      </div>
      <div className=" cursor-pointer">
      {blogs.map(blog=>
          <BlogCard key={blog.id} id={blog.id} title={blog.title} content={blog.content} authorName={blog.author.name || "Anonymous"} publishDate="Dec 3,2023"/>
          )}
          </div>
        </div></>
        )
}

