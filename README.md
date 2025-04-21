# Injection Sentinel AI

A robust system for detecting prompt injection attacks in AI systems.

## About the Project

Injection Sentinel AI is a tool designed to analyze prompts sent to AI systems to detect potential security threats, particularly prompt injection attacks. It consists of a Rust backend for analysis and a modern React frontend for user interaction.

## Project Structure

- **Backend (BE/)**: A Rust-based API server using Axum framework
  - Analyzes input prompts for potential security threats
  - Implements pattern matching and heuristic detection rules
  - Provides a REST API for the frontend

- **Frontend (FE/)**: A React application built with Vite, TypeScript, and Tailwind CSS
  - Modern UI with shadcn/ui components
  - Form for submitting prompts for analysis
  - Visualization of analysis results

## Getting Started

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (for backend)
- [Node.js](https://nodejs.org/) (for frontend)
- [Git](https://git-scm.com/downloads)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rustix69/PromptInjector
   cd PromptInjector
   ```

2. Start the backend:
   ```bash
   cd BE
   cargo run
   ```
   The backend server will start at http://127.0.0.1:8080

3. Start the frontend:
   ```bash
   cd FE
   npm i
   npm run dev
   ```
   The frontend development server will start and open in your browser.

## Features

- Real-time analysis of user prompts
- Detection of common prompt injection patterns
- Detailed reporting of potential threats
- Beautiful and user-friendly interface

## How It Works

The system uses pattern matching, regex rules, and heuristic detection to identify potentially malicious prompts. The backend provides an API endpoint that the frontend uses to submit prompts for analysis.

Key components:
- **Rules Engine**: Applies detection rules to identify suspicious patterns
- **Analysis API**: Processes prompts and returns detection results
- **UI Dashboard**: Visualizes analysis results in an easy-to-understand format

## Technologies Used

### Backend
- Rust
- Axum web framework
- Tokio async runtime
- Regex for pattern matching

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router
- React Query

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [OpenAI](https://openai.com/) for research on prompt injection techniques
- [Rust](https://www.rust-lang.org/) for providing a high-performance language for the backend
- [React](https://reactjs.org/) for frontend development 