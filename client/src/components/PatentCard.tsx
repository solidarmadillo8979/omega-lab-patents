import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface PatentCardProps {
  patentNumber: string;
  title: string;
  inventor: string;
  date: string;
  description: string;
  category: string;
  features: string[];
  onClick?: () => void;
}

export default function PatentCard({
  patentNumber,
  title,
  inventor,
  date,
  description,
  category,
  features,
  onClick,
}: PatentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="glow-accent relative overflow-hidden border border-accent/30 bg-card/60 backdrop-blur-sm transition-all duration-500 cursor-pointer hover:border-accent/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Background resonance pattern */}
      <div className="absolute inset-0 opacity-5 resonance-pattern pointer-events-none" />

      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-xs font-mono text-accent/70 mb-1">
                {patentNumber}
              </p>
              <h3 className="text-xl font-bold text-foreground leading-tight">
                {title}
              </h3>
            </div>
            <ChevronRight
              className={`w-5 h-5 text-accent/50 transition-transform duration-500 flex-shrink-0 ${
                isHovered ? "translate-x-1" : ""
              }`}
            />
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="font-mono text-xs">{date}</span>
          <span className="text-border">•</span>
          <span className="text-xs">{inventor}</span>
        </div>

        {/* Category Badge */}
        <div>
          <Badge
            variant="outline"
            className="bg-accent/10 border-accent/30 text-accent hover:bg-accent/20"
          >
            {category}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/80 line-clamp-2">
          {description}
        </p>

        {/* Features */}
        <div className="pt-2 space-y-2">
          <p className="text-xs font-semibold text-accent/70 uppercase tracking-wider">
            Key Features
          </p>
          <ul className="space-y-1">
            {features.slice(0, 2).map((feature, idx) => (
              <li
                key={idx}
                className="text-xs text-foreground/70 flex items-start gap-2"
              >
                <span className="text-accent/50 mt-1">◆</span>
                <span>{feature}</span>
              </li>
            ))}
            {features.length > 2 && (
              <li className="text-xs text-accent/60 italic">
                +{features.length - 2} more features
              </li>
            )}
          </ul>
        </div>

        {/* Hover indicator */}
        {isHovered && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0" />
        )}
      </div>
    </Card>
  );
}
