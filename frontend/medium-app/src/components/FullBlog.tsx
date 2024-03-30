import { Blogs } from "../hooks";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blogs }) => {
  return (
    <div className="grid grid-cols-12 p-20 w-full" key={blog.id}>
      <div className=" col-span-8  ">
                    <div className="text-4xl font-bold pb-3">{blog.title}</div>
                    <div className=" text-slate-500 pb-3">Posted on August 24 2024</div>
                    <div className=" text-slate-800">{blog.content} </div>
      </div>
      <div className=" pl-10 col-span-4 flex flex-col ">
                    <div className="pb-5">
                    Author
                    </div>
                    <div className=" flex items-center gap-3">
                        <div className="">
                        <Avatar size="big" fullname={blog.author.name || "Anonymous"}/>
                        </div>
                        <div className=" font-semibold text-lg">
                        {blog.author.name || "Anonymous"} 
                        </div>
                    </div>
        </div>
    </div>
  );
};
