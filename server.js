const express = require("express");
const cors = require("cors");
const ytdl = require("@distube/ytdl-core");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/download", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.json({ error: "No URL provided" });
  }

  if (!ytdl.validateURL(url)) {
    return res.json({ error: "Invalid YouTube URL" });
  }

  try {
    const info = await ytdl.getInfo(url);

    const formats = ytdl.filterFormats(info.formats, "videoandaudio");

    res.json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails.pop().url,
      channel: info.videoDetails.author.name,
      duration: info.videoDetails.lengthSeconds,
      formats: formats.slice(0, 5).map(f => ({
        quality: f.qualityLabel || "Auto",
        url: f.url
      }))
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching video" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});