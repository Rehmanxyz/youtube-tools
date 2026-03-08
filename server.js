const express = require("express");
const ytdl = require("@distube/ytdl-core");

const app = express();

// Serve frontend files
app.use(express.static("public"));

// Downloader API
app.get("/download", async (req, res) => {
  try {

    const url = req.query.url;

    if (!url) {
      return res.status(400).json({ error: "No URL provided" });
    }

    // Validate YouTube link
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    // Get video info
    const info = await ytdl.getInfo(url);

    // Get formats with both video and audio
    const formats = ytdl.filterFormats(info.formats, "videoandaudio");

    // Limit results to avoid huge responses
    const downloadFormats = formats.slice(0, 6).map(f => ({
      quality: f.qualityLabel || "Auto",
      url: f.url
    }));

    res.json({
      title: info.videoDetails.title,
      id: info.videoDetails.videoId,
      channel: info.videoDetails.author.name,
      duration: info.videoDetails.lengthSeconds,
      formats: downloadFormats
    });

  } catch (error) {

    console.error("Downloader error:", error);

    res.status(500).json({
      error: "Failed to fetch video info. Try another video."
    });

  }
});

// Root test route
app.get("/api-test", (req, res) => {
  res.json({ status: "Server working" });
});

// Railway port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});