import ImageGallery from "@/components/ImageGallery";
import PatentCard from "@/components/PatentCard";
import PatentEditor from "@/components/PatentEditor";
import PatentDetail from "@/components/PatentDetail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit2, Github, Search } from "lucide-react";
import { useState } from "react";

// Patent data with blueprint images
const INITIAL_PATENTS = [
  {
    patentNumber: "OL-2023-0814",
    title: "Acousto-Resonant Biometric Attuner and Self-Defense Frequency Modulator",
    inventor: "Prèneurs de Risques CORP",
    date: "AUGUST 14, 2023",
    description:
      "A portable device designed for both meditative attunement and defensive pulse generation. The Acousto-Resonant Biometric Attuner (ARBA) reads and harmonizes with the unique resonant signature of an individual, converting biometric data into acoustic resonance for attuning systems, seals, and devices to the operator's identity.",
    category: "Acoustics & Resonance",
    features: [
      "Resonant Transducer Array for focused or unfocused frequency output",
      "Biometric Sensor Pad for input attunement and operator identification",
      "Variable Frequency Generator Core with harmonic amplifier",
      "Dual-mode operation: Meditative Attunement and Defensive Pulse",
      "Nomad-Scientist Bag Interface for portable lab integration",
      "Integrated high-capacity battery system",
    ],
    specifications: {
      "Frequency Range": "20 Hz – 20 kHz",
      "Output Power": "10 – 500 Watts",
      "Transducer Material": "Quartz (Piezoelectric)",
      "Chamber Material": "Copper / Brass Alloy",
      "Power Input": "DC 12V – 48V",
      "Dimensional Ratio (H:W)": "1:618",
      "Resonance Precision": "±0.7 Hz",
      "Interface": "Nomad Bag Port (NBP-7)",
    },
    applications: [
      "Harmonic identification and biometric authentication systems",
      "Meditative frequency attunement for consciousness exploration",
      "Acoustic resonance-based self-defense mechanisms",
      "Nomadic laboratory calibration and frequency standardization",
      "Integration with elemental manipulation systems",
      "Research into frequency-based communication protocols",
    ],
    blueprintImages: [
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663397941366/DS28yntjihf5rJrwrTnubw/blueprint-original-arba.png",
        label: "Original Blueprint",
        description:
          "Your original technical drawing of the Acousto-Resonant Biometric Attuner showing all components and assembly.",
      },
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663397941366/DS28yntjihf5rJrwrTnubw/blueprint-iteration-1-exploded-TdzadUNqBw2HnL9qvCfoK9.webp",
        label: "Exploded View Iteration",
        description:
          "AI-generated exploded view showing component separation and assembly sequence with detailed annotations.",
      },
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663397941366/DS28yntjihf5rJrwrTnubw/blueprint-iteration-2-cross-section-P5ovB7pHLxX4mfcVHCXGu4.webp",
        label: "Cross-Section Analysis",
        description:
          "Vertical and horizontal cross-sections revealing internal mechanisms and component arrangement.",
      },
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663397941366/DS28yntjihf5rJrwrTnubw/blueprint-iteration-3-schematic-3riyrx4A69LJbrYaWhiDfx.webp",
        label: "System Schematic",
        description:
          "Detailed electrical and acoustic schematic with circuit diagrams and resonance patterns.",
      },
      {
        url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663397941366/DS28yntjihf5rJrwrTnubw/blueprint-iteration-4-assembly-dyQo2eddVK7sjjuqsPRi2J.webp",
        label: "Assembly Guide",
        description:
          "Step-by-step assembly blueprint with construction sequence and detailed component placement.",
      },
    ],
  },
];

