import axios from "axios"
import TableOne from "../../components2/Tables/TableOne"
import { getCSRFToken } from "../../utils/utils"
import { useEffect, useState } from "react"



const linklayer_logs = () => {

    let [logs,setLogs] = useState<string[]>([])
    let refreshLogs = ()=>{
        axios.get("/api/logs?"+getCSRFToken()).then((response)=>{
            setLogs(response.data)
        })
    }

    useEffect(()=>{
            refreshLogs()
    },[])

    return (<>
        <div className="w-full">

            <div className="flex flex-row justify-center mt-5">
                <div className="flex flex-col w-3/5 p-4 shadow-2 bg-white  md:w-3/5 w-4/5 with-overflow-vh" >

                    <TableOne Logs={logs}></TableOne>
                </div>
            </div>
        </div>
    </>)
}

export default linklayer_logs