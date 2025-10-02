import { useState, useCallback } from "react"
import { checkConnection } from "../api/CheckConnection"

export function useCheckConnection(autoResetMs = 2500) {
    const [ status, setStatus ] = useState("idle") // idle | loading | ok | unreachable | error

    const run = useCallback(async () => {
        setStatus("loading");
        let finalStatus;
        try {
            const res = await checkConnection()
            finalStatus = res.status === "ok" ? "ok" : "unreachable"
            setStatus(finalStatus)
        } catch (error) {
            finalStatus = "error"
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