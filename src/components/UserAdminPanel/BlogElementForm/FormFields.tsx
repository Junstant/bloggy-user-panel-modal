
import React, { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { BlogElementFormValues, mockParentElements } from "./types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface CommonFieldProps {
  form: UseFormReturn<BlogElementFormValues>;
}

export const ElementSelectionField: React.FC<{
  form: UseFormReturn<BlogElementFormValues>;
  onSelectionTypeChange: (value: string) => void;
}> = ({ form, onSelectionTypeChange }) => {
  // Define what can be created based on the selection
  const getAvailableTypes = (selectionType: string) => {
    switch (selectionType) {
      case "none":
        return ["supercategory"];
      case "supercategory":
        return ["category"];
      case "category":
        return ["subcategory"];
      case "subcategory":
        return [];
      default:
        return ["supercategory"];
    }
  };

  const selectionType = form.watch("selectionType") || "none";
  const availableTypes = getAvailableTypes(selectionType);
  
  // If selection type changes, update the type accordingly
  useEffect(() => {
    if (availableTypes.length > 0) {
      form.setValue("type", availableTypes[0] as "supercategory" | "category" | "subcategory");
    }
  }, [form.watch("selectionType")]);

  return (
    <>
      <FormField
        control={form.control}
        name="selectionType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select parent element type</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                onSelectionTypeChange(value);
                // Reset the parent ID when changing selection type
                form.setValue("selectedParentId", undefined);
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a parent element type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">None (Create Supercategory)</SelectItem>
                <SelectItem value="supercategory">Supercategory (Create Category)</SelectItem>
                <SelectItem value="category">Category (Create Subcategory)</SelectItem>
                <SelectItem value="subcategory">Subcategory (Cannot create children)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {form.watch("selectionType") !== "none" && (
        <FormField
          control={form.control}
          name="selectedParentId"
          render={({ field }) => {
            const selectionType = form.watch("selectionType");
            let availableParents: { id: number; title: string }[] = [];
            
            if (selectionType === "supercategory") {
              availableParents = mockParentElements.supercategories;
            } else if (selectionType === "category") {
              availableParents = mockParentElements.categories;
            } else if (selectionType === "subcategory") {
              availableParents = mockParentElements.subcategories;
            }
            
            return (
              <FormItem>
                <FormLabel>Select Parent {selectionType}</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select a ${selectionType}`} />
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
            );
          }}
        />
      )}
      
      {form.watch("selectionType") === "subcategory" && (
        <Alert variant="warning" className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-700">
            Subcategories cannot have child elements. You cannot create new elements here.
          </AlertDescription>
        </Alert>
      )}

      {form.watch("selectionType") !== "subcategory" && (
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => {
            const selectionType = form.watch("selectionType");
            const availableTypes = getAvailableTypes(selectionType);
            
            return (
              <FormItem>
                <FormLabel>Element Type to Create</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={availableTypes.length === 0 || availableTypes.length === 1}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select element type to create" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "supercategory" ? "Super Category" : 
                         type === "category" ? "Category" : "Sub Category"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      )}
    </>
  );
};

export const TitleField: React.FC<CommonFieldProps> = ({ form }) => (
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
);

export const SubtitleField: React.FC<CommonFieldProps> = ({ form }) => (
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
);

export const DescriptionField: React.FC<CommonFieldProps> = ({ form }) => (
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
);

export const VisibilityField: React.FC<CommonFieldProps> = ({ form }) => (
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
);

export const ImageUrlField: React.FC<CommonFieldProps> = ({ form }) => (
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
);

export const VideoUrlField: React.FC<CommonFieldProps> = ({ form }) => (
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
);

export const AttachmentField: React.FC<{
  form: UseFormReturn<BlogElementFormValues>;
  handleAttachmentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ form, handleAttachmentChange }) => (
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
);

export const ParentSelectionField: React.FC<{
  form: UseFormReturn<BlogElementFormValues>;
  availableParents: Array<{ id: number; title: string }>;
  selectedType: string;
}> = ({ form, availableParents, selectedType }) => (
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
);

export const AuthorInfoFields: React.FC<CommonFieldProps> = ({ form }) => (
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
);
