# Block Shear Analyzer

Professional block shear failure analysis tool for bolted connections following BS 5950 standards.

## 🎓 Project Info

- **Course:** CVE505 - Design of Steel Structures
- **Focus:** Block shear analysis in bolted connections
- **Standard:** BS 5950-1:2000
- **Tech Stack:** React + Vite + Tailwind CSS + FastAPI (backend planned)

## ✨ Features

### Current Features (Frontend Phase 1)
- ✅ **Three Input Modes:**
  - Manual parameter entry
  - AI-powered text question parsing (mocked)
  - Image upload with AI extraction (mocked)
  
- ✅ **Comprehensive Analysis:**
  - Step-by-step block shear calculations
  - BS 5950 clause references
  - Interactive clause browser with full standard text
  - Pass/fail verdicts with utilization ratios

- ✅ **User Experience:**
  - Guest mode (no login required)
  - User accounts with calculation history (frontend ready)
  - Responsive design for all devices
  - Print/export functionality

- ✅ **Coverage:**
  - All bolted connection types per BS 5950
  - Ordinary bolts (Grade 4.6 and 8.8)
  - Bearing-type, slip-resistant, and tension connections

### Planned Features (Phase 2 & 3)
- 🔄 Backend API with FastAPI
- 🔄 Real AI integration (Claude API for question parsing)
- 🔄 Database storage (MongoDB for user data, PostgreSQL for clauses)
- 🔄 Advanced calculations (multiple failure modes)
- 🔄 PDF report generation
- 🔄 Connection diagrams/visualizations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
blockshear-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   └── ClauseCard.jsx
│   ├── pages/              # Main application pages
│   │   ├── HomePage.jsx
│   │   ├── AnalyzePage.jsx
│   │   ├── ResultsPage.jsx
│   │   ├── ClausesPage.jsx
│   │   ├── HistoryPage.jsx
│   │   └── AuthPages.jsx
│   ├── data/               # Mock data and clause database
│   │   ├── clauses.js      # BS 5950 clause content
│   │   └── mockData.js     # Sample calculations
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles + Tailwind
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
└── postcss.config.js      # PostCSS config
```

## 🎨 Design Philosophy

### Color Palette
- **Steel grays:** Professional engineering aesthetic
- **Accent blue:** Primary actions and links
- **Green/Red:** Pass/fail indicators
- **Orange:** Warnings and highlights

### Typography
- **Inter:** Clean, modern sans-serif for UI
- **JetBrains Mono:** Technical content and formulas

### Components
- Custom button styles (primary, secondary, ghost)
- Card layouts with hover effects
- Badge system for tags and status
- Engineering-focused formula displays

## 📚 BS 5950 Implementation

### Covered Clauses
- **Clause 6.2:** Design strength of bolts
- **Clause 6.2.4:** Block shear failure
- **Clause 6.3.2:** Spacing and edge distances
- **Clause 3.4.3:** Net area calculations
- **Clause 4.6:** Tension members
- **Table 32:** Bolt strength values

### Block Shear Calculation

The app implements the two failure modes per BS 5950 Clause 6.2.4:

**Mode 1:** Shear yielding + Tension rupture
```
Pbs1 = 0.6 × py × Av + py × At
```

**Mode 2:** Shear rupture + Tension rupture
```
Pbs2 = fu × Av + 0.5 × fu × Atn
```

Design capacity: `Pbs = min(Pbs1, Pbs2)`

## 🔧 Development Notes

### Current State
This is **Phase 1** - frontend with mocked data. All calculations use simplified formulas and dummy AI responses.

### Mock Data Locations
- `src/data/clauses.js` - BS 5950 clause database
- `src/data/mockData.js` - Sample calculations and mock AI functions

### Adding New Clauses
Edit `src/data/clauses.js`:
```javascript
export const bs5950Clauses = {
  "X.X.X": {
    number: "X.X.X",
    title: "Clause title",
    section: "Section name",
    content: "Full clause text...",
    equation: "Optional equation string",
    references: ["Related clauses"]
  }
}
```

## 🌐 Deployment

### Frontend Deployment
- **Recommended:** Vercel, Netlify, or GitHub Pages
- Build command: `npm run build`
- Output directory: `dist/`

### Backend Deployment (Planned)
- **Recommended:** Railway or Render
- Tech: FastAPI + MongoDB + PostgreSQL
- API will be consumed by this frontend

## 🤝 Contributing

This is an academic project for CVE505. Suggestions and improvements are welcome!

## 📄 License

Educational project - all rights reserved.

## 🙏 Acknowledgments

- BS 5950-1:2000 British Standard
- React, Vite, and Tailwind CSS teams
- Lucide React for icons
- Anthropic Claude for AI integration (planned)

---

**Built with ❤️ for structural engineering education**
