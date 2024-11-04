import { useState } from 'react';
import generateUUID from '../../utils/utils';

interface TextCheckbox{
  Caption:String,
  isChecked:boolean,
  Onchange:(value:boolean) => void,
}



const CheckboxOne = (data:TextCheckbox) => {
  const [isChecked, setIsChecked] = useState<boolean>(data.isChecked);
  let simpleUUID = generateUUID()
  return (
    <div>
      <label
        htmlFor={simpleUUID}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={simpleUUID}
            className="sr-only"
            onChange={() => {
              data.Onchange(!isChecked);
              setIsChecked(!isChecked);
            }}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              isChecked && 'border-primary bg-gray dark:bg-transparent'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${isChecked && 'bg-primary'}`}
            ></span>
          </div>
        </div>
        
        {data.Caption}
      </label>
    </div>
  );
};

export default CheckboxOne;
