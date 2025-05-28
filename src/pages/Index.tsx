
import MarkdownEditor from "@/components/MarkdownEditor";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Markdown Editor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A beautiful markdown editor with live preview, syntax highlighting, and split-pane view
          </p>
        </div>
        <MarkdownEditor />
      </div>
    </div>
  );
};

export default Index;
