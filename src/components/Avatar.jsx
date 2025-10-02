export default function Avatar({
  src,
  alt = "Usuario",
  className = "",
  ...props
}) {
  // Generar iniciales del nombre
  const getInitials = (name) => {
    if (!name) return "?"
    const parts = name.trim().split(" ")
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white font-semibold ${className}`}
        {...props}
      >
        {getInitials(alt)}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover  ${className}`}
      {...props}
    />
  )
}