export default function Home() {
  const [patents, setPatents] = useState(INITIAL_PATENTS);
  const [selectedPatent, setSelectedPatent] = useState<(typeof INITIAL_PATENTS)[0] | null>(null);
  const [editingPatent, setEditingPatent] = useState<(typeof INITIAL_PATENTS)[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  // Filter patents based on search and category
  const filteredPatents = patents.filter((patent) => {
    const matchesSearch =
      searchQuery === "" ||
      patent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.patentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === null || patent.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(patents.map((p) => p.category)));

  const handleSavePatent = (updatedPatent: any) => {
    setPatents(
      patents.map((p) =>
        p.patentNumber === updatedPatent.patentNumber ? updatedPatent : p
      )
    );
    setEditingPatent(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663397941366/DS28yntjihf5rJrwrTnubw/hero-background-dNGbQN5UhR87ubyky9gheL.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 container max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="space-y-6 animate-fade-in">
            {/* Badge */}
            <div className="inline-block">
              <div className="px-4 py-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm">
                <p className="text-xs font-mono text-accent tracking-widest">
                  OMEGA LAB PATENT RESERVOIR
                </p>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-7xl font-bold leading-tight text-foreground">
              Open-Source
              <br />
              <span className="text-accent">Scientific Discovery</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              A collaborative repository for interdisciplinary inventions by{" "}
              <span className="text-accent font-semibold">Prèneurs de Risques CORP</span>.
              All patents are <span className="text-accent font-semibold">open-source</span> to
              accelerate global scientific progress and enable the world to build
              towards these discoveries.
            </p>

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent/20 border border-accent/50 text-accent hover:bg-accent/30 hover:border-accent/70 transition-all duration-300"
              >
                Explore Patents
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent/30 text-accent hover:bg-accent/10"
              >
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </Button>
            </div>

            {/* Open Source Badge */}
            <div className="pt-8">
              <Badge className="bg-accent/20 border border-accent/50 text-accent hover:bg-accent/30">
                ⚡ Open Source • MIT License • Community Driven
              </Badge>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-accent/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Frequency Divider */}
      <section className="relative h-32 overflow-hidden">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663397941366/DS28yntjihf5rJrwrTnubw/frequency-visualization-eRKkeisdSUBDgh4VrDWyai.webp"
          alt="Frequency visualization"
          className="w-full h-full object-cover opacity-60"
        />
      </section>

      {/* Patent Gallery Section */}
      <section className="py-20 bg-background">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-foreground">
              Patent Reservoir
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Explore open-source blueprints and technical documentation. Every
              patent includes your original blueprint and AI-generated iterations
              to accelerate collaborative development.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent/50" />
              <Input
                placeholder="Search patents by title, number, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-card/50 border-accent/20 text-foreground placeholder:text-muted-foreground focus:border-accent/50 focus:ring-accent/30"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterCategory === null
                    ? "bg-accent text-background"
                    : "bg-card/50 border border-accent/20 text-foreground hover:border-accent/50"
                }`}
              >
                All Categories
              </button>
              {categories.map((category: string) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filterCategory === category
                      ? "bg-accent text-background"
                      : "bg-card/50 border border-accent/20 text-foreground hover:border-accent/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Patent Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {filteredPatents.length > 0 ? (
              filteredPatents.map((patent) => (
                <div
                  key={patent.patentNumber}
                  className="space-y-4 p-6 rounded-lg border border-accent/20 bg-card/30 backdrop-blur-sm"
                >
                  {/* Patent Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-mono text-accent/70 mb-2">
                        {patent.patentNumber}
                      </p>
                      <h3 className="text-2xl font-bold text-foreground">
                        {patent.title}
                      </h3>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingPatent(patent)}
                      className="border-accent/30 text-accent hover:bg-accent/10"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Blueprint Gallery */}
                  <div className="my-6">
                    <ImageGallery
                      images={patent.blueprintImages}
                      title="Blueprint Gallery"
                    />
                  </div>

                  {/* Patent Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Inventor</p>
                      <p className="font-semibold text-foreground">
                        {patent.inventor}
                      </p>
                    </div>
                    <div className="text-border">•</div>
                    <div>
                      <p className="text-muted-foreground text-xs">Date</p>
                      <p className="font-semibold text-foreground">
                        {patent.date}
                      </p>
                    </div>
                    <div className="text-border">•</div>
                    <Badge
                      variant="outline"
                      className="bg-accent/10 border-accent/30 text-accent"
                    >
                      {patent.category}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/80 leading-relaxed">
                    {patent.description}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-accent/70 uppercase tracking-wider">
                      Key Features
                    </p>
                    <ul className="space-y-1">
                      {patent.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-foreground/70 flex items-start gap-2"
                        >
                          <span className="text-accent/50 mt-0.5">◆</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                      {patent.features.length > 3 && (
                        <li className="text-sm text-accent/60 italic">
                          +{patent.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => setSelectedPatent(patent)}
                      className="flex-1 bg-accent/20 border border-accent/50 text-accent hover:bg-accent/30"
                    >
                      View Full Details
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-foreground/60">
                  No patents found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-20 bg-card/30 border-t border-accent/10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
                <span className="text-accent font-bold text-lg">◆</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Open Source
              </h3>
              <p className="text-foreground/70">
                All patents are released under open-source licenses to enable
                global collaboration and accelerate scientific discovery.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
                <span className="text-accent font-bold text-lg">◆</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Editable & Updatable
              </h3>
              <p className="text-foreground/70">
                Update patent details as you refine designs and confirm
                functionality. Your iterations are visible to the global
                community.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
                <span className="text-accent font-bold text-lg">◆</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Blueprint Gallery
              </h3>
              <p className="text-foreground/70">
                Your original blueprints plus AI-generated iterations provide
                multiple perspectives for builders and researchers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 bg-background py-12">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <p className="text-foreground/60 text-sm">
            © 2023 Prèneurs de Risques CORP. All patents released as open-source
            to accelerate scientific discovery.
          </p>
          <p className="text-accent/50 text-xs mt-4 font-mono">
            Omega Lab Patent Reservoir v2.0 • Open Source • MIT License
          </p>
        </div>
      </footer>

      {/* Patent Detail Modal */}
      {selectedPatent && (
        <PatentDetail
          isOpen={!!selectedPatent}
          onClose={() => setSelectedPatent(null)}
          patent={selectedPatent}
        />
      )}

      {/* Patent Editor Modal */}
      {editingPatent && (
        <PatentEditor
          isOpen={!!editingPatent}
          onClose={() => setEditingPatent(null)}
          patent={editingPatent}
          onSave={handleSavePatent}
        />
      )}
    </div>
  );
}
