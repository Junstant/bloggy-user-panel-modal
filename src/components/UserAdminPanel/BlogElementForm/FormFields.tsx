
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { BlogElementFormValues } from "./types";

interface CommonFieldProps {
  form: UseFormReturn<BlogElementFormValues>;
}

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

export const ElementTypeField: React.FC<{
  form: UseFormReturn<BlogElementFormValues>;
  handleTypeChange: (value: string) => void;
}> = ({ form, handleTypeChange }) => (
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
