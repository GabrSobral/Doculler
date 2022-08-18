import Link from "next/link";
import { ArrowRight, Gear, Plus, Sidebar } from "phosphor-react"; 
import { Fragment, useState } from "react";

interface Props {

}

export const SideBar = ({ } : Props) => {
  const [ showSideBar, setShowSideBar ] = useState(true);

  return (
    <aside className="sticky w-fit bg-background-odd top-0 h-[100vh] p-4 shadow-md text-[white]">
      <Fragment>
        <span className="flex gap-3 items-center text-2xl font-extralight mb-3">
          {
            showSideBar &&
            <Fragment>
              <div className='bg-secondary h-8 w-1'/>
              Meus Projetos
            </Fragment>
          }

          <button
            title="Mostrar/Ocultar barra lateral"
            type="button" 
            className="flex items-center justify-center rounded p-2 bg-primary-500 hover:bg-primary-600 transition-colors ml-auto border-none cursor-pointer"
            onClick={() => setShowSideBar(state => !state)}
          >
            <Sidebar  size={24} color="#FFF" />
          </button>
        </span>

        {
          showSideBar &&
          <Fragment>
            <ul className="flex flex-col gap-1">
              <li className='text-[white] flex gap-3 items-center p-1 px-4 rounded hover:bg-primary-500 transition-colors cursor-pointer min-w-[15rem] max-w-[20rem]'>
                <ArrowRight color="white" />
                <Link href="/">
                  Meu Primero Projeto
                </Link>
              </li>

              <li className='flex gap-3 items-center p-1 px-4 rounded hover:bg-primary-500 transition-colors cursor-pointer min-w-[15rem] max-w-[20rem]'>
                <ArrowRight color="white" />
                <Link href="/">
                  Meu Segundo Projeto
                </Link>
              </li>

              <li className="mt-2 list-none">
                <button type="button" className="text-[1rem] bg-background-odd flex items-center gap-2 text-secondary hover:underline hover:underline-offset-2 border-none cursor-pointer">
                  <Plus size={20}/>
                  Novo Projeto
                </button>
              </li>
            </ul>
          </Fragment>
        }
      </Fragment>

      <button 
        type='button' 
        title="Configurações"
        className="absolute bottom-4 right-4 p-1 bg-background shadow-md rounded flex items-center justify-center border-none hover:bg-primary-600 transition-colors cursor-pointer"
        onClick={() => {}}
      >
        <Gear size={32} color="white"/>
      </button>  
    </aside>
  )
}