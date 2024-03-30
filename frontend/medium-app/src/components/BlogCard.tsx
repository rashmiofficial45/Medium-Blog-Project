import { Link } from "react-router-dom"

interface BlogCardProps{
  id:string,
  authorName:string, 
  title:string ,
  content:string ,
  publishDate:string
}
export const BlogCard=({
  id,
  authorName , 
  title ,
  content ,
  publishDate
}:BlogCardProps)=> {
  return (
    <Link to={`/blogs/${id}`}>
    <div className="p-5 border border-slate-200 border-t-0 border-l-0 border-r-0 border-b-2">
      <div className=" flex items-center pb-2 ">
            <div className=" flex justify-center flex-col pr-2">
              <Avatar fullname={authorName}/>
            </div>
            <div className=" text-gray-800 font-medium pr-1">
              {authorName} 
            </div>
            <div className="text-slate-400 font-extrabold pr-1">
            &#183;
            </div>
            <div className="text-slate-500 ">
             {publishDate}
            </div>
      </div>
      
      <div className=" font-bold text-lg">
        {title}
      </div>
      <div className=" font-serif  pb-2">
      {content.slice(0, 100) + "..."}
      </div>
      <div className=" text-slate-400">
        {`${Math.ceil(content.length/100)} min read`}
      </div>
    </div>
    </Link>
  )
}
export function Avatar ({fullname , size="small"} : {fullname:string,size?:"big"|"small"}){
      return <div className={`relative inline-flex items-center justify-center ${size === "small"?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
      <span className={`${size === "small"?"text-md":"text-lg"} text-gray-600 dark:text-gray-300 font-bold `}>{fullname.charAt(0)}</span>
      </div>
}

