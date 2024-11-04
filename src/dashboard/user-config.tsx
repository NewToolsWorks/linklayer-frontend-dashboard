import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Upload, RefreshCw, Home, Menu } from "lucide-react"
import AlertMessage from '@/views/AlertMessage'
import axios from 'axios'
import { getCSRFToken } from '@/utils/utils'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export default function UserConfig() {
  const [uploadEnabled, setUploadEnabled] = useState(false)
  const [urlAnonnounce,seturlAnonnounce] = useState("")
  const [urlVideo,seturlVideo] = useState("")
  const [isUploading,setisUploading] = useState(false)
  const [files, setFiles] = useState([])
  const inputFileRef = React.useRef();
  let getCfg = ()=>{
    axios.get("/api/cfg?"+getCSRFToken()).then((response)=>{
        let resp = response.data
        let files = resp.files.map((x,index)=> ({id:index,name:x}))
        setFiles(files)
        setUploadEnabled(resp.enabled)
        seturlAnonnounce(resp.announce)
        seturlVideo(resp.video)
    })
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    let form = new FormData()
    form.append("cfg",file)
    axios.post("/api/cfg/upload?"+getCSRFToken(),form).then((resp)=>{
        getCfg()
        event.target.value = null
    })
  }

  const handleVideUpload = (event)=>{
    const video = event.target.files[0]
    let form = new FormData()
    form.append("video",video)
    setisUploading(true)
    axios.post("/api/cfg/video?"+getCSRFToken(),form).then((resp)=>{
      setisUploading(false)
      getCfg()
      location.reload()
    })
  }

  const deletvideo = ()=>{
    if (confirm("are your sure delete video")){
      axios.get("/api/cfg/delete/video?"+getCSRFToken()).then((response)=>{
        getCfg()
      })
    }
   
  }

  const handleFileDelete = (id) => {
    let del_file = files.filter((x)=>x.id == id)
   
    let request = {"filename":del_file[0].name}

    axios.post("/api/cfg/delete?"+getCSRFToken(),request).then((response)=>{
      setFiles(files.filter(file => file.id !== id))
    })
   
  }

  


 
  useEffect(()=>{
    getCfg()
  },[])

  return (
      <>
    <header className="bg-white shadow-md sticky">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          
          <h1 className="text-xl font-semibold text-[#0077be]">Users Configs</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-[#0077be] hover:bg-[#e6f3ff]">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => location.href = "/dashboard"}>
               Dashboard
            </DropdownMenuItem>
           
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>

    <div className='bg-[#f0f7ff] h-screen'>
      <div className='p-3'>
      <p className='p-2' >Manage settings, upload .lnk files, the main URL will be generated so you can share this with users and be able to synchronize, and as a plus, you can add a video tutorial if necessary by uploading it, it is suggested that it be .mp4</p>
      </div>
    <div className="flex flex-col md:flex-row gap-8 p-8">
      <Card className="flex-1 border-[#0077be] shadow-lg">
        <CardContent className="p-6">
          <div className="aspect-video bg-[#e6f3ff] mb-4 rounded-lg">
            { urlVideo == "" && <div className="w-full h-full flex items-center justify-center text-[#0077be]">
              Video Player
            </div>
            }

            {urlVideo != "" && 
            <div>
            

            <video className='w-full h-full' controls>
          <source src={urlVideo} type="video/mp4"></source>

         
            </video>

            </div>

            }

            { isUploading &&
              <p>uploading wait ...</p>
            } 
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <Input onChange={handleVideUpload} accept='.mp4' ref={inputFileRef} className='hidden' type='file'></Input>
            <Button onClick={()=>{
              inputFileRef.current.click()
            }} className="bg-[#0077be] text-white hover:bg-[#005c8f] w-full sm:w-auto">
              <Upload className="mr-2 h-4 w-4" /> Upload Video
            </Button>
            <Button onClick={deletvideo} variant="outline" className="text-[#0077be] border-[#0077be] hover:bg-[#e6f3ff] w-full sm:w-auto">
              <Trash2 className="mr-2 h-4 w-4" /> Delete Video
            </Button>
      
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 border-[#0077be] shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#0077be]">File configs uploaded</h2>
            <div className="flex items-center space-x-2">
              <Switch
                id="upload-mode"
                checked={uploadEnabled}
                onClick={()=>{
                  axios.post("/api/cfg/setEnabled/"+(!uploadEnabled?"1":"0")+"?"+getCSRFToken(),{}).then((resp)=>{
                      getCfg()
                  })
                }}
              />
              <label htmlFor="upload-mode" className="text-[#0077be]">Enable upload</label>
            </div>
          </div>
          <Input
            type="file"
            accept='.lnk'
            onChange={handleFileUpload}
            disabled={!uploadEnabled}
            className="mb-4 border-[#0077be] text-[#0077be]"
          />

          { uploadEnabled  && <div className='p-2 bg-[#e6f3ff] rounded-lg mb-2'>
                <p>Copy and paste the repo URL in linklayer: {urlAnonnounce} </p>
          </div>
          }
          <ul className="space-y-2">
            {files.map(file => (
              <li key={file.id} className="flex justify-between items-center p-2 bg-[#e6f3ff] rounded-lg">
                <span className="text-[#0077be]">{file.name}</span>
                <Button variant="ghost" size="sm" onClick={() => handleFileDelete(file.id)} className="text-[#0077be] hover:bg-[#c9e3f8]">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>

    </div>

    </>
  )
}