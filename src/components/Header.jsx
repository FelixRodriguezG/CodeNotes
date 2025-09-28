import { useState } from "react"
import Button from "../components/button"
import { useCheckConnection } from "../hooks/useCheckConnection"

export default function Header() {

  const { status, run, isLoading } = useCheckConnection();
  const isConnected = status === "ok"

  const label =
    status === "ok" ? "Conexión OK" :
    status === "unreachable" ? "No alcanzable" :
    status === "error" ? "Error" :
    isLoading ? "Verificando..." :
    "Verificar conexión"
  
  return (
      <div className="flex items-center gap-4">
      {isConnected ? (
        <span className="text-[var(--color-success)] font-medium">
          {label}
        </span>
      ) : (
        <Button
          onClick={run}
          isLoading={isLoading}
          variant={status === "error" ? "danger" : "primary"}
        >
          {label}
        </Button>
      )}
      
    </div>
  )
}
