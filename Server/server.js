const path = require("path");
const bodyparser = require("body-parser");
const express = require("express");
const app = express();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const port = 8080;

const bitlyToken = "6a5c81aaf8d99077f65e97660ead7feb74402701";

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const root = require("path").join(__dirname, "dist");
app.use(express.static(root));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
  next();
});

app.post("/short", async (req, res, next) => {
  let longURL = req.body.userInput;

  try {
    const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${bitlyToken}`, //prettier-ignore
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ long_url: longURL, domain: "bit.ly" }),
    });

    const json = await response.json();

    res.json({ shortURL: json.link });
  } catch (error) {
    return next(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
