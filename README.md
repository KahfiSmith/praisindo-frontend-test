# NYTimes Articles Viewer

A modern React application that allows users to search and browse articles from The New York Times API.

## Features

- Browse latest articles from The New York Times
- Search for articles by keywords
- Responsive design for mobile and desktop
- Clean and modern UI with Tailwind CSS
- Error handling and loading states

## Tech Stack

- **React 18** - Frontend library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - API requests
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible UI components

## Project Structure

```
src/
├── components/       # React components
│   ├── ui/           # Base UI components
│   └── CardArticles.tsx  # Article card component
│
├── lib/              # Helper functions and utilities
│   ├── api/          # API integration
│   └── utils/        # Utility functions
│
├── pages/            # Application pages
│   ├── index.tsx     # Home page with article listing
│   └── NotFound.tsx  # 404 page
│
├── types/            # TypeScript type definitions
│
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with your NYTimes API key
```
VITE_NYT_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## API Integration

This project uses The New York Times Article Search API. You'll need to:

1. Register for an API key at [NYTimes Developer Portal](https://developer.nytimes.com/)
2. Create API keys for the Article Search API
3. Add your key to the `.env` file as described above

## Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
