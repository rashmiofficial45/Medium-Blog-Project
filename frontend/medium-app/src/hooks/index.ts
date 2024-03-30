import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
export interface Blogs{
    title:string,
    content:string,
    author:{
        name:string
    }
    id:string
}
export const useBlog = ({id}:{id:string})=>{
    const [loading , setLoading] = useState(true)
    const [blog , setBlog] = useState<Blogs[]>([])
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then((res) => {
            setBlog(res.data.getData);
            setLoading(false);
        })
        .catch((error) => {
            // Handle error
            console.log("Error fetching blogs:", error);
            // Optionally, you can set an error state to display an error message to the user
            setLoading(false);
        });
    }, []);    
    return {
    loading ,blog
}
}
export const useBlogs=()=>{
   
    const [loading , setLoading] = useState(true)
    const [blogs , setBlogs] = useState<Blogs[]>([])
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then((res) => {
            setBlogs(res.data.blogs);
            setLoading(false);
        })
        .catch((error) => {
            // Handle error
            console.log("Error fetching blogs:", error);
            // Optionally, you can set an error state to display an error message to the user
            setLoading(false);
        });
    }, []);    
    return {
    loading ,blogs
}
}