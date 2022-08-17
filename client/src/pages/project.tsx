import type { NextPage } from "next";
import Image from "next/image";
import { Pencil } from "phosphor-react";
import { useEffect, useState } from "react";

import { SideBarProjectItem } from "../components/elements/SideBarProjectItem";
import { TextEditor } from "../components/elements/TextEditor";
import { Header } from "../components/layout/Header";

const Project: NextPage = () => {
  const [ value, setValue ] = useState("");
  const [ isEditEnable, setIsEditEnable ] = useState(false);

  useEffect(() => {
    setValue('<h1 class="ql-align-center">Titulo de teste</h1><p class="ql-align-center"><br></p><p class="ql-align-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum in turpis sagittis ullamcorper. Integer elementum nulla eu augue varius tempus id vel libero. Etiam sed commodo nisl, sit amet porta ante. Sed pulvinar dignissim luctus. Donec quis lorem nec nulla aliquam commodo. Praesent fringilla lacus neque, id malesuada nibh blandit vitae. Pellentesque vitae augue eu elit varius consequat. Maecenas sit amet fermentum justo, quis laoreet justo. Nullam congue mi sit amet orci laoreet molestie. Fusce sodales, lectus ut varius venenatis, justo nisi feugiat nisl, hendrerit pharetra enim velit a nisl.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Morbi accumsan molestie tempor. Curabitur tempor dolor a finibus egestas. Quisque suscipit nisi in mi tempor imperdiet. Sed suscipit magna at volutpat scelerisque. Phasellus placerat scelerisque pharetra. Nunc et arcu lorem. Maecenas luctus neque quis nunc sagittis, ac mattis nunc aliquet. Donec id tincidunt felis. Donec eget aliquam metus. Aliquam erat volutpat. In rhoncus, nisl ac convallis bibendum, metus lorem venenatis odio, eget accumsan tellus mauris at purus. Cras efficitur erat ipsum, eget molestie quam lacinia vitae.</p><p><br></p><p>Nam nulla velit, sollicitudin eu augue vitae, rhoncus venenatis nisi. Cras ut dolor vitae metus ultrices gravida id eget ante. Fusce id pharetra ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec in tellus nec risus commodo ultrices volutpat eu massa. Donec fermentum arcu nec neque commodo tempor. Cras viverra, turpis ac semper finibus, felis lorem vehicula lacus, nec aliquam nunc mauris sit amet lacus. Donec a arcu venenatis, fringilla lorem sed, <strong>mollis </strong>elit. Donec eget risus tincidunt, facilisis est sit amet, eleifend libero. Curabitur vestibulum metus mauris, quis pulvinar nunc dictum sagittis. Suspendisse potenti. Nam vel nibh a lorem egestas congue. Curabitur eget lacus mollis, elementum neque et, pretium ante. Morbi ornare turpis in lorem laoreet fringilla. Nunc efficitur, erat nec efficitur convallis, sem nibh consequat neque, in dapibus elit massa ut urna. Morbi feugiat blandit turpis, sed tempor augue porttitor et.</p>')
  },[])

  return (
    <div className="w-full min-h-screen bg-contain" style={{ background: "url(./background-image.svg)" }}>
      <Header />
      
      <div className="w-[90%] max-w-[1360px] m-auto mt-4 flex gap-4 text-light-text">
        <aside className="bg-light-background w-[30rem] h-8 flex flex-col gap-2 text-light-text">
          <div className="flex gap-2">
            <div className='bg-light-primary-300 h-full w-1 group-hover:bg-light-primary-500'/>
            <strong className="font-normal text-xl">
              Meu Primeiro Projeto
            </strong>
          </div>
          
          <SideBarProjectItem />
          <SideBarProjectItem />
          <SideBarProjectItem />
        </aside>

        <main className={`w-full rounded shadow-md bg-light-background`}>
          <section className="p-4">
            <div className="flex gap-2 items-center justify-between">
              <strong className="font-light text-2xl">
                Cheapy
              </strong>

              <button 
                type="button"
                className={`flex items-center justify-center rounded transition-colors px-4 py-1 font-semibold gap-3 ${isEditEnable ? "text-[#FFF] bg-light-primary-300" : "text-light-text border"}`}
                onClick={() => setIsEditEnable(state => !state)}
              >
                <Pencil size={24} color={isEditEnable ? "#FFF" : "#494949"}/>
                Habilitar edição
              </button>
            </div>

            <h1 className="font-semibold text-6xl text-light-text">
              Client
            </h1>

            <footer className="flex flex-col gap-2">
              <div className="flex items-center gap-3 ml-auto font-semibold">
                <span>Escrito por: Gabriel Sobral</span>
                <Image 
                  src="https://github.com/GabrSobral.png" 
                  alt="Imagem do autor do texto" 
                  width={42}
                  height={42}
                  className="rounded-full shadow-md"
                />
              </div>

              <div className="flex gap-4 items-center text-light-text-soft">
                <span className="bg-[#00000005] rounded-2xl px-3 py-1">
                  13 minutos de leitura
                </span> 
                <span className="bg-[#00000005] rounded-2xl px-3 py-1">
                  Criado em: {new Date().toLocaleDateString()}
                </span>
                <span className="bg-[#00000005] rounded-2xl px-3 py-1">
                  Atualizado em: {new Date().toLocaleDateString()}
                </span> 
              </div>
            </footer>
          </section>

          <hr className="mb-4 text-[#00000025]"/>
          {
            isEditEnable ?
              <TextEditor value={value} setValue={setValue} /> :
              <div className={!isEditEnable ? "pl-4 pr-4 pb-4" : ""} dangerouslySetInnerHTML={{ __html: value }} />
          }
        </main>

        <aside className="bg-[blue] w-[30rem] h-8">

        </aside>
      </div>
    </div>
  )
}

export default Project;