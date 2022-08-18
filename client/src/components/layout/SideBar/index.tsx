import { ArrowRight, Gear, Plus, Sidebar } from "phosphor-react"; 
import { Fragment, useState } from "react";

import styles from './style.module.scss'

interface Props {

}

export const SideBar = ({ } : Props) => {
  const [ showSideBar, setShowSideBar ] = useState(true);

  return (
    <aside className={styles.container}>
      <Fragment>
        <span>
          {
            showSideBar &&
            <Fragment>
              <div />
              Meus Projetos
            </Fragment>
          }

          <button
            title="Mostrar/Ocultar barra lateral"
            type="button" 
            onClick={() => setShowSideBar(state => !state)}
          >
            <Sidebar  size={24} color="#FFF" />
          </button>
        </span>

        {
          showSideBar &&
          <Fragment>
            <ul>
              <li>
                <ArrowRight />
                <a href="">
                  Meu Primero Projeto
                </a>
              </li>

              <li>
                <ArrowRight />
                Meu Segundo Projeto
              </li>

              <li>
                <button type="button">
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
        onClick={() => {}}
      >
        <Gear size={32}/>
      </button>  
    </aside>
  )
}