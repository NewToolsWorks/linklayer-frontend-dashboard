import { useEffect, useState } from "react"
import SelectGroupTwo, { NetworkInterface } from "../../components2/Forms/SelectGroup/SelectGroupTwo"
import { getBaseDirectory, getCSRFToken } from "../../utils/utils";
import axios from "axios";
import CardEnableLayer from "../../views/cardEnableLayer";


interface UDP {
    listen: string;
    exclude: string;
    net: string;
    cert: string;
    key: string;
    obfs: string;
    max_conn_client: number;
}
interface UDPHyRequestParams {
    enabled: boolean,
    u: UDP
}

const Layer_UDPHyrequest = () => {
    let [ludpParams, setludpParams] = useState<UDPHyRequestParams>({
        enabled: false, u: {
            listen: ":36718", exclude: "", net: "", cert: getBaseDirectory() + "/layers/cfgs/my.crt",
            key: getBaseDirectory() + "binary/layers/cfgs/my.key", obfs: "", max_conn_client: 500000  //some features as harcoded, maybe can change later
        }
    })
    let [selOp, setSelOp] = useState(0)
    let [IfaceNetworks, setIfaceNetworks] = useState<NetworkInterface[]>([{ NetName: "", Ip: "" }]) //get interfaces from server

    let notify = () => {
        setIfaceNetworks([...IfaceNetworks])
        setludpParams({ ...ludpParams })
    }

    let refreshUDP = () => {
        axios.get("/api/read/udp?" + getCSRFToken()).then((response) => {
            IfaceNetworks = response.data.extra.networks


            if (response.data.service.length > 0) {
                ludpParams.u = response.data.service[0]
                ludpParams.enabled = true
                let networks = IfaceNetworks


                networks.forEach((element, index, arr) => {
                    if (element.NetName == ludpParams.u.net) {
                        setSelOp(index)
                    }

                })


            } else {
                ludpParams.enabled = false
                ludpParams.u = {
                    listen: ":36718", exclude: "", net: "", cert: getBaseDirectory() + "/layers/cfgs/my.crt",
                    key: getBaseDirectory() + "binary/layers/cfgs/my.key", obfs: "", max_conn_client: 500000
                }
                setSelOp(0)

            }

            notify()

        }).catch((err) => {

        })
    }

    useEffect(() => {
        refreshUDP()
    }, [])

    return (<>
        <div className="w-full">

            <CardEnableLayer enabled={ludpParams.enabled} onChange={(value) => {
                ludpParams.enabled = value
                notify()
            }} ></CardEnableLayer>

            <div className="flex flex-row justify-center mt-5">
                <div className="flex flex-col w-3/5 p-4 shadow-2 bg-white  md:w-3/5 w-4/5" >
                    <h4 className="mb-1 mt-2 font-bold font-sans  text-black dark:text-white">
                        Configure UDPHyRequest
                    </h4>
                    <p className="text-xs text-gray-200 mb-2">
                        ports can be excluded from iptables separated by comma: mandatory 53,5300
                    </p>

                    <input placeholder="53,5300" value={ludpParams.u.exclude} onChange={(e) => {
                        ludpParams.u.exclude = e.target.value
                        notify()
                    }} type="text" className=" rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                    <p className="text-xs text-gray-200 mb-2 mt-2 ">
                        Chose your network interface  to internet
                    </p>

                    <SelectGroupTwo selOption={selOp} NetworkList={IfaceNetworks} CallSelected={(selectIface: number) => {
                        ludpParams.u.net = IfaceNetworks[selectIface].NetName
                        notify()
                        setSelOp(selectIface)
                    }} />

                    <p className="text-xs text-gray-200 mb-2 mt-2 ">
                        The obfuscated password
                    </p>
                    <input placeholder="Key OBFS" value={ludpParams.u.obfs} onChange={(e) => {
                        ludpParams.u.obfs = e.target.value
                        notify()
                    }} type="text" className=" rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />

                    <div className="w-full flex flex-row justify-center">
                        <button onClick={
                            () => {
                                if ((ludpParams.u.exclude != "") && !ludpParams.enabled) {
                                    if (!confirm("are you sure you want to disable this layer?")) {
                                        return
                                    }
                                }
                                axios.post("/api/layer/udp?" + getCSRFToken(), ludpParams).then((response) => {
                                    let message = ludpParams.enabled ? "UDP  layer updated" : "UDP Mix layer disabled and deleted parameters"
                                    alert(message)
                                    refreshUDP()
                                })
                            }
                        } className="w-3/4 mt-2 flex w-full cursor-pointer justify-center rounded bg-sky-800 p-3 font-medium text-gray hover:bg-opacity-90">Save UDPHyRequest Layer</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Layer_UDPHyrequest