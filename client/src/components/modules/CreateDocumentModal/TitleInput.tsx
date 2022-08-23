import { InputHTMLAttributes, useEffect, useState } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement>{
  textValue: string;
  setValue: (value: string) => void;
}


export const TitleInput = ({ textValue, setValue, ...rest }: Props) => {
  const [ isFocused, setIsFocused ] = useState(false);

  useEffect(() => {
    setIsFocused(!!textValue);
  },[textValue])

  return (
    <div 
      className="rounded-md text-[white] relative w-full border-2 border-primary-300 border-solid" 
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(!!textValue)}
    >
      <label htmlFor="project_name_input" className={`absolute text ${ isFocused ? "text-[white] translate-y-[-50%] top-[0] left-3": "text-[#FFFFFF99] translate-y-[-50%] top-[50%] left-4" } pointer-events-none  bg-background px-1 transition-all`}>
        Nome do projeto
      </label>
      <input
        type="text"
        id="project_name_input"
        value={textValue}
        onChange={(e) => setValue(e.target.value)}
        className="py-3 px-4 bg-[transparent] w-full border-0 text-[white] text-[1rem]"
        {...rest}
      />
    </div>
  )
}