import { useState, forwardRef } from "react";

export const InputElement = forwardRef<
  HTMLInputElement,
  { className?: string }
>(function InputElement({ className }, ref) {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <input
        className={className}
        ref={ref}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
});
