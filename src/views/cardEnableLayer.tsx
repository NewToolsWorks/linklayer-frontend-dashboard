import CheckboxTwo from "../components2/Checkboxes/CheckboxTwo"
export interface ICELayer{
    enabled:boolean,
    onChange:(value:boolean) => void
}
const CardEnableLayer = (props:ICELayer)=>{
    return(<>
    
    <div className="flex flex-row justify-center mt-5">
            <div className="flex items-center w-3/5 p-4 shadow-2 bg-white  with-overflow-vh md:w-3/5 w-4/5" >
            
            <CheckboxTwo label="Enable layer" isChecked={props.enabled} onChange={(value)=>{
                
                    props.onChange(value)
            }}></CheckboxTwo>
            </div>
                    
            </div>
    </>)
}

export default CardEnableLayer