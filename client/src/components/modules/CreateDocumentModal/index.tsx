import { Plus, X } from "phosphor-react"
import { useState } from "react"
import { ModalWrapper } from "../../elements/ModalWrapper"
import { DescriptionInput } from "./DescriptionInput"
import { TitleInput } from "./TitleInput"

interface Props {
  closeModal: () => void;
}

export const CreateDocumentModal = ({ closeModal } : Props) => {
  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");

  return (
    <ModalWrapper>
      <div className="bg-[#00000070] bottom-0 left-0 right-0 top-0 fixed flex items-center justify-center" onClick={closeModal}>

        <section className="rounded-md p-4 bg-background shadow-md max-w-[90%] w-[30rem]" onClick={e => e.stopPropagation()}>
          <header className="text-[white] font-light text-2xl flex gap-4">
            <div className='bg-primary-300 h-8 w-1'/>
            Criar um novo projeto
          </header>

          <div className="mt-4 flex flex-col gap-3">
            <TitleInput 
              textValue={title}
              setValue={(value) => setTitle(value)}
            />

            <DescriptionInput 
              textValue={description}
              setValue={(value) => setDescription(value)}
            />

            <div className="flex gap-2">
              <button
                type="button"
                className="border-2 border-solid border-background-odd ml-auto max-w-xs w-full rounded-md flex items-center justify-center bg-background p-3 text-[white] text-[1rem] gap-4 hover:bg-warning hover:border-warning transition-colors"
                onClick={closeModal}
              >
                <X size={24} color="white"/>
                Cancelar
              </button>

              <button
                type="button"
                className="border-2 border-solid border-primary-300 ml-auto max-w-xs w-full rounded-md flex items-center justify-center bg-primary-300 p-3 text-[white] text-[1rem] gap-4 hover:brightness-90 transition-all"
                onClick={() => {}}
              >
                <Plus size={24} color="white"/>
                Criar
              </button>
            </div>

          </div>
        </section>
      </div>
    </ModalWrapper>
  )
}