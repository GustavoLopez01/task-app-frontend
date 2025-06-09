
type MobileNabvarProps = {
  showNavbar: boolean
  setShowNavbar: (show: boolean) => void
}

export default function MobileNabvar({ 
  setShowNavbar, 
  showNavbar
}: MobileNabvarProps) {
  return (
    <div className="w-full font-montserrat-regular border-r-1 border-gray-200 h-14 lg:hidden shadow-xl flex justify-end">
      <button
        className="flex items-center justify-center cursor-pointer mx-2"
        onClick={() => setShowNavbar(!showNavbar)}
      >
        <span className="material-icons-round text-sky-700" style={{ fontSize: "50px" }}>
          menu
        </span>
      </button>
    </div>
  )
}
