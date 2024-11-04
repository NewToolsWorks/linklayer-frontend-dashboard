import { Component, ReactNode, lazy, useEffect, useState } from "react";
import linkLogo from "../assets/linklayerLogo.webp"
import "./styles/dashboard.css"
import "./../assets/tunnel.svg"
import { Navigate, Params, useNavigate, useParams } from "react-router-dom";
import React from "react";

import SwitcherFour from "../components2/Switchers/SwitcherFour";
import axios from "axios";
import { getCSRFToken } from "../utils/utils";

interface layers_prop {
    Name: string,
    path: string
    sec: sections,

}
enum sections {
    AUTH, USERS, LAYER_SSL, LAYER_HTTP, LAYER_HTTPTLS, LAYER_WEBSOCKET, LAYER_DNSTT, LAYER_UDPHYREQUEST, LAYER_HTTPDUAL, LINK_LOGS, ABOUT
}




interface Actual_params {
    section: sections,
    View: string

}


const ImportSectionView = (sectionView: string) => {
    return lazy(async () => {

        try {
            await import("./sections/" + sectionView)
        } catch (err: any) {

            location.href = "/dashboard/auth"
            return import("./sections/auth")
        }
        return import("./sections/" + sectionView)


    })
}

const Dashboard = () => {
    let humanSections: { [section: string]: sections; } = {};
 
    let linklayer_Status = {"OFF":"off","STARTING":"starting","ON":"on"}
    let toolbarNames = ["Authentication settings", "Manage users", "SSL/TLS layer settings",
        "HTTP layer settings", "HTTP/TLS Layer settings", "WebSocket layer settings",
        "DNSTT layer settings", "UDP Hyrequest layer settings", "HTTP Dual layer settings", "Service Logs", "About LinkLayer VPN"
    ]
    humanSections["auth"] = sections.AUTH;
    humanSections["users"] = sections.USERS;
    humanSections["layer_ssl"] = sections.LAYER_SSL;
    humanSections["layer_http"] = sections.LAYER_HTTP;
    humanSections["layer_httptls"] = sections.LAYER_HTTPTLS;
    humanSections["layer_websocket"] = sections.LAYER_WEBSOCKET;
    humanSections["layer_dnstt"] = sections.LAYER_DNSTT;
    humanSections["layer_udphyrequest"] = sections.LAYER_UDPHYREQUEST;
    humanSections["layer_httpdual"] = sections.LAYER_HTTPDUAL;
    humanSections["linklayer_logs"] = sections.LINK_LOGS
    humanSections["about"] = sections.ABOUT;

    let section = useParams()
    let navigate = useNavigate()
    let [openSidebar, setopenSidebar] = useState(false)

    let argSection: string = Object.keys(section).length == 0 ? "auth" : section.section
    let [actual, setActual] = useState<Actual_params>({
        section: humanSections[argSection],
        View: argSection
    })


    let [ImportVIew, SetImportView] = useState<any>()

    let [stateService, SetstateService] = useState<string>("off")

    let refreshService = ()=>{
        axios.get("/api/get_status_service?"+getCSRFToken()).then((response)=>{
            let statusCode = response.data.status
            SetstateService(statusCode)
           
        })
    }

    useEffect(()=>{
        refreshService()
    },[])

    let layersSubsections: layers_prop[] = [
        {
            Name: "Layer SSL/TLS",
            path: "layer_ssl",
            sec: sections.LAYER_SSL
        },
        {
            Name: "Layer HTTP",
            path: "layer_http",
            sec: sections.LAYER_HTTP
        },
        {
            Name: "Layer HTTP/TLS Mix",
            path: "layer_httptls",
            sec: sections.LAYER_HTTPTLS
        },
        {
            Name: "Layer WebSocket",
            path: "layer_websocket",
            sec: sections.LAYER_WEBSOCKET
        },
        {
            Name: "Layer DNSTT",
            path: "layer_dnstt",
            sec: sections.LAYER_DNSTT
        },
        {
            Name: "Layer UDP HyRequest",
            path: "layer_udphyrequest",
            sec: sections.LAYER_UDPHYREQUEST
        },
        {
            Name: "Layer HTTP Dual",
            path: "layer_httpdual",
            sec: sections.LAYER_HTTPDUAL
        },
        {
            Name: "Logs",
            path: "linklayer_logs",
            sec: sections.LINK_LOGS
        },
        {
            Name: "About",
            path: "about",
            sec: sections.ABOUT
        }
    ];

    let loadSection = (s: sections, path: string) => {

        navigate("/dashboard/" + path, { relative: "path" })
        setActual({
            section: s,
            View: path
        })
    }


    useEffect(() => {
        async function loadView() {

            let ViewContent = await ImportSectionView(actual.View)
            SetImportView(<ViewContent />)
        }
        loadView()
    }, [actual])

    return (

        <>

            <div className="h-screen w-full">
                {/*left sidebar panel*/}
                <aside className={"transition-all duration-500	ease-out float-left bg-sky-950 z-999 h-screen p-5  flex flex-col absolute -left-[500px] md:static md:-left-[0px] " + (openSidebar && "left-[0px]")}>
                    {/* sticky header sidebar logo*/}
                    <div className="sticky font-mono flex items-center">

                        <img className="w-15" src={linkLogo}></img>
                        <h2 className="text-white ml-5 text-xl font-semibold">LinkLayer VPN Dashboard</h2>
                        <svg onClick={() => setopenSidebar(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="md:hidden ml-3 stroke-2 stroke-white size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>


                    </div>

                    {/* Items content siderbar */}
                    <div className="flex flex-col overflow-y-auto h-screen no-scrollbar" >

                        <div>
                            <h3 className=" font-medium text-bodydark2 m-5">General settings</h3>
                            <ul>
                                <li key={sections.AUTH} onClick={() => loadSection(sections.AUTH, "auth")} className={"text-white p-2 cursor-pointer mb-2 transition duration-300 ease-in-out hover:bg-slate-300/20 " + (actual.section == sections.AUTH ? "bg-slate-300/20" : "")}>
                                    <a className="flex">

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                            <path d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg>

                                        Authentication
                                    </a>
                                </li>
                                <li key={sections.USERS} onClick={() => loadSection(sections.USERS, "users")} className={"text-white p-2 cursor-pointer mb-2 transition duration-300 ease-in-out hover:bg-slate-300/20 " + (actual.section == sections.USERS ? "bg-slate-300/20" : "")}>
                                    <a className="flex">

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                            <path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                        </svg>



                                        Users
                                    </a>
                                </li>

                                <li className={"text-white p-2 cursor-pointer mb-2 transition duration-300 ease-in-out hover:bg-slate-300/20 "}>
                                    <a href="/user-config" className="flex">

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>




                                         Client configurations
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className=" font-medium text-bodydark2 m-5">Layers (Protocols)</h3>
                            <ul>

                                {
                                    layersSubsections.map(layer => (
                                        <li key={layer.sec} onClick={() => loadSection(layer.sec, layer.path)} className={"text-white p-2 cursor-pointer mb-2 transition duration-300 ease-in-out hover:bg-slate-300/20 " + (actual.section == layer.sec ? "bg-slate-300/20" : "")} >
                                            <a className="flex">

                                                {layer.sec != sections.ABOUT &&
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                                        <path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                                    </svg>


                                                }

                                                {
                                                    layer.sec == sections.ABOUT &&
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                                        <path d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                                    </svg>

                                                }





                                                {layer.Name}
                                            </a>
                                        </li>
                                    ))
                                }

                            </ul>
                        </div>



                    </div>
                </aside>


                {/*right side with content and header*/}
                <div className="w-full h-full righ-back" >
                    <header className="flex items-center justify-between p-4 shadow-2 bg-white">
                        <div onClick={() => setopenSidebar(true)} className="flex flex-row items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2 md:hidden">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                            <h1 className="text-sky-700 text-xl md:text-3xl ">{toolbarNames[actual.section]}</h1>
                        </div>

                        <div className="flex items-center">
                            <div className="flex items-center flex-col">
                                <h1 className="text-xs md:text-lg">Service Status:  {stateService} </h1>
                                <SwitcherFour onclick={()=>{
                                       if (stateService == linklayer_Status.OFF){
                                        SetstateService(linklayer_Status.STARTING)
                                         axios.get("/api/start_service?"+getCSRFToken()).then((response)=>{
                                            if (response.data){
                                                let message = response.data.message
                                                let code = response.data.code
                                                alert(message)
                                                if (code == 1){
                                                    SetstateService(linklayer_Status.ON)

                                                }else{
                                                    SetstateService(linklayer_Status.OFF)
                                                }
                                            }
                                         })                                        
                                       }else if (stateService == linklayer_Status.ON){
                                            axios.get("/api/stop_service?"+getCSRFToken()).then((response)=>{
                                                    SetstateService(linklayer_Status.OFF)
                                            })
                                       }

                                }} enabled={(stateService == linklayer_Status.STARTING || stateService == linklayer_Status.ON)} onChange={(v)=>{
                                   
                                }}></SwitcherFour>
                            </div>
                            <div className="ml-4">
                                <a className="flex" href={"/api/logout?"+getCSRFToken()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                    </svg>

                                    Logout</a>
                            </div>
                        </div>
                    </header>

                    <React.Suspense >
                        {ImportVIew}
                    </React.Suspense>
                </div>
            </div>

        </>
    )

}

export default Dashboard