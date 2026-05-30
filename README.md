# Beginner URL Shortener

A simple URL shortener web application built with Node.js and Express. This project demonstrates basic web server functionality with an in-memory data store.

The app stores shortened URLs in memory, so links are reset whenever the server restarts. That keeps the code simple and beginner-friendly.

## Project Structure

```
URL-Shortener/
├── server.js          # Main Express server and application logic
├── index.html         # Frontend HTML template
├── package.json       # Project dependencies and scripts
├── package-lock.json  # Locked dependency versions
└── README.md          # This file
```

## Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

## How to Run

Start the server:

```bash
npm start
```

For development with auto-reload (requires nodemon):

```bash
npm run dev
```

Open your browser and navigate to:

```
http://localhost:5000
```

## How It Works

1. The homepage displays a form where users can paste long URLs
2. Submit the URL to generate a unique short code
3. The server creates a random short code and maps it to the original URL
4. Short codes and their mappings are stored in an in-memory object
5. Visiting a short URL (e.g., `http://localhost:5000/abc123`) redirects to the original URL

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Web framework for handling routes and middleware
- **HTML/CSS** - Frontend interface (served inline from server.js)

## Notes

- All URLs are stored in memory and will be lost when the server restarts
- This is ideal for learning and development purposes
- For production use, consider implementing a persistent database
