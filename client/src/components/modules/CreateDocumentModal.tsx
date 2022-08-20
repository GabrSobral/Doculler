import { Plus } from "phosphor-react"
import { ModalWrapper } from "../elements/ModalWrapper"

export const CreateDocumentModal = () => {
  return (
    <ModalWrapper>
      <div className="bg-[#00000070] bottom-0 left-0 right-0 top-0 fixed flex items-center justify-center">

        <section className="rounded-md p-4 bg-background shadow-md">
          <header className="text-[white] font-light text-2xl flex gap-4">
            <div className='bg-primary-300 h-8 w-1'/>
            Criar um novo documento
          </header>

          <div className="mt-4 flex flex-col gap-3">
            <div className="text-[white] relative w-full">
              <label htmlFor="" className="absolute text translate-y-[-50%] top-[50%] left-4 pointer-events-none text-[#FFFFFF99]">
                Nome do projeto
              </label>
              <input
                type="text" 
                onChange={() => {}}
                className="py-3 px-4 rounded-md bg-[transparent] w-full"
              />
            </div>
            <textarea 
              name="" 
              id=""
              className="py-3 px-4 rounded-md bg-[transparent] text-[white]"
            >

            </textarea>

            <button
              type="button"
              className="rounded-md flex items-center justify-center bg-primary-300 p-3 text-[white] text-[1rem] gap-4"
              onClick={() => {}}
            >
              <Plus size={24} color="white"/>
              Criar
            </button>
          </div>
        </section>
      </div>
    </ModalWrapper>
  )
}