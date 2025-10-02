export default function JsonWrapper({ value, className = "" }) {
  return (
    <pre className={`font-mono rounded p-2 my-2 text-wrap ${className}`}>
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}