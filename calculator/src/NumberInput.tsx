import { useState, forwardRef } from "react";

export const NumberInput = forwardRef<HTMLInputElement>((props, ref) => {
    const [value, setValue] = useState<string>('');
    return (
        <>
          <input 
            {...props}
            ref={ref}
            value={value}
            onChange={(e)=>setValue((e.target.value))}/>
            <div>{value}</div>
        </>
      );
})
