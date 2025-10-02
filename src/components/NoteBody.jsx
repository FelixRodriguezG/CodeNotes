import ReactMarkdown from "react-markdown";

export default function NoteBody({ children, className = "" }) {
  return (
    <div className={className}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}