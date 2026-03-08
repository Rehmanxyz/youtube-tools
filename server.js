const express = require("express");
const ytdl = require("@distube/ytdl-core");

const app = express();

app.use(express.static("public"));

app.get("/download", async (req, res) => {

  const url = req.query.url;

  if (!url) {
    return res.json({ error: "No URL provided" });
  }

  try {

    const info = await ytdl.getInfo(url);

    const formats = ytdl.filterFormats(info.formats, "videoandaudio");

    res.json({
      title: info.videoDetails.title,
      id: info.videoDetails.videoId,
      channel: info.videoDetails.author.name,
      duration: info.videoDetails.lengthSeconds,
      formats: formats.slice(0,5).map(f => ({
        quality: f.qualityLabel || "Auto",
        url: f.url
      }))
    });

  } catch (err) {

    console.log("ERROR:", err);

    res.json({ error: "Error fetching video" });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});