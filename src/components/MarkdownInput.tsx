
import { useEffect, useRef } from "react";

interface MarkdownInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownInput = ({ value, onChange }: MarkdownInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      onChange(newValue);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="h-full relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full h-full p-6 font-mono text-sm resize-none border-none outline-none bg-gray-50 text-gray-800 leading-relaxed"
        placeholder="Start writing your markdown here..."
        style={{
          minHeight: "100%",
          fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
        }}
      />
      
      {/* Syntax highlighting overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <pre className="p-6 font-mono text-sm leading-relaxed text-transparent whitespace-pre-wrap break-words">
          <code
            dangerouslySetInnerHTML={{
              __html: highlightMarkdown(value),
            }}
          />
        </pre>
      </div>
    </div>
  );
};

// Simple markdown syntax highlighter
const highlightMarkdown = (text: string): string => {
  return text
    // Headers
    .replace(/^(#{1,6})\s(.*)$/gm, '<span style="color: #3b82f6; font-weight: bold;">$1</span> <span style="color: #1e40af; font-weight: bold;">$2</span>')
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<span style="color: #dc2626; font-weight: bold;">**$1**</span>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<span style="color: #059669; font-style: italic;">*$1*</span>')
    // Inline code
    .replace(/`(.*?)`/g, '<span style="background-color: #f3f4f6; color: #dc2626; padding: 2px 4px; border-radius: 3px;">`$1`</span>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span style="color: #7c3aed;">[</span><span style="color: #059669;">$1</span><span style="color: #7c3aed;">]</span><span style="color: #7c3aed;">(</span><span style="color: #dc2626;">$2</span><span style="color: #7c3aed;">)</span>')
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<span style="color: #7c3aed;">```$1</span>\n<span style="background-color: #f8fafc; color: #475569;">$2</span><span style="color: #7c3aed;">```</span>')
    // Lists
    .replace(/^(\s*)([-*+]|\d+\.)\s/gm, '$1<span style="color: #f59e0b; font-weight: bold;">$2</span> ')
    // Blockquotes
    .replace(/^>\s(.*)$/gm, '<span style="color: #6b7280;">></span> <span style="color: #6b7280; font-style: italic;">$1</span>')
    // Horizontal rules
    .replace(/^---+$/gm, '<span style="color: #9ca3af;">$&</span>');
};

export default MarkdownInput;
