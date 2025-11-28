# AAI Wiki

**A community-driven clinical reference for Allergy, Asthma, and Immunology healthcare professionals.**

[![Deploy Status](https://github.com/M-Pepper/aai-wiki/actions/workflows/deploy.yml/badge.svg)](https://github.com/M-Pepper/aai-wiki/actions)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

**Live Site:** [https://aai.wiki](https://aai.wiki)

---

## 🚀 Overview

AAI Wiki is an open-access, evidence-based medical resource inspired by [kidney.wiki](https://kidney.wiki). It aims to democratize clinical knowledge by providing free, high-quality, and up-to-date information for clinicians.

**Key Features:**
*   **Evidence-Based:** Content grounded in GINA, PRACTALL, and AAAAI/ACAAI guidelines.
*   **Clinical Calculators:** Built-in tools like SCORAD and UAS7.
*   **Fast & Modern:** Built with Docusaurus v3 and React, hosted on Cloudflare Pages.
*   **Open Source:** Community contributions are encouraged and reviewed by experts.

## 🛠️ Tech Stack

*   **Framework:** [Docusaurus v3](https://docusaurus.io/) (React, TypeScript, MDX)
*   **Styling:** CSS Modules + Custom Properties (no Tailwind)
*   **Search:** Algolia DocSearch
*   **Hosting:** Cloudflare Pages
*   **Icons:** [Lucide React](https://lucide.dev/)

## 💻 Local Development

1.  **Prerequisites:** Node.js 18+
2.  **Install Dependencies:**
    ```bash
    cd website
    npm install
    ```
3.  **Start Dev Server:**
    ```bash
    npm start
    ```
    Opens http://localhost:3000

## 🤝 Contributing

We welcome contributions from healthcare professionals, researchers, and developers!

*   **Content:** Fix typos, update guidelines, or write new articles.
*   **Code:** Improve UI, add calculators, or fix bugs.

See the [**Contributing Guide**](https://aai.wiki/contributing) for details on how to get started.

## 📂 Project Structure

```
aai-wiki/
├── website/               # The Docusaurus application
│   ├── docs/              # Clinical content (MDX files)
│   ├── src/               # React components and pages
│   ├── static/            # Images and public assets
│   └── docusaurus.config.ts
├── docs/                  # Project planning & architecture docs
└── README.md              # This file
```

## 📄 License

Content is licensed under [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).
Code is licensed under the MIT License.