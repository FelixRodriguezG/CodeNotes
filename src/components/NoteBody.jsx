import ReactMarkdown from "react-markdown";

export default function NoteBody({ children, className = "" }) {
  return (
    <div
      className={className}
    >
      <ReactMarkdown
        components={{
          pre: ({ children }) => (
            <pre className="overflow-x-auto whitespace-pre-wrap break-words">
              {children}
            </pre>
          ),
          code: ({ children }) => (
            <code className="break-words whitespace-pre-wrap">{children}</code>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
