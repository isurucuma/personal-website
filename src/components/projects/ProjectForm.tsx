import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface Technology {
  languages: string[];
  frameworks: string[];
  databases: string[];
  tools: string[];
}

export interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  demoUrl?: string;
  sourceUrls: {
    github?: string;
    gitlab?: string;
    other?: string;
  };
  technologies: Technology;
  features: string[];
  status: "draft" | "published";
  featured: boolean;
  startDate?: string;
  endDate?: string;
}

interface ProjectFormProps {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function ProjectForm({
  initialData,
  onSubmit,
  isSubmitting,
}: Readonly<ProjectFormProps>) {
  const [formData, setFormData] = useState<ProjectFormData>(
    initialData || {
      title: "",
      slug: "",
      description: "",
      sourceUrls: {},
      technologies: {
        languages: [],
        frameworks: [],
        databases: [],
        tools: [],
      },
      features: [],
      status: "draft",
      featured: false,
    }
  );

  const [newFeature, setNewFeature] = useState("");
  const [newTech, setNewTech] = useState({ type: "languages", value: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const addTechnology = () => {
    if (!newTech.value) return;
    setFormData({
      ...formData,
      technologies: {
        ...formData.technologies,
        [newTech.type]: [
          ...(formData.technologies[newTech.type as keyof Technology] || []),
          newTech.value,
        ],
      },
    });
    setNewTech({ ...newTech, value: "" });
  };

  const removeTechnology = (type: keyof Technology, index: number) => {
    setFormData({
      ...formData,
      technologies: {
        ...formData.technologies,
        [type]: formData.technologies[type].filter((_, i) => i !== index),
      },
    });
  };

  const addFeature = () => {
    if (!newFeature) return;
    setFormData({
      ...formData,
      features: [...formData.features, newFeature],
    });
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Short Description</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="longDescription">Long Description</Label>
          <textarea
            id="longDescription"
            className="w-full min-h-[200px] px-3 py-2 border rounded-md"
            value={formData.longDescription}
            onChange={(e) =>
              setFormData({ ...formData, longDescription: e.target.value })
            }
          />
        </div>

        <div>
          <Label htmlFor="thumbnail">Thumbnail URL</Label>
          <Input
            id="thumbnail"
            value={formData.thumbnail}
            onChange={(e) =>
              setFormData({ ...formData, thumbnail: e.target.value })
            }
          />
        </div>

        <div>
          <Label htmlFor="demoUrl">Demo URL</Label>
          <Input
            id="demoUrl"
            value={formData.demoUrl}
            onChange={(e) =>
              setFormData({ ...formData, demoUrl: e.target.value })
            }
          />
        </div>

        {/* Source URLs */}
        <div className="space-y-2">
          <h3 className="font-semibold">Source Links</h3>
          <div>
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              value={formData.sourceUrls.github}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sourceUrls: {
                    ...formData.sourceUrls,
                    github: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="gitlab">GitLab</Label>
            <Input
              id="gitlab"
              value={formData.sourceUrls.gitlab}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sourceUrls: {
                    ...formData.sourceUrls,
                    gitlab: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="otherSource">Other Source</Label>
            <Input
              id="otherSource"
              value={formData.sourceUrls.other}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sourceUrls: { ...formData.sourceUrls, other: e.target.value },
                })
              }
            />
          </div>
        </div>

        {/* Technologies */}
        <div className="space-y-2">
          <h3 className="font-semibold">Technologies</h3>
          <div className="flex gap-2">
            <select
              className="px-3 py-2 border rounded-md"
              value={newTech.type}
              onChange={(e) => setNewTech({ ...newTech, type: e.target.value })}
            >
              <option value="languages">Languages</option>
              <option value="frameworks">Frameworks</option>
              <option value="databases">Databases</option>
              <option value="tools">Tools</option>
            </select>
            <Input
              value={newTech.value}
              onChange={(e) =>
                setNewTech({ ...newTech, value: e.target.value })
              }
              placeholder="Add technology..."
            />
            <Button type="button" onClick={addTechnology}>
              Add
            </Button>
          </div>

          {Object.entries(formData.technologies).map(
            ([type, items]: [string, string[]]) => (
              <div key={type} className="mt-2">
                <h4 className="text-sm font-medium capitalize">{type}</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {items.map((item, index) => (
                    <div
                      key={`${type}-${item}`}
                      className="flex items-center gap-1 px-2 py-1 text-sm bg-secondary rounded-full"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() =>
                          removeTechnology(type as keyof Technology, index)
                        }
                        className="text-muted-foreground hover:text-foreground"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* Features */}
        <div className="space-y-2">
          <h3 className="font-semibold">Features</h3>
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add feature..."
            />
            <Button type="button" onClick={addFeature}>
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {formData.features.map((feature, index) => (
              <div
                key={`${feature}-${index}`}
                className="flex items-center gap-2"
              >
                <span>{feature}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Project Status and Dates */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="px-3 py-2 border rounded-md"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "draft" | "published",
                  })
                }
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
              />
              <Label htmlFor="featured">Featured Project</Label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                type="date"
                id="endDate"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Project"}
      </Button>
    </form>
  );
}
