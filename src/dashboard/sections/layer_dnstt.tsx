import { useEffect, useState } from "react"
import SelectGroupTwo, { NetworkInterface } from "../../components2/Forms/SelectGroup/SelectGroupTwo"
import { getCSRFToken } from "../../utils/utils"
import axios from "axios"
import CardEnableLayer from "../../views/cardEnableLayer"
import Alerts from "../../pages/UiElements/Alerts"
import Breadcrumb from "../../components2/Breadcrumbs/Breadcrumb"
import AlertMessage from "../../views/AlertMessage"


interface DNSTT {
    Domain: string,
    Net: string
}

interface LayerDNSTTParams {
    enabled: boolean,
    d: DNSTT
}

interface network {
    Ip: string,
    NetName: string,
}

interface extraIfaceNetwork {
    public: string,
    networks: network[]
}




const Layer_DNSTT = () => {
    let [ldnsttparam, Setldnsttparam] = useState<LayerDNSTTParams>({ enabled: false, d: { Domain: "", Net: "" } })
    let [IfaceNetworks, setIfaceNetworks] = useState<extraIfaceNetwork>({ public: "", networks: [{ Ip: "", NetName: "" }] })
    let [selOption,setSelOption] = useState<number>(0)
    let notify = () => {
        Setldnsttparam({ ...ldnsttparam })
        setIfaceNetworks({ ...IfaceNetworks })

    }

    let refreshDNSTT = () => {
        axios.get("/api/read/dnstt?" + getCSRFToken()).then((response) => {
            IfaceNetworks = response.data.extra

            if (response.data.service.length > 0){
                ldnsttparam.d = response.data.service[0]
                ldnsttparam.enabled = true
                let networks = response.data.extra.networks
               
             
                networks.forEach((element,index,arr)=>{
                    if (element.NetName == ldnsttparam.d.Net){
                        setSelOption(index)
                    }
                  
                })
                
               
            }else{
                ldnsttparam.enabled = false
                ldnsttparam.d = { Domain: "", Net: "" }
                setSelOption(0)
                
            }

            notify()
        
        }).catch((err) => {

        })
    }

    useEffect(() => {
        refreshDNSTT()
    }, [])

    return (<>
        <div className="w-full">

            <CardEnableLayer enabled={ldnsttparam.enabled} onChange={(value) => {
                ldnsttparam.enabled = value
                notify()
            }}></CardEnableLayer>

           

            <div className="flex flex-row justify-center mt-5">
                <div className="flex flex-col w-3/5 p-4 shadow-2 bg-white  md:w-3/5 w-4/5" >
                    <h4 className="mb-1 mt-2 font-bold font-sans  text-black dark:text-white">
                        Configure DNSTT
                    </h4>

                    

                    <p className="text-xs text-gray-200 mb-2">
                        Parameters needed to create a DNSTT connection
                    </p>


                    <AlertMessage Title="Your public Key 👇 👇 👇" Content={IfaceNetworks.public}></AlertMessage>

                    <div className="flex flex-col">

                        <div className="w-full flex flex-row justify-between items-center">
                            <p className="text-xs text-gray-200 mb-2 ">Domain required example: ns.linklayer.com</p>
                        </div>

                        <input value={ldnsttparam.d.Domain} onChange={(e) => {
                            ldnsttparam.d.Domain = e.target.value
                            notify()
                        }} type="text" className=" rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />

                        <p className="text-xs text-gray-200 mb-2 mt-2 ">Choose the network interface remember:  if you use more than 1, check which one has access to the Internet.</p>
                        <SelectGroupTwo selOption={selOption} NetworkList={IfaceNetworks.networks} CallSelected={(selectIface: number) => {
                            ldnsttparam.d.Net = IfaceNetworks.networks[selectIface].NetName
                            setSelOption(selectIface)
                            notify()
                        }} />

                    </div>





                    <div className="w-full flex flex-row justify-center">
                        <button onClick={
                          ()=>{
                            if ((ldnsttparam.d.Domain != "" ) && !ldnsttparam.enabled){
                                if (!confirm("are you sure you want to disable this layer?")){
                                    return
                                }
                            }
                            axios.post("/api/layer/dnstt?"+getCSRFToken(),ldnsttparam).then((response)=>{
                                let message = ldnsttparam.enabled ? "DNSTT  layer updated" : "DNSTT Mix layer disabled and deleted parameters"
                                alert(message)
                                refreshDNSTT()
                            }).catch((err)=>{
                                alert("service running, please stop.")
                            })
                        }
                        }  className="w-3/4 mt-2 flex w-full cursor-pointer justify-center rounded bg-sky-800 p-3 font-medium text-gray hover:bg-opacity-90">Save HTTP/TLS Layer</button>
                    </div>
                </div>
            </div>

        </div>
    </>)
}

export default Layer_DNSTT