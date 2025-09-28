export async function checkConnection() {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL
  const path = import.meta.env.VITE_SUPABASE_FUNCTION_CHECK_DB
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!baseUrl || !path || !key) {
    throw new Error("Faltan variables de entorno Supabase")
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${key}`,
      
    }
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Error ${res.status}: ${text}`)
  }

  return res.json()
}