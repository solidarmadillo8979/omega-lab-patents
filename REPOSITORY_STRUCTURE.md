# Omega Lab Patent Reservoir - Repository Structure

This document describes the complete structure of the Omega Lab Patent Reservoir repository, helping contributors and users navigate and understand the organization of patents, documentation, specifications, and technical resources.

---

## Top-Level Directory Structure

```
omega-lab-patents/
├── README.md                          # Main repository documentation
├── CONTRIBUTING.md                    # Contribution guidelines
├── CODE_OF_CONDUCT.md                 # Community standards and ethics
├── LICENSE                            # MIT License
├── REPOSITORY_STRUCTURE.md            # This file
│
├── patents/                           # All patent documentation and specifications
│   └── OL-2023-0814/                 # Acousto-Resonant Biometric Attuner
│       ├── README.md                  # Patent overview and summary
│       ├── blueprints/                # Technical drawings and schematics
│       ├── specifications/            # Detailed technical specifications
│       ├── technical-docs/            # Testing, validation, algorithms
│       └── assembly-guides/           # Fabrication and assembly instructions
│
├── docs/                              # General documentation and guides
│   ├── framework/                     # OMEGA Protocol framework documentation
│   └── guides/                        # How-to guides and tutorials
│
├── licenses/                          # License files and legal documentation
│
├── client/                            # Frontend React application
│   ├── src/
│   │   ├── pages/                    # Page components
│   │   ├── components/               # Reusable UI components
│   │   ├── lib/                      # Utility functions
│   │   └── index.css                 # Global styles
│   └── public/                        # Static assets
│
├── server/                            # Backend Express server
│   ├── routes/                        # API routes
│   └── index.ts                       # Server entry point
│
├── .github/                           # GitHub configuration
│   ├── ISSUE_TEMPLATE/               # Issue templates
│   │   ├── 01-new-patent-proposal.md
│   │   ├── 02-bug-report.md
│   │   └── 03-feature-request.md
│   └── workflows/                     # GitHub Actions (if enabled)
│
├── .gitignore                         # Git ignore rules
├── package.json                       # Project dependencies
├── tsconfig.json                      # TypeScript configuration
└── vite.config.ts                     # Vite build configuration
```

---

## Detailed Directory Descriptions

### `/patents/` - Patent Repository

The `patents/` directory contains all open-source patent documentation, organized by patent number.

**Structure**:
```
patents/
├── OL-2023-0814/                      # Patent number as directory name
│   ├── README.md                      # Patent overview and summary
│   ├── blueprints/                    # Technical drawings
│   │   ├── FIG-1-overall-device.pdf
│   │   ├── FIG-2-resonant-transducer-array.pdf
│   │   ├── FIG-3-frequency-generator-core.pdf
│   │   ├── FIG-4-biometric-sensor-pad.pdf
│   │   └── [additional blueprints]
│   │
│   ├── specifications/                # Technical specifications
│   │   ├── TECHNICAL_SPECS.md         # Complete technical data sheet
│   │   ├── BILL_OF_MATERIALS.md       # Component list and sourcing
│   │   ├── ELECTRICAL_SPECS.md        # Electrical characteristics
│   │   └── ACOUSTIC_SPECS.md          # Acoustic performance data
│   │
│   ├── technical-docs/                # Testing and validation
│   │   ├── TESTING_PROTOCOLS.md       # Test procedures and methods
│   │   ├── VALIDATION_DATA.md         # Test results and measurements
│   │   ├── ALGORITHMS.md              # Mathematical formulas and algorithms
│   │   ├── SAFETY_PROTOCOLS.md        # Safety guidelines and procedures
│   │   └── CALIBRATION_GUIDE.md       # Calibration procedures
│   │
│   └── assembly-guides/               # Fabrication and assembly
│       ├── FABRICATION_GUIDE.md       # Step-by-step fabrication
│       ├── ASSEMBLY_INSTRUCTIONS.md   # Assembly procedures
│       ├── COMPONENT_SOURCING.md      # Where to find components
│       ├── TOOLS_REQUIRED.md          # Required tools and equipment
│       └── TROUBLESHOOTING.md         # Common issues and solutions
│
└── [future patents...]                # Additional patents follow same structure
```

**Purpose**: Each patent has its own directory containing all technical documentation, blueprints, specifications, and assembly guides needed to understand and build the invention.

---

### `/docs/` - General Documentation

The `docs/` directory contains framework documentation, guides, and educational materials.

