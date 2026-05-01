import PatentCard from "@/components/PatentCard";
import PatentDetail from "@/components/PatentDetail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

// Patent data
const PATENTS = [
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
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663397941366/DS28yntjihf5rJrwrTnubw/device-illustration-crnwStg6jGYtQGdcFC5NKD.webp",
  },
];

export default function Home() {
  const [selectedPatent, setSelectedPatent] = useState<(typeof PATENTS)[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  // Filter patents based on search and category
  const filteredPatents = PATENTS.filter((patent) => {
    const matchesSearch =
      searchQuery === "" ||
      patent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.patentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === null || patent.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(PATENTS.map((p) => p.category)));

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
              Manifest Scientific Tools
              <br />
              <span className="text-accent">from the Unseen</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              A digital repository for interdisciplinary inventions by{" "}
              <span className="text-accent font-semibold">Prèneurs de Risques CORP</span>,
              documenting the transition from knowledge carrier to active operator
              through the Scientist Gem | OMEGA Protocol.
            </p>

            {/* CTA */}
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-accent/20 border border-accent/50 text-accent hover:bg-accent/30 hover:border-accent/70 transition-all duration-300"
              >
                Explore Patents
              </Button>
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
              Explore the documented inventions of the Omega Lab. Each patent
              represents a breakthrough in interdisciplinary science, combining
              rigorous methodology with esoteric mastery.
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
                <PatentCard
                  key={patent.patentNumber}
                  {...patent}
                  onClick={() => setSelectedPatent(patent)}
                />
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

      {/* Framework Section */}
      <section className="py-20 bg-card/30 border-t border-accent/10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Framework Pillar 1 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
                <span className="text-accent font-bold text-lg">◆</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Scientific Rigor
              </h3>
              <p className="text-foreground/70">
                Each patent undergoes rigorous documentation and testing,
                combining traditional scientific methodology with advanced
                interdisciplinary approaches.
              </p>
            </div>

            {/* Framework Pillar 2 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
                <span className="text-accent font-bold text-lg">◆</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Nomadic Application
              </h3>
              <p className="text-foreground/70">
                Designed for the Nomad-Scientist, these tools manifest from
                urban waste streams and elemental manipulation, enabling
                portable scientific mastery.
              </p>
            </div>

            {/* Framework Pillar 3 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
                <span className="text-accent font-bold text-lg">◆</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Esoteric Integration
              </h3>
              <p className="text-foreground/70">
                Bridging ancient knowledge with modern science, exploring the
                mechanisms behind the seen and unseen through frequency,
                resonance, and harmonic principles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 bg-background py-12">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <p className="text-foreground/60 text-sm">
            © 2023 Prèneurs de Risques CORP. All patents documented under the
            Scientist Gem | OMEGA Protocol.
          </p>
          <p className="text-accent/50 text-xs mt-4 font-mono">
            Omega Lab Patent Reservoir v1.0
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
    </div>
  );
}
