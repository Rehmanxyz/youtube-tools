const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/health", (req, res) => {
  res.send("OK");
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
      thumbnail: info.videoDetails.thumbnails?.[0]?.url || "",
      channel: info.videoDetails.author?.name || "Unknown",
      duration: info.videoDetails.lengthSeconds,
      formats: formats.slice(0,5).map(f => ({
        quality: f.qualityLabel || "Auto",
        url: f.url
      }))
    });

  } catch (error) {

    console.error("Download error:", error);

    res.status(500).json({
      error: "Failed to fetch video"
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});