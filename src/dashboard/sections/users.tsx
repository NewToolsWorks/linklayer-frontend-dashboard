import { useEffect, useState } from "react";
import CheckboxOne from "../../components2/Checkboxes/CheckboxOne";
import axios from "axios";
import { getCSRFToken } from "../../utils/utils";


interface IUsers {
    id: number,
    username: string,
    password: string,
    expdisable: boolean,
    expire: string
}

interface UserCreate {
    username: string,
    password: string,
    expdisable: boolean,
    expire: string
}

interface customInputArgs{
    isDisabled:boolean,
    label:string,
    placeholder:string,
    val:string,
    type:string,
    callbackChange:(e:any)=>void 
}

function getNow(){
    let date = new Date()
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

const CustomInput = (props: customInputArgs) => {

    return (<>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            {props.label}
        </label>
        <input value={props.val} onChange={props.callbackChange} disabled={props.isDisabled} type={props.type} placeholder={props.placeholder} className="rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></input>

    </>)
}

const Users = () => {

    let [visibleCreate, setVisibleCreate] = useState<boolean>(false)
    let [visibleUsers, setVisibleUsers] = useState<boolean>(false)

   
    let [userCreateParam, setUserCreateParam] = useState<UserCreate>({ username: "", password: "", expdisable: false, expire: getNow() })


    //fetch users
    let [userList, setUserList] = useState<IUsers[]>(
        [
        ]
    )


    let notifyUserlist = ()=>{
        setUserList([...userList])
    }

    let getAllUsers = ()=>{
        axios.post("/api/read/user?"+getCSRFToken(),{}).then((response)=>{
            userList = response.data
            notifyUserlist()
        })
    }

    useEffect(()=>{
            //send empty struct 
            getAllUsers()
    },[])



    
  
    let updateUserCreate = (updatedUser: UserCreate) => {
        setUserCreateParam({ ...updatedUser })
    }
    return (
        <>
         <div className=" with-overflow-vh">
            <div className="flex flex-col">
                <div className="flex p-4 shadow-2 bg-white mr-2 mt-2  ml-2 justify-between items-center">
                    <h1>Create users</h1>

                    <div onClick={() => {
                        setVisibleUsers(false)
                        setVisibleCreate(!visibleCreate)
                    }} className="bg-indigo-100 p-2 rounded-md cursor-pointer">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={" transition size-6 " + (visibleCreate ? "rotate-180" : "rotate-0")}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>

                    </div>
                </div>
                <div className={"ml-2 mr-2 shadow-2 bg-white transition-all flex flex-row gap-8 lg:gap-0 flex-wrap  justify-between items-center p-3 " + (visibleCreate ? "block" : "hidden")}>
                    <div>
                        <CustomInput val={userCreateParam.username} callbackChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                userCreateParam.username = e.target.value;
                                updateUserCreate(userCreateParam);
                            } } type="text" label="Username" placeholder="your username" isDisabled={false}></CustomInput>
                    </div>
                    <div>
                        <CustomInput val={userCreateParam.password} callbackChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                userCreateParam.password = e.target.value;
                                updateUserCreate(userCreateParam);
                            } } type="text" label="Password" placeholder="your password" isDisabled={false}></CustomInput>
                    </div>

                    <div>
                        <CheckboxOne isChecked={userCreateParam.expdisable} Onchange={() => { 
                            userCreateParam.expdisable = !userCreateParam.expdisable
                            updateUserCreate(userCreateParam)
                         }} Caption={"Disable expire"} />

                    </div>

                    <div>
                        <CustomInput val={userCreateParam.expire} callbackChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                         
                            userCreateParam.expire = e.target.value
                
                            updateUserCreate(userCreateParam)
                        }}  isDisabled={userCreateParam.expdisable} type="date" label="expiration" placeholder="" ></CustomInput>
                    </div>

                    <div>
                        <button onClick={() => {
                           axios.post("/api/create/user?"+getCSRFToken(),userCreateParam).then((response)=>{
                                    alert("User created successfully")
                            
                                    userCreateParam.username = ""
                                    userCreateParam.password = ""
                                    updateUserCreate(userCreateParam)
                                    getAllUsers()
                           }).catch((err)=>{
                                if (err.response.data){
                                    alert(err.response.data.detail)
                                    return
                                }
                                alert(err.message)
                           })
                        }} className="flex cursor-pointer justify-center rounded bg-sky-800 p-3 font-medium text-gray hover:bg-opacity-90">
                            Create user
                        </button>
                    </div>

                </div>

            </div>

            <div className="flex flex-col">
                <div className="flex p-4 shadow-2 bg-white mr-2 mt-2  ml-2 justify-between items-center ">
                    <h1>Manage registered users</h1>

                    <div onClick={() => {
                        setVisibleCreate(false)
                        setVisibleUsers(!visibleUsers)
                    }} className="bg-indigo-100 p-2 rounded-md cursor-pointer">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={" transition size-6 " + (visibleUsers ? "rotate-180" : "rotate-0")}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>

                    </div>
                </div>
                <div className={"ml-2 mr-2 shadow-2 bg-white transition " + (visibleUsers ? "block" : "hidden")}>

                    {
                        userList.map((u: IUsers) => {
                            return (<>
                                <div className="flex flex-row gap-8 lg:gap-0 flex-wrap  justify-between items-center p-3 ">
                                    <div>
                                        <CustomInput val={u.username} callbackChange={(e) => {
                                            u.username = e.target.value;
                                            notifyUserlist();

                                        } } type="text" label="Username" placeholder="your username" isDisabled={false}></CustomInput>
                                    </div>
                                    <div>
                                        <CustomInput val={u.password} callbackChange={(e) => {
                                            u.password = e.target.value;
                                            notifyUserlist();
                                        } } type="text" label="Password" placeholder="your password" isDisabled={false}></CustomInput>
                                    </div>

                                    <div>
                                        <CheckboxOne Caption={"Disable expire"} isChecked={u.expdisable} Onchange={function (value: boolean): void {
                                            u.expdisable = value
                                            notifyUserlist()
                                        }} />

                                    </div>

                                    <div>
                                        <CustomInput val={u.expire} callbackChange={(e) => {
                                            u.expire = e.target.value;
                                            notifyUserlist();
                                        } } type="date" label="expiration" placeholder="" isDisabled={false} ></CustomInput>
                                    </div>

                                    <div onClick={() => {
                                        
                                    }} className="flex flex-row gap-3">
                                        <button onClick={()=>{
                                            axios.post("/api/modify/user?"+getCSRFToken(),u).then((response)=>{
                                                alert("User "+u.username+" Updated")
                                                getAllUsers()
                                            }).catch((err)=>{
                                                alert("Error update "+u.username)
                                            })
                                        }} className="flex cursor-pointer justify-center rounded bg-green-600 p-3 font-medium text-gray hover:bg-opacity-90">
                                            Update user
                                        </button>

                                        <button  onClick={()=>{
                                            if (!confirm("Are your sure delete "+u.username)){
                                                return
                                            }
                                            axios.post("/api/delete/user?"+getCSRFToken(),{"id":u.id}).then((response)=>{
                                                alert("User "+u.username+" Deleted")
                                                getAllUsers()
                                            }).catch((err)=>{
                                                alert("Error delete "+u.username)
                                            })
                                        }} className="flex cursor-pointer justify-center rounded bg-rose-800 p-3 font-medium text-gray hover:bg-opacity-90">
                                            Delete user
                                            
                                        </button>
                                    </div>
                                </div>
                            </>)
                        })
                    }



                </div>

            </div>
            </div>
        </>
    )
}

export default Users;