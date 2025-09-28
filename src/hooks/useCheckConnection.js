import { useState, useCallback } from "react"
import { checkConnection } from "../api/CheckConnection"

export function useCheckConnection(autoResetMs = 2500) {
    const [ status, setStatus ] = useState("idle") // idle | loading | ok | unreachable | error

    const run = useCallback(async () => {
        setStatus("loading")
        try {
            const res = await checkConnection()
            setStatus(res.status === "ok" ? "ok" : "unreachable")
        } catch (error) {
            setStatus("error")
        } finally {
            // Solo resetea si NO fue ok
            if (autoResetMs && finalStatus !== "ok") {
                setTimeout(() => setStatus("idle"), autoResetMs)
            }
        }
    }, [ autoResetMs ])

    return {
        status,
        run,
        isLoading: status === "loading"
    }
}