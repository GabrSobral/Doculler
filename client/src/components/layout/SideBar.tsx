import { ArrowRight, Gear, Plus, Sidebar } from "phosphor-react"; 
import { Fragment, useState } from "react";

interface Props {

}

export const SideBar = ({ } : Props) => {
  const [ showSideBar, setShowSideBar ] = useState(true);

  return (
    <aside className="sticky w-fit bg-light-primary-300 top-0 h-[100vh] p-4 shadow-md text-[white]">
      <Fragment>
        <span className="flex gap-3 items-center text-2xl font-extralight mb-3">
          {
            showSideBar &&
            <Fragment>
              <div className='bg-light-secondary h-8 w-1'/>
              Meus Projetos
            </Fragment>
          }

          <button
            title="Mostrar/Ocultar barra lateral"
            type="button" 
            className="flex items-center justify-center rounded p-2 bg-light-primary-500 hover:bg-light-primary-600 transition-colors ml-auto"
            onClick={() => setShowSideBar(state => !state)}
          >
            <Sidebar  size={24} color="#FFF" />
          </button>
        </span>

        {
          showSideBar &&
          <Fragment>
            <ul className="flex flex-col gap-1">
              <li className='flex gap-3 items-center p-1 px-4 rounded hover:bg-light-primary-500 transition-colors cursor-pointer min-w-[15rem] max-w-[20rem]'>
                <ArrowRight />
                <a href="">
                  Meu Primero Projeto
                </a>
              </li>

              <li className='flex gap-3 items-center p-1 px-4 rounded hover:bg-light-primary-500 transition-colors cursor-pointer min-w-[15rem] max-w-[20rem]'>
                <ArrowRight />
                Meu Segundo Projeto
              </li>

              <li className="mt-2">
                <button type="button" className="flex items-center gap-2 text-light-secondary hover:underline hover:underline-offset-2">
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
        className="absolute bottom-4 right-4 p-1 bg-light-primary-500 rounded"
        onClick={() => {}}
      >
        <Gear size={32}/>
      </button>  
    </aside>
  )
}