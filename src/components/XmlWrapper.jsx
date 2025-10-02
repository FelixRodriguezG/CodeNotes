export default function XmlWrapper({ tag = "tag", children, className = "" }) {
return (
    <div className={`font-mono  ${className}`}>
        <span className="">&lt;{tag}&gt;</span><br />
        <span className="px-4">{children}</span><br />
        <span className="">&lt;/{tag}&gt;</span>
    </div>
);
}