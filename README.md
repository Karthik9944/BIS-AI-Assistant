# BIS Sahayak — Bureau of Indian Standards AI Assistant

BIS Sahayak is an intelligent, bilingual AI-powered assistant designed for the Bureau of Indian Standards (BIS) that helps manufacturers, MSMEs, exporters, and consumers effortlessly navigate Indian Standards, find applicable compliance schemes, verify test reports against standard parameters, locate certified testing laboratories across India, and track published standards and regulatory updates.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript
- **AI / LLM**: [Groq SDK](https://groq.com/) with high-speed inference (`openai/gpt-oss-120b` / `llama-3.1-70b-versatile`)
- **Data Layer**: Local structured JSON standard registry (`data/standards.json`)

## Getting Started Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the root directory and add your Groq API key:

```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Key Features

1. **Executive Landing Page**: High-impact introductory portal with real BIS dataset metrics (22,000+ standards, 4 certification schemes, MSME-first), 3-step "How it works" overview, and quick module launchers.
2. **Ask a Question**: Natural language Q&A grounded in official Indian Standards with citations, a "Simple Explanation Mode" for non-technical users, and an interactive **"Show Visual Summary"** button powered by Mermaid.js.
3. **Find My Standard**: Product-to-standard recommendation engine identifying mandatory vs. voluntary schemes, related MSME benefits, and on-demand flowchart generation.
4. **Visual Standard Explainer**: Generates live Mermaid.js flowcharts (flowchart TD) illustrating acceptance thresholds for technical standards (e.g. Haritaki limits) or procedural workflows for service standards (e.g. Yoga Centre requirements).
5. **Certification Journey**: Visual 4-step progress tracker for BIS certification lifecycle.
6. **Compliance Check**: Automated pass/fail test report analyzer checking observed lab values against official IS limits.
7. **Find a Lab**: Directory of BIS-recognized testing laboratories with city and specialization details.
8. **Standard Status Tracker**: Filterable directory of all standards with live sector search and alert subscriptions.
9. **Scheme Guide**: Comprehensive visual breakdown of ISI Mark, CRS, Hallmarking, and SDOC.
10. **Bilingual Support & Responsiveness**: Instant toggle between English and Hindi (हिन्दी) with responsive mobile drawer navigation.
11. **About & Architecture Modal**: Clear disclosure of prototype scope and production API integration path with BIS Manak Online.
