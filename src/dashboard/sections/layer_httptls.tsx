import { useEffect, useState } from "react"
import { getBaseDirectory, getCSRFToken } from "../../utils/utils"
import axios from "axios"
import CardEnableLayer from "../../views/cardEnableLayer"


interface TLSHTTP{
    Http:{
        Response:string,
    }
    Tls:{
        Cert:string,
        Key:string,
    },
    Listen:string
}

interface LayerSSLParams {
    enabled:boolean,
    ht:TLSHTTP[]
}



const Layer_HTTPTLS = () => {
    let [lhttpsslParam, SetlhttpsslParam] = useState<LayerSSLParams>({ enabled: false, ht:[{Http:{Response:""},Tls:{Cert: getBaseDirectory()+"/cfg/cert.pem",Key:getBaseDirectory()+"/cfg/key.pem"},Listen:""}]})

    let notify= ()=>{
        SetlhttpsslParam({...lhttpsslParam})
    }

    let refreshHTTPTLS = ()=>{
        axios.get("/api/read/httptls?"+getCSRFToken()).then((response)=>{
            
            if (response.data.length > 0){
                lhttpsslParam.enabled = true
                lhttpsslParam.ht = response.data
            }else{
                lhttpsslParam.enabled = false
                lhttpsslParam.ht = [{Http:{Response:""},Tls:{Cert: getBaseDirectory()+"/cfg/cert.pem",Key:getBaseDirectory()+"/cfg/key.pem"},Listen:""}]
            }
           
            notify()
    }).catch((err)=>{
        
    })
    }

    useEffect(()=>{
        refreshHTTPTLS()
},[])

    
    let addNewHTTPSSLLayer = () => {
        lhttpsslParam.ht.push({Http:{Response:""},Tls:{Cert: getBaseDirectory()+"/cfg/cert.pem",Key:getBaseDirectory()+"/cfg/key.pem"},Listen:""})
        notify()
    }

    let removeThisHTTPSSLLayer = (pindex: number) => {

        let htparam = lhttpsslParam.ht.filter((e, index) => {
            return index != pindex
        })
        lhttpsslParam.ht = htparam
        notify()
    }
    return (<>
        <div className="w-full">


        <CardEnableLayer enabled={lhttpsslParam.enabled} onChange={(value)=>{
                lhttpsslParam.enabled = value
                notify()
            }} >

            </CardEnableLayer>
            <div className="flex flex-row justify-center mt-5">
                <div className="flex flex-col w-3/5 p-4 shadow-2 bg-white  md:w-3/5 w-4/5 with-overflow-vh" >
                    <h4 className="mb-1 mt-2 font-bold font-sans  text-black dark:text-white">
                        Listen layer(s) SSL/TLS
                    </h4>
                    <p className="text-xs text-gray-200 mb-2">
                        The configurations are similar to HTTP, however this type of HTTP TLS layer allows you to create a connection where an SSL/TLS connection is first established and once an HTTP packet is sent within said connection, the parameters, as you will understand, are the mix between the HTTP layer and also TLS,

                    </p>
                    {
                        lhttpsslParam.ht.map((param, index) => {
                            let isLast = index == lhttpsslParam.ht.length - 1
                            return (<>
                                <div className="flex flex-col">

                                    <div className="w-full flex flex-row justify-between items-center">
                                        <p className="text-xs text-gray-200 mb-2 ">The SSL/TLS Layer server address : 0.0.0.0:443</p>
                                        {index > 0 &&
                                            <a onClick={() => {
                                                removeThisHTTPSSLLayer(index)
                                            }} href="#" className=" px-2 py-2 text-center text-xs text-primary ">
                                                Delete this layer
                                            </a>
                                        }

                                    </div>





                                    <input value={param.Listen} onChange={(e) => {
                                        param.Listen = e.target.value
                                        notify()
                                    }} type="text" className=" rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />

                                    <p className="text-xs text-gray-200 mb-2 mt-2 ">The HTTP Response in the HTTP connection example: HTTP/1.1 200 OK\r\n\r\n</p>
                                    <input placeholder="HTTP/1.1 200 OK\r\n\r\n" value={param.Http.Response} onChange={(e) => {
                                        param.Http.Response = e.target.value
                                        notify()
                                    }} type="text" className=" rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />

                                    {isLast &&
                                        <div className="w-full flex flex-row justify-end">
                                            <a onClick={() => addNewHTTPSSLLayer()} href="#" className=" px-2 py-2 text-center text-xs text-primary ">
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
                            if ((lhttpsslParam.ht[0].Listen != "" || lhttpsslParam.ht.length > 0) && !lhttpsslParam.enabled){
                                if (!confirm("are you sure you want to disable this layer?")){
                                    return
                                }
                            }
                            axios.post("/api/layer/httptls?"+getCSRFToken(),lhttpsslParam).then((response)=>{
                                let message = lhttpsslParam.enabled ? "HTTP/TLS Mix layer updated" : "HTTP/TLS Mix layer disabled and deleted parameters"
                                alert(message)
                               
                            })
                        }
                        } className="w-3/4 mt-2 flex w-full cursor-pointer justify-center rounded bg-sky-800 p-3 font-medium text-gray hover:bg-opacity-90">Save HTTP/TLS Layer</button>
                    </div>
                </div>
            </div>

        </div>
    </>)
}

export default Layer_HTTPTLS