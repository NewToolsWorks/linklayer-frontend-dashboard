

interface ISwitch{
  enabled:boolean,
  onclick:()=>void
}

const SwitcherFour = (props:ISwitch) => {
  

  return (
    <div>
      <label
        htmlFor="toggle4"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            onClick={()=>{
              props.onclick()
            }}
            type="checkbox"
            id="toggle4"
            className="sr-only"
            onChange={() => {
           

            }}
          />
          <div className="block h-8 w-14 rounded-full bg-black"></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              props.enabled && '!right-1 !translate-x-full'
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default SwitcherFour;
