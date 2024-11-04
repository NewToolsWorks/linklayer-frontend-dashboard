import { useEffect, useState } from "react"
import SwitcherTwo from "../../components2/Switchers/SwitcherTwo"
import axios from "axios";
import { getBaseDirectory, getCSRFToken } from "../../utils/utils";
import CardEnableLayer from "../../views/cardEnableLayer";

interface HTTPDual {
    Key: string;
    Cert: string;
    Limit: string;
    PacketBuffer: number;
    IsTLS: boolean;
    Listen: string;
}


interface LayerHTTPDualParams{
    enabled:boolean,
    hd:HTTPDual[]
}

interface DualHTTPArguments {
    Desc: string,
    PlaceHolder: string,
    key: string
}

const Layer_HTTPDual = () => {

    let [lDualParam, SetDualParam] = useState<LayerHTTPDualParams>({enabled:false ,hd: [{ IsTLS: false, Limit: "", PacketBuffer: 500, Listen: "", Key:  getBaseDirectory()+"/cfg/key.pem", Cert: getBaseDirectory()+"/cfg/cert.pem" }]})

    let argumentsDualHTTP: DualHTTPArguments[] = [{
        Desc: "Limit:  Limit bytes read from Upload connection default 1MB, field in MegaBytes",
        PlaceHolder: "1MB",
        key: "Limit"
    }, {
        Desc: "PacketBuffer: Limit packets can queue in upload connections It is recommended to set a value equal to 500 Setting a lower value may affect navigation",
        PlaceHolder: "500",
        key: "PacketBuffer"
    }, {
        Desc: "Listen: The address/port where the connection will be handled is required.",
        PlaceHolder: "0.0.0.0:80",
        key: "Listen"
    }, {
        Desc: "Key: Private key path",
        PlaceHolder: "/root/cert.key",
        key: "Key"
    }, {
        Desc: "Cert: Public certificate path",
        PlaceHolder: "/root/cert.crt",
        key: "Cert"
    }]

    let notify = () => {
        SetDualParam({...lDualParam})
    }


    let refreshHTTPDual = () => {
        axios.get("/api/read/httpdual?" + getCSRFToken()).then((response) => {
            if (response.data.length > 0){
                lDualParam.enabled = true
                lDualParam.hd = response.data

            }else{
                lDualParam.enabled = false
                lDualParam.hd = [{ IsTLS: false, Limit: "", PacketBuffer: 500, Listen: "", Key:  getBaseDirectory()+"/cfg/key.pem", Cert:  getBaseDirectory()+"/cfg/cert.pem" }]
            }

            notify()

        }).catch((err) => {

        })
    }

    useEffect(()=>{
        refreshHTTPDual()
    },[])

    let addNewHTTPLayer = () =>{
        lDualParam.hd.push({
            IsTLS: false,
            Limit: "",
            PacketBuffer: 0,
            Listen: "",
            Key: "",
            Cert: ""
        })
        notify()
    }
  
    return (<>

        <div className="w-full">

            <CardEnableLayer enabled={lDualParam.enabled} onChange={(e)=>{
                lDualParam.enabled = e
                notify()
            }}>

            </CardEnableLayer>
            <div className="flex flex-row justify-center mt-5">
                <div className="flex flex-col w-3/5 p-4 shadow-2 bg-white  md:w-3/5 w-4/5 with-overflow-vh" >
                    <h4 className="mb-1 mt-2 font-bold font-sans  text-black dark:text-white">
                        Configure HTTP Dual
                    </h4>
                    <p className="text-xs text-gray-200 mb-2">
                        Parameters required to configure the HTTP Dual protocol
                    </p>





                    {
                    
                        lDualParam.hd.map((ldual, index) => {

                           
                            let isLast = index == lDualParam.hd.length - 1
             
                            return (<>
                                <div className="flex flex-col">
                                    <div className="flex flex-row justify-around bg-dual p-2 rounded-tl-lg rounded-br-lg items-center" >

                                        <p className="text-2xl font-semibold text-xs text-gray-200  ">
                                            Enable TLS 
                                        </p>

                                        <SwitcherTwo   enabled={ldual.IsTLS} onChange={(newValue: boolean) => {
                                            
                                            ldual.IsTLS = newValue
                                            notify()

                                        }}></SwitcherTwo>
                                    </div>

                                    {

                                        argumentsDualHTTP.map((param, index) => {

                                            return (<>
                                                <div className={"w-full " + (index > 2 && !ldual.IsTLS ? "hidden" : "")}>
                                                    <div className="w-full flex flex-row justify-between items-center">
                                                        <p className={"text-xs text-gray-200 mb-2 " + (index == 0 ? "" : "mt-2")}>{param.Desc}</p>


                                                    </div>

                                                    <input value={ldual[param.key]} onChange={(event) => {
                                                        ldual[param.key] = event.target.value
                                                        notify()
                                                    }} placeholder={param.PlaceHolder} type="text" className=" w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />

                                                </div>

                                            </>)
                                        })
                                    }



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
                            () => {
                                if ((lDualParam.hd[0].Listen != "" || lDualParam.hd.length > 1) && !lDualParam.enabled) {
                                    if (!confirm("are you sure you want to disable this layer?")) {
                                        return
                                    }
                                }
                                axios.post("/api/layer/httpdual?" + getCSRFToken(), lDualParam).then((response) => {
                                    let message = lDualParam.enabled ? "HTTP DUAL  layer updated" : "HTTP DUALs Mix layer disabled and deleted parameters"
                                    alert(message)
                                    refreshHTTPDual()
                                })
                            }
                        } className="w-3/4 mt-2 flex w-full cursor-pointer justify-center rounded bg-sky-800 p-3 font-medium text-gray hover:bg-opacity-90">Save HTTP Dual Layer</button>
                    </div>
                </div>
            </div>

        </div>

    </>)
}

export default Layer_HTTPDual