import { useEffect, useState } from "react"
import { getBaseDirectory, getCSRFToken } from "../../utils/utils"

import CheckboxTwo from "../../components2/Checkboxes/CheckboxTwo"
import axios from "axios"
import CardEnableLayer from "../../views/cardEnableLayer"

interface SSLTLS {
    Cert:string,
    Key:string,
    Listen: string,
    
}

interface SSLTLSParam{
    enabled:boolean,
    t:SSLTLS[]
}



const Layer_SSL = () => {
    let [lSSLParam, SetlSSLParam] = useState<SSLTLSParam>({enabled:false,t:[{Cert: getBaseDirectory()+"/cfg/cert.pem",Key:getBaseDirectory()+"/cfg/key.pem",Listen:""}]})

    
    let notify = ()=>{
        SetlSSLParam({...lSSLParam})
    }

    let refreshTLS = ()=>{
        axios.get("/api/read/tls?"+getCSRFToken()).then((response)=>{
            
            if (response.data.length > 0){
                lSSLParam.enabled = true
                lSSLParam.t = response.data
            }else{
                lSSLParam.enabled = false
                lSSLParam.t = [{Cert: getBaseDirectory()+"/cfg/cert.pem",Key:getBaseDirectory()+"/cfg/key.pem",Listen:""}]
            }
           
            notify()
    }).catch((err)=>{
        
    })
    }

    useEffect(()=>{
           refreshTLS()
    },[])

    let addNewSSLTLSLayer = () => {
        lSSLParam.t.push({Cert:getBaseDirectory()+"/cfg/cert.pem",Key:getBaseDirectory()+"/cfg/key.pem",Listen:""})
        notify()
    }

    let removeThisSSLTLSLayer = (pindex:number) =>{
       
        let newlSSLParam = lSSLParam.t.filter((e,index)=>{
            return index != pindex
        })

        lSSLParam.t = newlSSLParam
       
        notify()
    }
  
    return (<>
        <div className="w-full">
            <CardEnableLayer enabled={lSSLParam.enabled} onChange={(v)=>{
                lSSLParam.enabled = v
                notify()
            }} ></CardEnableLayer>
            
            <div className="flex flex-row justify-center mt-5">
                <div className="flex flex-col w-3/5 p-4 shadow-2 bg-white  with-overflow-vh md:w-3/5 w-4/5" >
                    <h4 className="mb-1 mt-2 font-bold font-sans  text-black dark:text-white">
                        Listen layer(s) SSL/TLS
                    </h4>

                    {
                        lSSLParam.t.map((param, index) => {
                            let isLast = index == lSSLParam.t.length - 1
                            return (<>
                                <div className="flex flex-col">

                                    <div className="w-full flex flex-row justify-between items-center">
                                        <p className="text-xs text-gray-200 mb-2 ">The address where the example server will listen : 0.0.0.0:443</p>
                                        { index > 0 &&
                                            <a onClick={()=>{
                                                if (confirm("Are your sure delete "+lSSLParam.t[index].Listen)){
                                                    removeThisSSLTLSLayer(index)
                                                }
                                               
                                            }} href="#" className=" px-2 py-2 text-center text-xs text-primary ">
                                                Delete this layer
                                            </a>
                                        }

                                    </div>





                                    <input value={param.Listen} onChange={(e)=>{
                                        param.Listen = e.target.value
                                        notify()
                                    }} type="text" className=" rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                                    {isLast &&
                                        <div className="w-full flex flex-row justify-end">
                                            <a onClick={() => addNewSSLTLSLayer()} href="#" className=" px-2 py-2 text-center text-xs text-primary ">
                                                Add new layer
                                            </a>
                                        </div>
                                    }
                                </div>
                            </>)
                        })
                    }



                    <div className="w-full flex flex-row justify-center">
                        <button onClick={()=>{
                            if ((lSSLParam.t[0].Listen != "" || lSSLParam.t.length > 0) && !lSSLParam.enabled){
                                if (!confirm("are you sure you want to disable this layer?")){
                                    return
                                }
                            }
                            axios.post("/api/layer/tls?"+getCSRFToken(),lSSLParam).then((response)=>{
                                let message = lSSLParam.enabled ? "TLS layer updated" : "TLS layer disabled and deleted parameters"
                                alert(message)
                                refreshTLS()
                            }).catch((err)=>{
                                alert("service running, please stop.")
                            })
                        }}  className="w-3/4 mt-2 flex w-full cursor-pointer justify-center rounded bg-sky-800 p-3 font-medium text-gray hover:bg-opacity-90">Save SSL/TLS Layer</button>
                    </div>
                </div>
            </div>

        </div>
    </>)
}

export default Layer_SSL