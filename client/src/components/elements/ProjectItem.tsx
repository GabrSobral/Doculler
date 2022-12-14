import Link from "next/link";

interface Props {
  item: {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

export const ProjectItem = ({ item } : Props) => {
  return (
    <Link href={`/project`}>
      <li className="w-full bg-light-background shadow-md rounded  p-4 list-none flex flex-col gap-2 group hover:bg-light-primary-300 transition-colors cursor-pointer">
        <h3 className="group text-2xl font-light text-light-text group-hover:text-[white] flex gap-4">
          <div className='bg-light-primary-300 h-8 w-1 group-hover:bg-light-primary-500'/>
          {item.title}
        </h3>

        <span className="text-light-text group-hover:text-[white]">
          {item.description}
        </span>
      </li>
    </Link>
  )
}