**Structure**:
```
docs/
├── framework/                         # OMEGA Protocol framework
│   ├── SCIENTIST_GEM_OVERVIEW.md     # Introduction to Scientist Gem
│   ├── ELEMENTAL_EXPANSION.md        # Elemental framework (Fire/Earth/Air/Water)
│   ├── NOMADIC_METHODOLOGY.md        # Nomadic scientist approach
│   ├── INTERDISCIPLINARY_SYNTHESIS.md # Knowledge integration
│   └── NEUTRAL_UTILITY.md            # Ethical framework
│
└── guides/                            # How-to guides and tutorials
    ├── GETTING_STARTED.md            # Quick start guide
    ├── FABRICATION_BASICS.md         # Introduction to fabrication
    ├── BIOMETRIC_INTEGRATION.md      # Biometric sensor guide
    ├── FREQUENCY_THEORY.md           # Acoustic frequency basics
    └── TROUBLESHOOTING.md            # Common issues and solutions
```

**Purpose**: Educational materials and framework documentation to help users understand the OMEGA Protocol philosophy and get started with the project.

---

### `/licenses/` - Legal Documentation

The `licenses/` directory contains all license files and legal documentation.

**Structure**:
```
licenses/
├── MIT.txt                            # MIT License full text
├── PATENT_TERMS.md                    # Patent-specific terms
├── RECIPROCITY_CLAUSE.md              # Commercial use terms
└── ATTRIBUTION_GUIDE.md               # How to properly attribute work
```

**Purpose**: Legal documentation ensuring proper licensing and attribution for all patents and contributions.

---

### `/client/` - Frontend Application

The `client/` directory contains the React-based web interface for the Patent Reservoir.

**Key Files**:
- `src/pages/Home.tsx` - Main patent gallery and browser
- `src/components/PatentCard.tsx` - Individual patent display
- `src/components/ImageGallery.tsx` - Blueprint image viewer
- `src/components/AdminEditor.tsx` - Creator-only patent editor
- `src/index.css` - Global styling and design tokens

**Purpose**: User-facing web interface for browsing patents, viewing blueprints, and managing patent information.

---

### `/server/` - Backend Application

The `server/` directory contains the Express.js backend server.

**Key Files**:
- `index.ts` - Server entry point
- `routes/sync.ts` - GitHub and Google Drive sync endpoints

**Purpose**: Backend API for patent management, syncing, and data persistence.

---

### `/.github/` - GitHub Configuration

The `.github/` directory contains GitHub-specific configuration and workflows.

**Structure**:
```
.github/
├── ISSUE_TEMPLATE/
│   ├── 01-new-patent-proposal.md     # Template for proposing new patents
│   ├── 02-bug-report.md              # Template for reporting bugs
│   └── 03-feature-request.md         # Template for requesting features
│
└── workflows/                         # GitHub Actions (if enabled)
    └── [CI/CD workflows]
```

**Purpose**: Standardized issue templates and GitHub Actions workflows for community contribution and automation.

---

## File Naming Conventions

### Patent Directories

Patent directories follow the naming convention: `OL-YYYY-NNNN`

- `OL` = Omega Lab
- `YYYY` = Year of filing
- `NNNN` = Sequential number

