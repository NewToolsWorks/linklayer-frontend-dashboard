import React, { ChangeEvent, ChangeEventHandler, createRef, useRef } from "react";
import { useState } from "react";
import { Component } from "react";
import axios  from "axios";
import CheckboxOne from "../components2/Checkboxes/CheckboxOne";
import linkLogo from "../assets/linklayerLogo.webp"
interface LoginProps{
  isRemember:boolean,
  username:string,
  password:string
}

const Login = ()=>{


      let [disabled,setDisabled] = useState<boolean>(false)
      let [login,setLogin] = useState<LoginProps>({username:"",password:"",isRemember:false})
      
      let notify = ()=>{
        setLogin({...login})
      }
   
        return(
            <>
                    <div className="flex h-screen bg-gradient-to-r from-sky-700 to-sky-900">
                    <div className="m-auto">
                
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="flex flex-col items-center">
              <img className="w-3/12 h-3/12 m-1" src={linkLogo}></img>
              <h3 className="font-medium text-black dark:text-white">
                Sign in  dashboard <label className="font-bold italic" >LinkLayer VPN</label>
              </h3>
              </div>
             
            </div>
            <form >
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Username
                  </label>
                  <input
                    value={login?.username}
                    onChange={(e)=>{
                      login.username = e.target.value
                      notify()
                    }}
                    type="text"
                    placeholder="Enter your username"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">
                    Password
                  </label>
                  <input
                    value={login?.password}
                    onChange={(e)=>{
                      login.password = e.target.value
                      notify()
                    }}
                    type="password"
                    placeholder="Enter password"
                    className="mb-5.5 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

              { /* <div className="mt-5 mb-5.5 flex items-center justify-between">
                  <label htmlFor="formCheckbox" className="flex cursor-pointer">
                  <CheckboxOne isChecked={login!!.isRemember} Onchange={(checked)=>{
                    login.isRemember = checked
                    notify()
                    }}  Caption={"Remember session"}  />
                  
                  </label>

              
                </div>*/
                }
                <button onClick={
                  (e)=>{
                    disabled = true
                    e.preventDefault();
                    axios.post("/api/login",login).then((response)=>{
                      localStorage.setItem("csrf",response.data.csrf)  
                      localStorage.setItem("directory",response.data.base)
                      location.href = "/dashboard"
                        
                    }).catch((err)=>{
                      setDisabled(false)
                      if (err.response.data.status){
                        alert(err.response.data.message)
                        return
                      }
                      alert(err.message)
                    })
                  }
                }  disabled={disabled} className="flex w-full cursor-pointer justify-center rounded bg-sky-800 p-3 font-medium text-gray hover:bg-opacity-90">
                  Sign In
                </button>
              </div>
            </form>
          </div>
                    </div>
                    </div>
            </>
        )
    
   
}

export default Login