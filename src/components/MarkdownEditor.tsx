import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import MarkdownInput from "./MarkdownInput";
import MarkdownPreview from "./MarkdownPreview";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const defaultMarkdown = `# Welcome to Markdown Editor

This is a **beautiful** markdown editor with live preview!

## Features

- ✨ Real-time preview
- 🎨 Syntax highlighting
- 📱 Responsive design
- 🔄 Resizable panels

### Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists

1. First item
2. Second item
3. Third item

- Bullet point
- Another point
  - Nested point

### Links and Images

[Visit GitHub](https://github.com)

> This is a blockquote with **bold** text and *italic* text.

---

Enjoy writing in markdown! 🚀
`;

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [view, setView] = useState<"split" | "edit" | "preview">("split");
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast({
        title: "Copied!",
        description: "Markdown content copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Markdown file saved successfully",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <Button
            variant={view === "edit" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("edit")}
            className="transition-all duration-200"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant={view === "split" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("split")}
            className="transition-all duration-200"
          >
            Split
          </Button>
          <Button
            variant={view === "preview" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("preview")}
            className="transition-all duration-200"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="h-[600px]">
        {view === "edit" && (
          <MarkdownInput value={markdown} onChange={setMarkdown} />
        )}
        
        {view === "preview" && (
          <MarkdownPreview markdown={markdown} />
        )}
        
        {view === "split" && (
          <PanelGroup direction="horizontal">
            <Panel defaultSize={50} minSize={30}>
              <MarkdownInput value={markdown} onChange={setMarkdown} />
            </Panel>
            <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 cursor-col-resize" />
            <Panel defaultSize={50} minSize={30}>
              <MarkdownPreview markdown={markdown} />
            </Panel>
          </PanelGroup>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