**Example**: `OL-2023-0814` (Acousto-Resonant Biometric Attuner, filed 2023, patent #0814)

### Documentation Files

Documentation files use descriptive names in UPPERCASE with underscores:

- `README.md` - Overview and summary
- `TECHNICAL_SPECS.md` - Complete technical specifications
- `BILL_OF_MATERIALS.md` - Component list
- `ASSEMBLY_INSTRUCTIONS.md` - Step-by-step assembly
- `TESTING_PROTOCOLS.md` - Test procedures
- `SAFETY_PROTOCOLS.md` - Safety guidelines

### Blueprint Files

Blueprint files follow the naming convention: `FIG-N-description.pdf`

- `FIG-1-overall-device.pdf`
- `FIG-2-resonant-transducer-array.pdf`
- `FIG-3-frequency-generator-core.pdf`
- `FIG-4-biometric-sensor-pad.pdf`

---

## How to Navigate the Repository

### For Patent Researchers

1. Start with `README.md` for project overview
2. Browse `/patents/` directory for available patents
3. Open specific patent's `README.md` for overview
4. Review `/specifications/` for technical details
5. Check `/blueprints/` for technical drawings
6. Read `/assembly-guides/` for fabrication information

### For Builders & Fabricators

1. Read `/docs/guides/GETTING_STARTED.md`
2. Navigate to specific patent directory
3. Review `BILL_OF_MATERIALS.md` for component sourcing
4. Follow `ASSEMBLY_INSTRUCTIONS.md` step-by-step
5. Reference `TROUBLESHOOTING.md` if issues arise
6. Check `SAFETY_PROTOCOLS.md` before starting

### For Researchers & Contributors

1. Read `/docs/framework/` for OMEGA Protocol understanding
2. Review patent specifications in `/specifications/`
3. Study `/technical-docs/` for testing and validation
4. Check `CONTRIBUTING.md` for contribution guidelines
5. Open GitHub issues to propose improvements
6. Submit pull requests with enhancements

### For Developers

1. Review `README.md` for project setup
2. Check `/client/` for frontend code
3. Review `/server/` for backend code
4. See `package.json` for dependencies
5. Run `pnpm dev` to start development server

---

## Adding New Patents

When adding a new patent to the repository:

1. **Create directory**: `patents/OL-YYYY-NNNN/`
2. **Create subdirectories**:
   - `blueprints/`
   - `specifications/`
   - `technical-docs/`
   - `assembly-guides/`
3. **Add documentation**:
   - `README.md` - Patent overview
   - `TECHNICAL_SPECS.md` - Specifications
   - `BILL_OF_MATERIALS.md` - Components
   - Assembly guides and instructions
4. **Add blueprints**: Technical drawings in `/blueprints/`
5. **Update main README**: Add patent to list
6. **Submit pull request**: Follow CONTRIBUTING.md guidelines

---

## Accessing Specific Information

### Finding Technical Specifications

**Location**: `/patents/[PATENT-NUMBER]/specifications/TECHNICAL_SPECS.md`

**Contains**:
- Electrical specifications
- Acoustic specifications
- Biometric sensor specs
- Mechanical specifications
- Environmental specifications
- Performance specifications
- Safety specifications
- Compliance information

### Finding Assembly Instructions

**Location**: `/patents/[PATENT-NUMBER]/assembly-guides/ASSEMBLY_INSTRUCTIONS.md`

**Contains**:
- Step-by-step assembly procedures
- Component preparation
- Assembly sequence
- Calibration procedures
- Testing procedures
- Troubleshooting tips

### Finding Blueprints

**Location**: `/patents/[PATENT-NUMBER]/blueprints/`

**Contains**:
- Technical drawings (PDF format)
- Schematics
- Component layouts
- Assembly diagrams
- Exploded views
- Cross-sections

### Finding Safety Information

**Location**: `/patents/[PATENT-NUMBER]/technical-docs/SAFETY_PROTOCOLS.md`

**Contains**:
- Electrical safety
- Acoustic safety
- Biometric safety
- Operating safety
- Emergency procedures
- Maintenance safety

---

## Repository Statistics

| Category | Count |
|----------|-------|
| Active Patents | 1 (OL-2023-0814) |
| Documentation Files | 15+ |
| Blueprint Figures | 4+ |
| Technical Specifications | 13 sections |
| Assembly Guides | 5+ documents |
| Issue Templates | 3 |
| License Types | 1 (MIT) |

---

## Maintenance & Updates

### Regular Updates

- Patent specifications updated as improvements are validated
- Assembly guides refined based on builder feedback
- Technical documentation expanded with new test data
- Safety protocols updated as needed

### Version Control

All changes are tracked via Git commits with clear messages describing what was updated and why.

### Contribution History

See `git log` for complete history of all changes and contributions.

---

## Getting Help

### Finding Information

1. **Search repository**: Use GitHub search function
2. **Browse structure**: Navigate directories directly
3. **Check README files**: Each directory has a README
4. **Read documentation**: Start with main README.md

### Reporting Issues

1. **Bug reports**: Use `.github/ISSUE_TEMPLATE/02-bug-report.md`
2. **Feature requests**: Use `.github/ISSUE_TEMPLATE/03-feature-request.md`
3. **New patents**: Use `.github/ISSUE_TEMPLATE/01-new-patent-proposal.md`

### Contributing

See `CONTRIBUTING.md` for detailed guidelines on how to contribute to the project.

---

## Document Information

**Version**: 1.0  
**Date**: May 2, 2026  
**Maintained by**: Prèneurs de Risques Frameworks  
**Status**: Active

---

*For questions about repository structure, please open an issue or contact the maintainers.*
