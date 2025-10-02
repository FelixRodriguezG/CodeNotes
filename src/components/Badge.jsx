export default function Badge({ children }) {
  const base =
    "inline-flex items-center  rounded-full text-xs font-medium px-3 h-6 shadow-sm";

  // Normaliza el nombre del tag a minúsculas para comparar
  const tag = String(children).toLowerCase();

  const tagStyles = {
    js: "bg-yellow-300/60 text-white",
    javascript: "bg-yellow-400/50 text-black",
    ts: "bg-blue-300/50 text-black",
    typescript: "bg-blue-300/50 text-black",
    react: "bg-cyan-400/50 text-black",
    next: "bg-gray-800/50 text-white",
    vue: "bg-green-400/50 text-black",
    svelte: "bg-orange-500/50 text-white",
    angular: "bg-red-600/50 text-white",
    css: "bg-blue-500/50 text-white",
    html: "bg-orange-400/50 text-white",
    node: "bg-green-700/50 text-white",
    express: "bg-gray-700/50 text-white",
    mongo: "bg-green-500/50 text-white",
    mongodb: "bg-green-500/50 text-white",
    sql: "bg-blue-600/50 text-white",
    mysql: "bg-blue-400/50 text-white",
    postgresql: "bg-blue-800/50 text-white",
    api: "bg-indigo-400/50 text-white",
    http: "bg-orange-400/50 text-white",
    auth: "bg-purple-500/50 text-white",
    jwt: "bg-purple-700/50 text-white",
    array: "bg-pink-400/50 text-white",
    snippet: "bg-green-600/50 text-white",
    regex: "bg-pink-700/50 text-white",
    git: "bg-orange-700/50 text-white",
    github: "bg-gray-900/50 text-white",
    docker: "bg-blue-300/50 text-black",
    linux: "bg-gray-600/50 text-white",
    shell: "bg-gray-800/50 text-white",
    testing: "bg-teal-400/50 text-black",
    jest: "bg-red-400/50 text-white",
    cypress: "bg-green-300/50 text-black",
    ui: "bg-fuchsia-400/50 text-white",
    ux: "bg-fuchsia-600/50 text-white",
    accessibility: "bg-emerald-400/50 text-black",
    seo: "bg-lime-400/50 text-black",
    performance: "bg-yellow-300/50 text-black",
    security: "bg-red-800/50 text-white",
    default: "bg-amber-700/50 text-white",
  };

  // Usa el estilo del tag si existe, si no usa default
  const style = tagStyles[tag] || tagStyles.default;

  return (
    <span className={`${base} ${style}`}>
      {children}
    </span>
  );
}