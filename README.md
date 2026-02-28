# Lord of the Rings Personality Quiz

**Version 1 (Experimental Personality Classifier)**

## Overview

This is a static, frontend-only Lord of the Rings personality quiz web application. By answering a series of carefully crafted scenario-based questions, you generate a unique profile across four distinct behavioral axes. Based on these decisions, the engine determines which iconic Middle-earth character best matches your innate decision-making style.

Built purely with vanilla HTML, CSS, and JavaScript, it requires no backend infrastructure, no external libraries, and runs entirely in the browser.

## The Four Behavioral Axes

The underlying scoring mechanism evaluates responses across four dimensions:

1. **Power (P):** Your drive to exert control, achieve supremacy, and shape events to your will.
2. **Strategy (S):** Your reliance on intellect, careful planning, foresight, and systematic thinking.
3. **Attachment (A):** Your capacity for deep loyalty, empathy, and bonds to individuals or an ideal.
4. **Impulse (I):** Your tendency to act on instinct, immediate emotion, and untethered desire without forethought.

## Character Classifications

The characters in this quiz are determined by identifying distinct combinations of the four behavioral axes. Rather than treating personality as a simple "good vs. evil" binary, the resulting archetype reflects the complex intersection of your drives.

### Deterministic Engine

The classification engine is completely deterministic and rule-based. It does not employ randomized outcomes; identical answers will always yield the identical character outcome by following a specific evaluation order and strict threshold checking. 

*Note: For the sake of preserving quiz integrity and preventing gaming the system, the exact numeric thresholds, condition logic, and algorithmic gate ordering are intentionally excluded from this documentation.*

## Getting Started (Local Development)

Because this application does not use external APIs or build tools, running it is extremely simple:

1. Clone or download this repository.
2. Open the project folder in your terminal.
3. Start a local HTTP server. For example, if you have Python installed:
   ```bash
   python -m http.server 8080
   ```
4. Open your browser and navigate to `http://localhost:8080`.

*(Optional) Debug Mode: You can append `?debug=true` to the URL (e.g., `http://localhost:8080/?debug=true`) to enable a developer console view that reveals your final scores across the four axes.*

## Deployment via GitHub Pages

This app is ready to be deployed to GitHub Pages out of the box:

1. Create a new repository on GitHub and push this code.
2. Navigate to your repository's **Settings**.
3. Under the **Code and automation** section in the left sidebar, click on **Pages**.
4. In the **Build and deployment** area, ensure the **Source** is set to "Deploy from a branch".
5. Select the `main` (or `master`) branch and the `/ (root)` folder, then click **Save**.
6. Wait a few moments for the Github Actions build to complete, and your quiz will be live at `https://<your-username>.github.io/<your-repo-name>/`!

## Security & Architecture Notes

- **XSS Mitigated:** Output strictly relies on `textContent` to prevent script execution vectors through user-driven logic.
- **Encapsulated Scope:** JavaScript logic is securely isolated within an Immediately Invoked Function Expression (IIFE) running in `strict` mode to prevent global scope pollution.
- **Zero-Dependency:** Lean architecture built exclusively using static native web standards.
