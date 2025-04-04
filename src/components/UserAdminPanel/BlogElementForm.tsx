
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const blogElementSchema = z.object({
  type: z.enum(["supercategory", "category", "subcategory"]),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  subtitle: z.string().optional(),
  description: z.string(),
  visibleToRole: z.string().optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  attachment: z.any().optional(),
});

type BlogElementFormValues = z.infer<typeof blogElementSchema>;

const BlogElementForm = () => {
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("supercategory");
  
  const form = useForm<BlogElementFormValues>({
    resolver: zodResolver(blogElementSchema),
    defaultValues: {
      type: "supercategory",
      title: "",
      subtitle: "",
      description: "",
      visibleToRole: "all",
      imageUrl: "",
      videoUrl: "",
    },
  });
  
  const onSubmit = (data: BlogElementFormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: "Blog element created",
      description: `Successfully created ${data.type}: ${data.title}`,
    });
    form.reset();
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    form.setValue("type", value as "supercategory" | "category" | "subcategory");
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      form.setValue("attachment", file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Create New Blog Element</h2>
        <Button
          variant="outline"
          type="button"
          onClick={() => setPreviewMode(!previewMode)}
        >
          {previewMode ? "Edit" : "Preview"}
        </Button>
      </div>

      {!previewMode ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Element Type</FormLabel>
                  <Select
                    onValueChange={(value) => handleTypeChange(value)}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="supercategory">Super Category</SelectItem>
                      <SelectItem value="category">Category</SelectItem>
                      <SelectItem value="subcategory">Sub Category</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {selectedType === "supercategory" && (
              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtitle</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter subtitle" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Markdown supported)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description with markdown"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {selectedType === "supercategory" && (
              <FormField
                control={form.control}
                name="visibleToRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visible to Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="subscriber">Subscribers Only</SelectItem>
                        <SelectItem value="admin">Admins Only</SelectItem>
                        <SelectItem value="editor">Editors Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {selectedType === "category" && (
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {selectedType === "subcategory" && (
              <>
                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter video URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormItem>
                  <FormLabel>Attachment</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={handleAttachmentChange}
                      className="cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
            
            <Button type="submit" className="mt-4">Create Blog Element</Button>
          </form>
        </Form>
      ) : (
        <Card className="p-4">
          <h3 className="text-xl font-bold mb-2">{form.watch("title") || "Title Preview"}</h3>
          {selectedType === "supercategory" && form.watch("subtitle") && (
            <h4 className="text-lg font-medium mb-4 text-muted-foreground">{form.watch("subtitle")}</h4>
          )}
          <div className="prose prose-sm mt-4 max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {form.watch("description") || "Description preview will appear here..."}
            </ReactMarkdown>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BlogElementForm;
