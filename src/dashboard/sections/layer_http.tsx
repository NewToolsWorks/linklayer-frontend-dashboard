import { useEffect, useState } from "react"
import CardEnableLayer from "../../views/cardEnableLayer"
import axios from "axios"
import { getCSRFToken } from "../../utils/utils"

interface HTTP{
    Response: string,
    Listen: string
}

interface LayerHTTPParams {
    enabled:boolean,
    h:HTTP[]
}

const Layer_HTTP = () => {

    let [lHTTPParam, SetlHTTPParam] = useState<LayerHTTPParams>({ enabled:false, h: [{  Listen: "", Response: "" }]})

    let notify = ()=>{
        SetlHTTPParam({...lHTTPParam})
    }

    let refreshHTTP = ()=>{
        axios.get("/api/read/http?"+getCSRFToken()).then((response)=>{
            
            if (response.data.length > 0){
                lHTTPParam.enabled = true
                lHTTPParam.h = response.data
            }else{
                lHTTPParam.enabled = false
                lHTTPParam.h = [{  Listen: "", Response: "" }]
            }
           
            notify()
    }).catch((err)=>{
        
    })
    }


    useEffect(()=>{
            refreshHTTP()
    },[])

    let addNewHTTPLayer = () => {
        lHTTPParam.h.push({  Listen: "", Response: "" })
        notify()
    }

   

    let removeThisHTTPLayer = (pindex: number) => {

        let newhttp = lHTTPParam.h.filter((e, index) => {
            return index != pindex
        })
        
        lHTTPParam.h = newhttp
        notify()    
    }

    return (<>

        <div className="w-full">

            <CardEnableLayer enabled={lHTTPParam.enabled} onChange={(value)=>{
                lHTTPParam.enabled = value
                notify()
            }} >

            </CardEnableLayer>

            <div className="flex flex-row justify-center mt-5">
                <div className="flex flex-col w-3/5 p-4 shadow-2 bg-white with-overflow-vh  md:w-3/5 w-4/5" >
                    <h4 className="mb-1 mt-2 font-bold font-sans  text-black dark:text-white">
                        Listen layer(s) HTTP
                    </h4>

                    {
                        lHTTPParam.h.map((param, index) => {
                            let isLast = index == lHTTPParam.h.length - 1
                            return (<>
                                <div className="flex flex-col">

                                    <div className="w-full flex flex-row justify-between items-center">
                                        <p className="text-xs text-gray-200 mb-2 ">The address where the example server will listen : 0.0.0.0:80</p>
                                        {index > 0 &&
                                            <a onClick={() => {
                                               removeThisHTTPLayer(index)
                                            }} href="#" className=" px-2 py-2 text-center text-xs text-primary ">
                                                Delete this layer
                                            </a>
                                        }

                                    </div>




                                    <input value={param.Listen} onChange={(e) => {
                                        param.Listen = e.target.value
                                        notify()

                                    }} type="text" className=" rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />


                                    <p className="text-xs text-gray-200 mb-2 mt-2 ">Response HTTP example: HTTP/1.1 200 OK\r\n\r\n</p>
                                    <input placeholder="HTTP/1.1 200 OK\r\n\r\n" value={param.Response} onChange={(e) => {
                                        param.Response = e.target.value
                                        notify()
                                    }} type="text" className=" rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />


                                    {isLast &&
                                        <div className="w-full flex flex-row justify-end">
                                            <a onClick={() => {
                                                addNewHTTPLayer()
                                            }} href="#" className=" px-2 py-2 text-center text-xs text-primary ">
                                                Add new layer
                                            </a>
                                        </div>
                                    }
                                </div>
                            </>)
                        })
                    }



                    <div className="w-full flex flex-row justify-center">
                        <button onClick={
                            ()=>{
                                if ((lHTTPParam.h[0].Listen != "" || lHTTPParam.h.length > 0) && !lHTTPParam.enabled){
                                    if (!confirm("are you sure you want to disable this layer?")){
                                        return
                                    }
                                }
                                axios.post("/api/layer/http?"+getCSRFToken(),lHTTPParam).then((response)=>{
                                    let message = lHTTPParam.enabled ? "HTTP layer updated" : "HTTP layer disabled and deleted parameters"
                                    alert(message)
                                    refreshHTTP()
                                }).catch((err)=>{
                                    alert("service running, please stop.")
                                })
                            }
                        } className="w-3/4 mt-2 flex w-full cursor-pointer justify-center rounded bg-sky-800 p-3 font-medium text-gray hover:bg-opacity-90">Save HTTP Layer</button>
                    </div>
                </div>
            </div>

        </div>

    </>)
}


export default Layer_HTTP