import type { NextPage } from 'next'
import { SideBar } from '../components/layout/SideBar'
import { Plus } from 'phosphor-react'

import { ProjectItem } from '../components/elements/ProjectItem'
import { Header } from '../components/layout/Header'

const fakeData = [
  {
    id: 1,
    title: "Cheapy",
    description: "Eccomerce desenvolvido para treinar a linguagem C#, e NextJs",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: "FeedGet",
    description: "Projeto desenvolvido durante o NLW Return da RocketSeat, que visa mostrar uma área de contato e relato de bugs.",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    title: "WhatsApp Clone",
    description: "Clone do WhatsApp, para treinar comunicação WebSocket, junto a uma API NodeJS, um banco MongoDB, e uma interface em ReactJS",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const Home: NextPage = () => {
  return (
    <div className="flex w-full min-h-screen bg-background bg-fixed" style={{ backgroundImage: "url(./background-image.svg)" }}>
      <SideBar />

      <div className='w-full'>
        <Header />

        <section className='relative w-full bg-primary-500 h-64 p-4'>
          <div className='w-[90%] max-w-7xl m-auto'>
            <h1 className='text-5xl absolute top-[50%] translate-y-[-50%] text-[white] font-extralight'>
              Meu Primeiro Projeto
            </h1>
          </div>
        </section>

        <main className='w-[90%] max-w-7xl m-auto mt-4'>
          <header className='flex items-center gap-6 mb-4'>
            <strong className='text-text font-thin text-2xl'>
              Meus documentos
            </strong>
            <button type="button" className='flex items-center gap-2 px-4 py-2 bg-secondary rounded text-[white] hover:brightness-90 transition-all'>
              <Plus size={24} color="#FFF"/>
              Novo documento
            </button>
          </header>

          <ul className='grid gap-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
            {fakeData.map(item => 
              <ProjectItem key={item.id} item={item}/>
            )}
          </ul>
        </main>        
      </div>
    </div>
  )
}

export default Home
