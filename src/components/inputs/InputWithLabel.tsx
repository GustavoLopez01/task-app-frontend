import type { ChangeEvent } from "react"

type InputWithLabelProps = {
  id: string
  type: string,
  placeholder: string
  label: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const InputWithLabel = ({
  id,
  type,
  placeholder,
  label,
  handleChange
}: InputWithLabelProps) => {
  return (
    <div className="flex flex-col">
      <label
        className="font-montserrat-semibold"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="outline-0 px-3 py-1 text-sm border-1 border-gray-400 rounded-full"
        id={id}
        name={id}
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
      />
    </div>
  )
}
