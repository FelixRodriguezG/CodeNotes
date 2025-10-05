import Spinner from "./Spinner"
export default function LoadingScreen({ 
  message = "Cargando...", 
  className = "" 
}) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${className} gap-1.5`}>
      <Spinner className="h-4 w-4" />
      <p className="text-lg text-white">{message}</p>
    </div>
  )
}
