const express = require('express');
const app = express();
const PORT = 5000;

// This object is our tiny in-memory database.
const urls ={};

//middleware
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>URL Shortener</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: 40px auto;
            padding: 0 16px;
            line-height: 1.5;
          }

          form {
            display: flex;
            gap: 8px;
            margin-bottom: 24px;
          }

          input {
            flex: 1;
            padding: 10px;
            font-size: 16px;
          }

          button {
            padding: 10px 14px;
            font-size: 16px;
            cursor: pointer;
          }

          a {
            color: #075985;
          }

          .link-row {
            padding: 10px 0;
            border-top: 1px solid #ddd;
          }
        </style>
      </head>
      <body>
        <h1>URL Shortener</h1>

        <form method="POST" action="/shorten">
          <input
            type="url"
            name="longUrl"
            placeholder="Paste an URL"
            required
          />
          <button type="submit">Shorten</button>
        </form>

        <h2>Shortened Links</h2>
        ${renderLinks(req)}
      </body>
    </html>
  `);
});

// Creating short URL

app.post("/shorten", (req, res) => {
    const longUrl = req.body.longUrl;
    const shortUrl = generateShortUrl();

    urls[shortUrl] = longUrl;

    res.redirect("/");
});

// Opening Short URLs

app.get('/:shortUrl', (req,res) => {
    const shortUrl = req.params.shortUrl;
    const longUrl = urls[shortUrl];
    if(!longUrl) {
        return res.status(404).send("Short URL not found.");
    }

    res.redirect(longUrl);
});

function generateShortUrl() {
    return Math.random().toString(36).substring(2,8);
}

function renderLinks(req) {
    const shortUrls = Object.keys(urls);
    if(shortUrls.length === 0){
        return "<p>No shortened URLs yet.</p>";
    }

    return shortUrls.map(shortUrl => {
        const longUrl = urls[shortUrl];
        const shorturl = `${req.protocol}://${req.get("host")}/${shortUrl}`;
        return `
        <div class="link-row">
          <strong>Original:</strong>
          <a href="${longUrl}">${longUrl}</a>
          <br />
          <strong>Short:</strong>
          <a href="/${shortUrl}">${shorturl}</a>
        </div>
      `;
    })
    .join("");
    
}
    

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})