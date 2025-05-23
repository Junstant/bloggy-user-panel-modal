
import * as z from "zod";

// Sample data for parent elements (this would typically come from an API)
export const mockParentElements = {
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
  ],
  subcategories: [
    { id: 1, title: "React", parentId: 1 },
    { id: 2, title: "Vue", parentId: 1 },
    { id: 3, title: "Node.js", parentId: 2 },
    { id: 4, title: "Python", parentId: 2 },
    { id: 5, title: "Yoga", parentId: 4 },
    { id: 6, title: "Running", parentId: 4 }
  ]
};

export const blogElementSchema = z.object({
  selectionType: z.enum(["none", "supercategory", "category", "subcategory"]),
  selectedParentId: z.number().optional(),
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

export type BlogElementFormValues = z.infer<typeof blogElementSchema>;
