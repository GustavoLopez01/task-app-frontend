import { memo, lazy } from 'react'

const ErrorMessage = lazy(() => import('@/components/ErrorMessage'))

type InputWithLabelProps = {
  id: string
  type: string,
  placeholder: string
  label: string
  register: object
  error: string
}

const InputWithLabel = memo(({
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
      {error && (
        <ErrorMessage
          error={error}
        />
      )}
    </div>
  )
})

export default InputWithLabel