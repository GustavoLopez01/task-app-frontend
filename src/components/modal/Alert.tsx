import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'

type AlertProps = {
  isOpen: boolean
  title?: string
  message?: string
  handleAccept: () => void
  close: () => void
}

export default function Alert({
  isOpen,
  title = 'Si eliminas esta tarea ya no estara disponible.',
  message,
  handleAccept,
  close
}: AlertProps) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {}}
      >
        
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 font-montserrat-regular"
            >
              <DialogTitle as="h3" className="py-1">
                <p className="flex flex-col items-center font-montserrat-bold">
                  <span className="material-icons-round text-yellow-500" style={{ fontSize: "70px" }}>
                    warning
                  </span>
                  {title}
                </p>
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-center">
                {message}
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <Button
                  className="items-center gap-2 rounded-md bg-gray-400 px-3 py-1.5 text-sm/6 font-semibold text-white font-montserrat-bold cursor-pointer hover:bg-gray-500"
                  onClick={close}
                >
                  Cancelar
                </Button>
                <Button
                  className="items-center gap-2 rounded-md bg-sky-600 px-3 py-1.5 text-sm/6 font-semibold text-white font-montserrat-bold cursor-pointer hover:bg-sky-700"
                  onClick={handleAccept}
                >
                  Aceptar
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
