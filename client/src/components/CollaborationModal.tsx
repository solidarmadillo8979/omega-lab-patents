import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Users, X } from "lucide-react";
import { useState } from "react";

interface CollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CollaborationModal({
  isOpen,
  onClose,
}: CollaborationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expertise: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // In production, this would send to a backend
    console.log("Collaboration request:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", expertise: "", message: "" });
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-sm border-accent/30">
        <DialogHeader className="relative pb-4 border-b border-accent/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                Join the Collaboration Network
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-2">
                We're seeking like-minded researchers, builders, and visionaries
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        {!submitted ? (
          <>
            {/* Content */}
            <div className="py-6 space-y-6">
              {/* Introduction */}
              <div className="space-y-3 p-4 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm text-foreground/80">
                  The Scientist Gem | OMEGA Protocol operates on principles of
                  <span className="text-accent font-semibold"> neutral utility</span>
                  {" "}for the betterment of humankind and the universe. We seek
                  collaborators who understand:
                </p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-accent/60 mt-1">◆</span>
                    <span>
                      <strong>Elemental Synthesis:</strong> Integration of ancient
                      knowledge with modern scientific rigor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent/60 mt-1">◆</span>
                    <span>
                      <strong>Nomadic Methodology:</strong> Portable, accessible
                      science for all
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent/60 mt-1">◆</span>
                    <span>
                      <strong>Open-Source Philosophy:</strong> Knowledge shared
                      freely for universal benefit
                    </span>
                  </li>
                </ul>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-accent/70">
                    Name
                  </label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-background/50 border-accent/20 text-foreground"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-accent/70">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-background/50 border-accent/20 text-foreground"
                  />
                </div>

                {/* Expertise */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-accent/70">
                    Areas of Expertise
                  </label>
                  <Input
                    placeholder="e.g., Electronics, Acoustics, Materials Science, Philosophy, etc."
                    value={formData.expertise}
                    onChange={(e) =>
                      setFormData({ ...formData, expertise: e.target.value })
                    }
                    className="bg-background/50 border-accent/20 text-foreground"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-accent/70">
                    Tell us about yourself
                  </label>
                  <Textarea
                    placeholder="Share your background, interests, and how you'd like to contribute..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-background/50 border-accent/20 text-foreground min-h-24"
                  />
                </div>
              </div>

              {/* Collaboration Types */}
              <div className="p-4 rounded-lg bg-background/50 border border-accent/20 space-y-3">
                <p className="text-xs font-semibold text-accent/70 uppercase tracking-wider">
                  We're Looking For:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-foreground/70">
                  <div className="flex items-center gap-2">
                    <span className="text-accent">→</span>
                    <span>Hardware Engineers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">→</span>
                    <span>Materials Scientists</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">→</span>
                    <span>Software Developers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">→</span>
                    <span>Researchers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">→</span>
                    <span>Philosophers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">→</span>
                    <span>Builders & Makers</span>
                  </div>
                </div>
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
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email}
                className="bg-accent/20 border border-accent/50 text-accent hover:bg-accent/30 disabled:opacity-50"
              >
                <Mail className="w-4 h-4 mr-2" />
                Submit Interest
              </Button>
            </div>
          </>
        ) : (
          <div className="py-12 text-center space-y-4">
            <div className="text-4xl">✨</div>
            <h3 className="text-xl font-bold text-foreground">
              Thank You for Your Interest
            </h3>
            <p className="text-foreground/70">
              We've received your collaboration request. Our team will review
              your profile and reach out soon.
            </p>
            <p className="text-sm text-accent/60">
              Welcome to the Scientist Gem collective.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
