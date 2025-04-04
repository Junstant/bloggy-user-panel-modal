
import React, { useState, useEffect } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

// Sample data for parent elements (this would typically come from an API)
const mockParentElements = {
  supercategories: [
    { id: 1, title: "Technology" },
    { id: 2, title: "Health & Wellness" },
    { id: 3, title: "Business" }
  ],
  categories: [
    { id: 1, title: "Frontend Development", parentId: 1 },
    { id: 2, title: "Backend Development", parentId: 1 },
    { id: 3, title: "Mental Health", parentId: 2 },
    { id: 4, title: "Physical Fitness", parentId: 2 },
    { id: 5, title: "Marketing", parentId: 3 },
    { id: 6, title: "Finance", parentId: 3 }
  ]
};

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
  parentId: z.number().optional(),
  full_name: z.string().optional(),
  email: z.string().email().optional(),
  country: z.string().optional(),
});

type BlogElementFormValues = z.infer<typeof blogElementSchema>;

const BlogElementForm = () => {
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("supercategory");
  const [availableParents, setAvailableParents] = useState<Array<{ id: number, title: string }>>([]);
  
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
      full_name: "",
      email: "",
      country: "",
    },
  });
  
  // Update available parent elements when type changes
  useEffect(() => {
    if (selectedType === "category") {
      setAvailableParents(mockParentElements.supercategories);
    } else if (selectedType === "subcategory") {
      setAvailableParents(mockParentElements.categories);
    } else {
      setAvailableParents([]);
    }
  }, [selectedType]);
  
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
    form.setValue("parentId", undefined); // Reset parent selection when type changes
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      form.setValue("attachment", file);
    }
  };

  const renderPreview = () => {
    const type = selectedType;
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
        
        {type === "supercategory" && subtitle && (
          <h4 className="text-lg font-medium mb-4 text-muted-foreground">{subtitle}</h4>
        )}
        
        <div className="prose prose-sm mt-4 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {description}
          </ReactMarkdown>
        </div>
        
        {type === "category" && imageUrl && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-1">Image:</p>
            <img 
              src={imageUrl} 
              alt={title}
              className="max-w-full h-auto max-h-[200px] rounded-md border border-border" 
            />
          </div>
        )}
        
        {type === "subcategory" && videoUrl && (
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
            
            {/* Parent element selection */}
            {(selectedType === "category" || selectedType === "subcategory") && (
              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {selectedType === "category" ? "Parent Super Category" : "Parent Category"}
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={`Select a ${selectedType === "category" ? "super category" : "category"}`} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableParents.map((parent) => (
                          <SelectItem key={parent.id} value={parent.id.toString()}>
                            {parent.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
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
            
            {/* Author Information Fields */}
            <div className="pt-4 border-t">
              <h3 className="text-md font-medium mb-4">Author Information</h3>
              
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter author's full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter author's email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter author's country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" className="mt-4">Create Blog Element</Button>
          </form>
        </Form>
      ) : (
        renderPreview()
      )}
    </div>
  );
};

export default BlogElementForm;
