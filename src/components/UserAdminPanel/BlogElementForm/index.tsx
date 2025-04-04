
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { blogElementSchema, mockParentElements, BlogElementFormValues } from "./types";
import Preview from "./Preview";
import {
  TitleField,
  SubtitleField,
  DescriptionField,
  VisibilityField,
  ImageUrlField,
  VideoUrlField,
  AttachmentField,
  ElementSelectionField
} from "./FormFields";

const BlogElementForm = () => {
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("supercategory");
  const [availableParents, setAvailableParents] = useState<Array<{ id: number, title: string }>>([]);
  const [canCreate, setCanCreate] = useState(true);
  
  const form = useForm<BlogElementFormValues>({
    resolver: zodResolver(blogElementSchema),
    defaultValues: {
      selectionType: "none",
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
  
  // Update available parent elements when selection type changes
  useEffect(() => {
    const selectionType = form.watch("selectionType");
    
    if (selectionType === "supercategory") {
      setAvailableParents(mockParentElements.supercategories);
    } else if (selectionType === "category") {
      setAvailableParents(mockParentElements.categories);
    } else if (selectionType === "subcategory") {
      setAvailableParents(mockParentElements.subcategories);
      setCanCreate(false);
    } else {
      setAvailableParents([]);
      setCanCreate(true);
    }
    
    // Update the type based on selection
    if (selectionType === "none") {
      setSelectedType("supercategory");
      form.setValue("type", "supercategory");
    } else if (selectionType === "supercategory") {
      setSelectedType("category");
      form.setValue("type", "category");
    } else if (selectionType === "category") {
      setSelectedType("subcategory");
      form.setValue("type", "subcategory");
    }
    
  }, [form.watch("selectionType")]);
  
  const onSubmit = (data: BlogElementFormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: "Blog element created",
      description: `Successfully created ${data.type}: ${data.title}`,
    });
    form.reset({
      selectionType: "none",
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
    });
  };

  const handleSelectionTypeChange = (value: string) => {
    if (value === "subcategory") {
      setCanCreate(false);
    } else {
      setCanCreate(true);
    }
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
            <ElementSelectionField 
              form={form}
              onSelectionTypeChange={handleSelectionTypeChange}
            />
            
            {canCreate && (
              <>
                <TitleField form={form} />
                
                {selectedType === "supercategory" && (
                  <SubtitleField form={form} />
                )}
                
                <DescriptionField form={form} />
                
                {selectedType === "supercategory" && (
                  <VisibilityField form={form} />
                )}
                
                {selectedType === "category" && (
                  <ImageUrlField form={form} />
                )}
                
                {selectedType === "subcategory" && (
                  <>
                    <VideoUrlField form={form} />
                    <AttachmentField 
                      form={form}
                      handleAttachmentChange={handleAttachmentChange}
                    />
                  </>
                )}
                
                {/* Author Information Fields */}
                <AuthorInfoFields form={form} />
                
                <Button type="submit" className="mt-4">Create Blog Element</Button>
              </>
            )}
          </form>
        </Form>
      ) : (
        <Preview form={form} selectedType={selectedType} />
      )}
    </div>
  );
};

export default BlogElementForm;
