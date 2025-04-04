
import React from "react";
import { Card } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { UseFormReturn } from "react-hook-form";
import { BlogElementFormValues } from "./types";

interface PreviewProps {
  form: UseFormReturn<BlogElementFormValues>;
  selectedType: string;
}

const Preview: React.FC<PreviewProps> = ({ form, selectedType }) => {
  const title = form.watch("title") || "Title Preview";
  const subtitle = form.watch("subtitle");
  const description = form.watch("description") || "Description preview will appear here...";
  const imageUrl = form.watch("imageUrl");
  const videoUrl = form.watch("videoUrl");
  const fullName = form.watch("full_name");
  const email = form.watch("email");
  const country = form.watch("country");

  return (
    <Card className="p-4">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      
      {selectedType === "supercategory" && subtitle && (
        <h4 className="text-lg font-medium mb-4 text-muted-foreground">{subtitle}</h4>
      )}
      
      <div className="prose prose-sm mt-4 max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {description}
        </ReactMarkdown>
      </div>
      
      {selectedType === "category" && imageUrl && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-1">Image:</p>
          <img 
            src={imageUrl} 
            alt={title}
            className="max-w-full h-auto max-h-[200px] rounded-md border border-border" 
          />
        </div>
      )}
      
      {selectedType === "subcategory" && videoUrl && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-1">Video URL:</p>
          <p className="text-sm text-muted-foreground break-all">{videoUrl}</p>
        </div>
      )}
      
      {(fullName || email || country) && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm font-medium mb-2">Author Information:</p>
          {fullName && <p className="text-sm">Name: {fullName}</p>}
          {email && <p className="text-sm">Email: {email}</p>}
          {country && <p className="text-sm">Country: {country}</p>}
        </div>
      )}
    </Card>
  );
};

export default Preview;
