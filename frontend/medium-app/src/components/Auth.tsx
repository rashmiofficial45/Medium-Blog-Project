import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput , SigninInput} from "@rashmi_45/medium-common"
import axios from "axios"
import { BACKEND_URL } from "../config"
export const Auth=({type}:{type:"Signup"|"Signin"})=> {
    const navigate = useNavigate()
    const [postInputs,setPostInputs] = useState<SignupInput | SigninInput>({
        name:"",
        password:"",
        email:"",
    });
    async function sendRequest(){
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=="Signup"?"signup":"signin"}`,postInputs);
        const jwt = response.data.jwt;
        localStorage.setItem("token",jwt)
        navigate("/blogs")
    }
  return (
    
    <div className="h-screen flex flex-col justify-center items-center">
     <div className="text-center">
     <div className="text-3xl font-bold ">
     {type=="Signup"?"Create an account":"Sign in"}
        </div>
        <div className=" text-slate-500 font-semibold pt-1 pb-6">
        {type=="Signup"?"Already have an account?": "Don't have an account?"}
            <Link className=" pl-1 underline" to={type=="Signup"?"/signin":"/signup"}>
            {type=="Signup"?"Login":"Sign up"}
            </Link>
        </div>
        </div>
        <div className="text-start w-96 px-10">
            <div className=" pb-2">
                {type=="Signup"?<InputBox title="Username" placeholder="Rashmi Ranjan Parija ..." onChange={(e)=>{
                    setPostInputs(c =>({
                        ...c,
                        name:e.target.value
                    }))
                    }} />:""}
            </div>
            <div className="pb-2">
                <InputBox title="Email" placeholder="rashmi23@gmail.com ..." onChange={(e)=>{
                    setPostInputs(c =>({
                        ...c,
                        email:e.target.value
                    }))
                    }} />
            </div>
            <div className="pb-2">
                <InputBox title="Password" types={"password"} placeholder="123456 ..." onChange={(e)=>{
                    setPostInputs(c =>({
                        ...c,
                        password:e.target.value
                    }))
                    }} />
            </div>
            <div className="py-2">
            {type === "Signup" ? <Button value="Signup" onClick={sendRequest}/> : <Button value="Signin" onClick={sendRequest}/>}            
            </div>
        </div>
    </div>
  )
}
interface InputBoxType {
    title:string,
    placeholder:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
    types?:string
}
function InputBox({title , placeholder , onChange , types}:InputBoxType){
    return <div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <input onChange={onChange} type={types || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>

    </div>
}
function Button(props: { value: string , onClick: () => Promise<void> }) {
    return <div>
        <button type="button" onClick={props.onClick} className="w-full h-10 px-6 text-indigo-100 transition-colors duration-150 bg-slate-950 rounded-lg focus:shadow-outline text-center py-2 font-semibold cursor-pointer">{props.value}</button>
    </div>
}
