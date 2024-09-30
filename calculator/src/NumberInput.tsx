import { useState, forwardRef } from "react";

export const NumberInput = forwardRef<HTMLInputElement,React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
    const [value, setValue] = useState<string>('0');
    return (
        <><div> { value} </div>
          <input 
            {...props}
            ref={ref}
            value={value}
            onChange={(e)=>setValue((e.target.value))}
            className={props.className}
            />
        </>
      );
})
