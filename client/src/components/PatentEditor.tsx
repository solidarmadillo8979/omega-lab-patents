import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";

interface PatentEditorProps {
  isOpen: boolean;
  onClose: () => void;
  patent: {
    patentNumber: string;
    title: string;
    inventor: string;
    date: string;
    description: string;
    category: string;
    features: string[];
    specifications?: Record<string, string>;
    applications?: string[];
  };
  onSave: (updatedPatent: any) => void;
}

export default function PatentEditor({
  isOpen,
  onClose,
  patent,
  onSave,
}: PatentEditorProps) {
  const [formData, setFormData] = useState(patent);
  const [features, setFeatures] = useState(patent.features.join("\n"));
  const [applications, setApplications] = useState(
    (patent.applications || []).join("\n")
  );

  const handleSave = () => {
    const updatedPatent = {
      ...formData,
      features: features.split("\n").filter((f) => f.trim()),
      applications: applications.split("\n").filter((a) => a.trim()),
    };
    onSave(updatedPatent);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-sm border-accent/30">
        <DialogHeader className="relative pb-4 border-b border-accent/20">
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-2xl font-bold text-foreground">
              Edit Patent
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        {/* Form Content */}
        <div className="space-y-6 py-6">
          {/* Patent Number */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-accent/70">
              Patent Number
            </label>
            <Input
              value={formData.patentNumber}
              onChange={(e) =>
                setFormData({ ...formData, patentNumber: e.target.value })
              }
              className="bg-background/50 border-accent/20 text-foreground"
              disabled
            />
            <p className="text-xs text-muted-foreground">
              (Cannot be changed)
            </p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-accent/70">
              Title
            </label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-background/50 border-accent/20 text-foreground"
            />
          </div>

          {/* Inventor */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-accent/70">
              Inventor
            </label>
            <Input
              value={formData.inventor}
              onChange={(e) =>
                setFormData({ ...formData, inventor: e.target.value })
              }
              className="bg-background/50 border-accent/20 text-foreground"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-accent/70">
              Date
            </label>
            <Input
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="bg-background/50 border-accent/20 text-foreground"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-accent/70">
              Category
            </label>
            <Input
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="bg-background/50 border-accent/20 text-foreground"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-accent/70">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-background/50 border-accent/20 text-foreground min-h-24"
            />
          </div>

          {/* Features */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-accent/70">
              Features (one per line)
            </label>
            <Textarea
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="bg-background/50 border-accent/20 text-foreground min-h-32 font-mono text-xs"
            />
          </div>

          {/* Applications */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-accent/70">
              Applications (one per line)
            </label>
            <Textarea
              value={applications}
              onChange={(e) => setApplications(e.target.value)}
              className="bg-background/50 border-accent/20 text-foreground min-h-32 font-mono text-xs"
            />
          </div>

          {/* Open Source Notice */}
          <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 space-y-2">
            <p className="text-sm font-semibold text-accent">
              ⚡ Open Source Project
            </p>
            <p className="text-xs text-foreground/70">
              This patent is part of an open-source initiative to accelerate
              scientific discovery. Your updates will be visible to the global
              community.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-accent/20 pt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-accent/30 text-accent hover:bg-accent/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-accent/20 border border-accent/50 text-accent hover:bg-accent/30"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
