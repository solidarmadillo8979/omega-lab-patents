import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lock, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { syncPatentToAll } from "@/lib/patentSync";
import { toast } from "sonner";

interface AdminEditorProps {
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
  isCreator: boolean;
}

export default function AdminEditor({
  isOpen,
  onClose,
  patent,
  onSave,
  isCreator,
}: AdminEditorProps) {
  const [formData, setFormData] = useState(patent);
  const [features, setFeatures] = useState(patent.features.join("\n"));
  const [applications, setApplications] = useState(
    (patent.applications || []).join("\n")
  );
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticate = () => {
    // Simple password check - in production, use proper backend authentication
    if (adminPassword === "OMEGA_ADMIN_2024") {
      setIsAuthenticated(true);
    }
  };

  const [isSyncing, setIsSyncing] = useState(false);

  const handleSave = async () => {
    const updatedPatent = {
      ...formData,
      features: features.split("\n").filter((f) => f.trim()),
      applications: applications.split("\n").filter((a) => a.trim()),
    };
    
    try {
      setIsSyncing(true);
      
      // Save to local state first
      onSave(updatedPatent);
      
      // Attempt to sync to GitHub and Google Drive
      try {
        await syncPatentToAll(updatedPatent);
        toast.success(`Patent ${updatedPatent.patentNumber} synced to GitHub and Google Drive`);
      } catch (syncError) {
        // Sync failed but patent was saved locally
        toast.warning(`Patent saved locally, but sync to GitHub/Drive failed. Check configuration.`);
        console.error("Sync error:", syncError);
      }
      
      setIsAuthenticated(false);
      setAdminPassword("");
      onClose();
    } finally {
      setIsSyncing(false);
    }
  };

  if (!isCreator) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-card/95 backdrop-blur-sm border-accent/30">
          <DialogHeader className="pb-4 border-b border-accent/20">
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Lock className="w-5 h-5 text-accent" />
              Creator Access Only
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-4 text-center">
            <p className="text-foreground/70">
              Patent editing is restricted to the project creator. This ensures
              the integrity of the scientific documentation.
            </p>
            <p className="text-sm text-accent/60">
              Interested in contributing? Join our collaboration network.
            </p>
          </div>
          <Button
            onClick={onClose}
            className="w-full bg-accent/20 border border-accent/50 text-accent hover:bg-accent/30"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-sm border-accent/30">
        {!isAuthenticated ? (
          <>
            <DialogHeader className="relative pb-4 border-b border-accent/20">
              <div className="flex items-start justify-between gap-4">
                <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Lock className="w-5 h-5 text-accent" />
                  Creator Authentication
                </DialogTitle>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </DialogHeader>

            <div className="py-8 space-y-6 text-center">
              <div className="space-y-2">
                <p className="text-foreground">
                  Enter your creator password to edit this patent
                </p>
                <p className="text-sm text-muted-foreground">
                  This protects the integrity of the scientific documentation
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter creator password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAuthenticate();
                  }}
                  className="bg-background/50 border-accent/20 text-foreground text-center"
                />

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 border-accent/30 text-accent hover:bg-accent/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAuthenticate}
                    className="flex-1 bg-accent/20 border border-accent/50 text-accent hover:bg-accent/30"
                  >
                    Authenticate
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
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

              {/* Creator Notice */}
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 space-y-2">
                <p className="text-sm font-semibold text-accent">
                  ⚡ Creator Update
                </p>
                <p className="text-xs text-foreground/70">
                  Your changes will be reflected across the patent repository.
                  The scientific community will see your updates.
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
                disabled={isSyncing}
                className="bg-accent/20 border border-accent/50 text-accent hover:bg-accent/30 disabled:opacity-50"
              >
                {isSyncing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
