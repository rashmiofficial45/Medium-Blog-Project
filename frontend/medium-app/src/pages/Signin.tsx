import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"
function Signin() {
  return (
    <div>
      <div className=" m-0 p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
                <Auth type="Signin"/>
            </div>
            <div className="invisible md:visible">
             <Quote/>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Signin
