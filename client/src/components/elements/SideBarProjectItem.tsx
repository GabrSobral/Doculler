import { ArrowRight } from "phosphor-react"
import { useState } from "react"

export const SideBarProjectItem = () => {
  const [ isCollapsed, setIsCollapsed ] = useState(false);

  return (
    <div 
      className={`px-4 py-2 cursor-pointer bg-background-odd ${!isCollapsed ? " border-[#00000025] ": " border-primary-300 "} border-2 rounded transition-colors`} 
      onClick={() => setIsCollapsed(state => !state)} 
    >
      <span className="text-[1rem] font-semibold hover:underline">
        Cheapy
      </span>

      {
        isCollapsed &&
        <ul className="mt-1">
          <li className="w-fit ml-3 flex items-center gap-2 cursor-pointer hover:underline" onClick={(event) => { event.stopPropagation() }}>
            <ArrowRight size={16}/>
            Client
          </li>
          <li className="w-fit ml-3 flex items-center gap-2 cursor-pointer hover:underline" onClick={(event) => { event.stopPropagation() }}>
            <ArrowRight size={16}/>
            Server
          </li>
        </ul>
      }
    </div>
  )
}