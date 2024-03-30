import { AppBar } from "../components/AppBar"
import { FullBlog } from "../components/FullBlog"
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"
export const Blog = ()=>{
    const {id} = useParams()
    const {blog,loading} = useBlog({
        id:String(id || "")
    })
    if (loading === true){
        return <div>
          Loading ...
        </div> 
      }
    return <>
            <div className=" border-b-2 border-b-slate-300">
            <AppBar />
            </div>
            <FullBlog blog={blog}/>
            </>}