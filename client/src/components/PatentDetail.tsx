import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useState } from "react";

interface PatentDetailProps {
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
    imageUrl?: string;
  };
}

export default function PatentDetail({
  isOpen,
  onClose,
  patent,
}: PatentDetailProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "applications">("overview");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-sm border-accent/30">
        <DialogHeader className="relative pb-4 border-b border-accent/20">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-xs font-mono text-accent/70 mb-2">
                {patent.patentNumber}
              </p>
              <DialogTitle className="text-3xl font-bold text-foreground">
                {patent.title}
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        {/* Patent Image */}
        {patent.imageUrl && (
          <div className="my-6 rounded-lg overflow-hidden border border-accent/20">
            <img
              src={patent.imageUrl}
              alt={patent.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Inventor</p>
            <p className="font-semibold text-foreground">{patent.inventor}</p>
          </div>
          <div className="text-border">•</div>
          <div>
            <p className="text-muted-foreground text-xs">Date</p>
            <p className="font-semibold text-foreground">{patent.date}</p>
          </div>
          <div className="text-border">•</div>
          <Badge
            variant="outline"
            className="bg-accent/10 border-accent/30 text-accent"
          >
            {patent.category}
          </Badge>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-accent/20 mt-6 mb-6">
          {["overview", "specs", "applications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-accent/70 uppercase tracking-wider mb-3">
                  Description
                </h4>
                <p className="text-foreground/80 leading-relaxed">
                  {patent.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-accent/70 uppercase tracking-wider mb-3">
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {patent.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-foreground/80"
                    >
                      <span className="text-accent/60 mt-1 flex-shrink-0">
                        ◆
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "specs" && patent.specifications && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-accent/70 uppercase tracking-wider">
                Technical Specifications
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(patent.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-3 rounded-lg bg-background/50 border border-accent/10"
                  >
                    <p className="text-xs font-mono text-accent/60 mb-1">
                      {key}
                    </p>
                    <p className="text-sm text-foreground font-semibold">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "applications" && patent.applications && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-accent/70 uppercase tracking-wider">
                Applications
              </h4>
              <ul className="space-y-2">
                {patent.applications.map((app, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-foreground/80 p-3 rounded-lg bg-background/50 border border-accent/10"
                  >
                    <span className="text-accent/60 mt-1 flex-shrink-0">
                      →
                    </span>
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-accent/20 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-accent/30 text-accent hover:bg-accent/10"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
