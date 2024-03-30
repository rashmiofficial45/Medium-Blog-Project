import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

function Signup() {
  return (
    <div className=" m-0 p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
                <Auth type="Signup"/>
            </div>
            <div className="hidden md:block">
             <Quote/>
            </div>
        </div>
    </div>
    
  )
}

export default Signup
