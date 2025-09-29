import Spinner from "./Spinner"
export default function LoadingScreen({ 
  message = "Cargando...", 
  className = "" 
}) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${className}`}>
      <Spinner />
      <p className="text-lg text-white">{message}</p>
    </div>
  )
}

/*
---- Uso básico con mensaje y estilos por defecto ----
<LoadingScreen />

---- Con mensaje personalizado ----
<LoadingScreen message="Cargando notas..." />

---- Con clases adicionales ----
<LoadingScreen className="bg-gray-100" />
*/