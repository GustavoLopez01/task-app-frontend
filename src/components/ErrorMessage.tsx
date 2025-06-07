type ErrorMessageProps = {
  error: string
}

const ErrorMessage = ({
  error
}: ErrorMessageProps) => {
  return (
    <>
      {error && <span className="text-red-500 font-montserrat-semibold text-[13px]"> {error} </span>}
    </>
  )
}

export default ErrorMessage