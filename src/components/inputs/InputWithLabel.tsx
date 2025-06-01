
type InputWithLabelProps = {
  id: string
  type: string,
  placeholder: string
  label: string
  register: object
  error: string
}

export const InputWithLabel = ({
  id,
  type,
  placeholder,
  label,
  register,
  error,
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
        max={100}
        min={0}
        {...register}
      />
      {error && <span className="text-red-500 font-montserrat-semibold text-[13px]"> {error} </span>}
    </div>
  )
}
