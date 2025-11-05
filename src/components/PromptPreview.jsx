import React, { useState } from 'react';
import { X, FileText, Code } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';

const PromptPreview = ({ data, onClose, generateMarkdown }) => {
  const [format, setFormat] = useState('md');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-slate-900">Vista Previa del Prompt</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <Tabs value={format} onValueChange={setFormat} className="flex-1 flex flex-col">
          <TabsList className="mx-4 mt-4">
            <TabsTrigger value="md" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Markdown
            </TabsTrigger>
            <TabsTrigger value="json" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              JSON
            </TabsTrigger>
          </TabsList>

          <TabsContent value="md" className="flex-1 m-4">
            <ScrollArea className="h-[calc(90vh-180px)] w-full rounded border bg-slate-50 p-4">
              <pre className="text-sm text-slate-800 whitespace-pre-wrap font-mono">
                {generateMarkdown(data)}
              </pre>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="json" className="flex-1 m-4">
            <ScrollArea className="h-[calc(90vh-180px)] w-full rounded border bg-slate-50 p-4">
              <pre className="text-sm text-slate-800 whitespace-pre-wrap font-mono">
                {JSON.stringify(data, null, 2)}
              </pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PromptPreview;
