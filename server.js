process.env.YTDL_NO_UPDATE = "1";

console.log("Server starting...");

const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* serve static files */
app.use(express.static(path.join(__dirname, "public")));

/* homepage */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* health check */
app.get("/health", (req, res) => {
  res.send("OK");
});

/* youtube download api */
app.get("/download", async (req, res) => {

  const url = req.query.url;

  if (!url) {
    return res.json({ error: "No URL provided" });
  }

  if (!ytdl.validateURL(url)) {
    return res.json({ error: "Invalid YouTube URL" });
  }

  try {

    const info = await ytdl.getInfo(url, {
      requestOptions: {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept-Language": "en-US,en;q=0.9"
        }
      }
    });

    const formats = ytdl
      .filterFormats(info.formats, "videoandaudio")
      .slice(0, 5)
      .map(f => ({
        quality: f.qualityLabel || "Auto",
        url: f.url
      }));

    res.json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails?.pop()?.url || "",
      channel: info.videoDetails.author?.name || "Unknown",
      duration: info.videoDetails.lengthSeconds,
      formats
    });

  } catch (error) {

    console.error("Download error:", error);

    res.status(500).json({
      error: "Failed to fetch video"
    });

  }

});

/* start server */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});