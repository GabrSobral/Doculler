import { InputHTMLAttributes, TextareaHTMLAttributes, useEffect, useState } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  textValue: string;
  setValue: (value: string) => void;
}

export const DescriptionInput = ({ textValue, setValue, ...rest } : Props) => {
  const [ isFocused, setIsFocused ] = useState(false);

  useEffect(() => {
    setIsFocused(!!textValue);
  },[textValue])

  return(
    <div 
      className="rounded-md text-[white] relative w-full border-2 border-primary-300 border-solid"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(!!textValue)}
    >
      <label htmlFor="description_textarea" className={`absolute text ${ isFocused ? "text-[white] translate-y-[-50%] top-[0] left-3": "text-[#FFFFFF99] translate-y-[-50%] top-[50%] left-4" } pointer-events-none  bg-background px-1 transition-all`}>
        Descrição
      </label>
      <textarea 
        name="Description"
        id="description_textarea"
        onChange={(e) => setValue(e.target.value)}
        value={textValue}
        className="py-3 px-4 bg-[transparent] w-full border-0 resize-none text-[white] text-[1rem] h-full"
        {...rest}
      >

      </textarea>
    </div>
  )
} 