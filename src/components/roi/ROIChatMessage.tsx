import ReactMarkdown from "react-markdown";

interface ROIChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ROIChatMessage = ({ role, content }: ROIChatMessageProps) => (
  <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
      role === "user"
        ? "bg-primary text-primary-foreground"
        : "bg-muted text-foreground"
    }`}>
      {role === "assistant" ? (
        <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-li:my-0.5">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ) : content}
    </div>
  </div>
);

export default ROIChatMessage;
