import Image from "next/image";
import Link from "next/link";
import { User } from "phosphor-react";

interface Props {
  item: {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    tags: { 
      id: number;
      name: string;
      color: string;
    }[]
  }
}

export const ProjectItem = ({ item } : Props) => {
  return (
    <Link href={`/project`}>
      <li className="w-full bg-background shadow-md rounded  p-4 list-none flex flex-col gap-2 group hover:bg-primary-300 transition-colors cursor-pointer">
        <h3 className="group text-2xl font text-text group-hover:text-[white] flex gap-4">
          <div className='bg-primary-300 h-8 w-1 group-hover:bg-secondary'/>
          {item.title}
        </h3>

        <span className="text-text group-hover:text-[white]">
          {item.description}
        </span>

        { item.tags.length > 0 && 
          <ul className="flex gap-1 mt-auto flex-wrap max-w-full">
            {item.tags.map((tag, i) => 
              <li 
                key={i} 
                className="list-none flex items-center justify-center text-[white] px-3 py-1 rounded-full font-semibold text-xs"
                style={{ backgroundColor: tag.color || "#00000025" }}
              >
                {tag.name}
              </li>
            )}
          </ul>
          
        }

        <div className="max-w-full ml-auto mt-auto flex flex-col items-end gap-1">
          <span className="text-xs">
            Membros
          </span>
          <ul className="flex gap-1 flex-wrap  rounded-full h-fit items-center bg-[#00000015] py-1 px-2">
            <li className="list-none rounded-full overflow-hidden max-w-[32px] max-h-[32px] min-w-[32px] min-h-[32px] flex items-center justify-center bg-[#00000025]">
              <User color="white" size={24}/>
            </li>

            <li className="list-none rounded-full overflow-hidden max-w-[32px] max-h-[32px] min-w-[32px] min-h-[32px] flex items-center justify-center bg-[#00000025]">
              <User color="white" size={24}/>
            </li>

            <li className="list-none rounded-full overflow-hidden max-w-[32px] max-h-[32px] min-w-[32px] min-h-[32px] flex items-center justify-center bg-[#00000025]">
              <User color="white" size={24}/>
            </li>

            <li className="list-none rounded-full overflow-hidden max-w-[32px] max-h-[32px] min-w-[32px] min-h-[32px] flex items-center justify-center bg-[#00000025]">
              <User color="white" size={24}/>
            </li>
          </ul>
        </div>
      </li>
    </Link>
  )
}