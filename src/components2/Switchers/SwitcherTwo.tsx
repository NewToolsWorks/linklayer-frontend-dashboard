import {  v4} from "uuid";
interface Props{

  enabled:boolean,
  onChange:(newValue:boolean) => void
}


const SwitcherTwo = (props:Props) => {
 
  let id = v4()
 
  return (<>
    <div >
      <label
       htmlFor={id}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            id={id}
            type="checkbox"
            className="sr-only"
            onChange={() => {
                props.onChange(!props.enabled)
            }}
          />
          <div className="h-5 w-14 rounded-full bg-meta-9 shadow-inner dark:bg-[#5A616B]"></div>
          <div
            className={`dot absolute left-0 -top-1 h-7 w-7 rounded-full bg-white shadow-switch-1 transition ${
              props.enabled && '!right-0 !translate-x-full !bg-primary dark:!bg-white'
            }`}
          ></div>
        </div>
      </label>
    </div>
    </>);
};

export default SwitcherTwo;
