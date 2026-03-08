const express = require("express");
const ytdl = require("@distube/ytdl-core");

const app = express();

app.use(express.static("public"));

app.get("/download", async (req, res) => {

  try {

    const url = req.query.url;

    if (!url) {
      return res.status(400).json({ error: "No URL provided" });
    }

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    const info = await ytdl.getInfo(url);

    const formats = ytdl.filterFormats(info.formats, "videoandaudio");

    const result = formats.slice(0,5).map(f => ({
      quality: f.qualityLabel || "Auto",
      url: f.url
    }));

    res.json({
      title: info.videoDetails.title,
      id: info.videoDetails.videoId,
      channel: info.videoDetails.author.name,
      duration: info.videoDetails.lengthSeconds,
      formats: result
    });

  } catch (error) {

    console.error("Downloader error:", error);

    res.status(500).json({
      error: "Video could not be fetched. Try another video."
    });

  }

});

app.get("/health", (req,res)=>{
  res.send("Server OK");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
  console.log("Server running on port " + PORT);
});