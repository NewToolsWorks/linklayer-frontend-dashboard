import axios from "axios";
import { useEffect, useState } from "react";
import {getCSRFToken} from "../../utils/utils"
 interface AuthService{
    limit_conn_single:number,
    limit_conn_request:number,
    banner:string
}




const Authentication = () => {
      
    

  
    let [authParam,setAuth]  = useState<AuthService>({limit_conn_request:-1,limit_conn_single:-1,banner:""})
    useEffect( ()=>{
        axios.get("/api/get/auth?"+getCSRFToken()).then((Response)=>{
            authParam = Response.data
            notify()
        })
        
    },[])


    let notify = ()=>{
        setAuth({...authParam})
    }

   

    return (<>
        <div className="w-full">

            <div className="flex flex-row justify-center mt-5">
                <div className="flex flex-col w-3/5 p-4 shadow-2 bg-white" >
                    <h4 className="mb-1 mt-2 font-bold font-sans  text-black dark:text-white">
                        Limit single connection
                    </h4>
                    <p className="text-xs text-gray-200 mb-2 ">Adjusting this argument allows adjusting how many connections per user are valid in single tunnel mode, if it is -1 it means that the user has no limit. The operation happens when, for example, if you configure that a user can only connect once, if another user connects with the same credentials it will kill the previous connection, since it only allows 1 connection per user.</p>
                    <input value={authParam.limit_conn_single} onChange={
                        (e)=>{
                            authParam.limit_conn_single = parseInt(e.target.value)
                            notify()
                        }
                    } type="number" min="-1" className=" rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" placeholder="-1" />


                    <h4 className="mb-1 mt-2  font-bold font-sans  text-black dark:text-white">
                        Limit request connection
                    </h4>
                    <p className="text-xs text-gray-200 mb-2 ">This argument limits the connections that can be made by request mode, be careful here it is different from single, an approximation of how many connections a user generates must be adjusted since request mode works very differently than single mode, here it is necessary to modify the value until it adjusts to contexts real users. If left at -1 it means there is no limit.</p>
                    <input value={authParam.limit_conn_request} onChange={
                        (e)=>{
                            authParam.limit_conn_request = parseInt(e.target.value)
                            notify()
                        }
                    } type="number" min="-1" className=" rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" placeholder="-1" />
                    
                    <h4 className="mb-1 mt-2  font-bold font-sans  text-black dark:text-white">
                        Banner
                    </h4>
                    <p className="text-xs text-gray-200 mb-2 ">Banner that will be shown to the user when authenticating </p>
                    <input value={authParam.banner} onChange={
                        (e)=>{
                            authParam.banner = e.target.value
                            notify()
                        }
                    } type="text"  className=" rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" placeholder="Your banner here" />
                    
                    
                    <div className="w-full flex flex-row justify-center">
                        <button onClick={()=>{
                            axios.post("/api/auth?"+getCSRFToken(),authParam).then((response)=>{
                                    alert("Authentication saved")
                            }).catch((err)=>{
                                alert(err.message)
                            })
                        }} className="w-3/4 mt-2 flex w-full cursor-pointer justify-center rounded bg-sky-800 p-3 font-medium text-gray hover:bg-opacity-90">Save Auth</button>
                    </div>
                </div>
            </div>

        </div>
    </>)
}

export default Authentication;