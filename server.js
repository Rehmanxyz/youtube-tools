const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/download", async (req, res) => {

    const url = req.query.url;

    if (!url || !ytdl.validateURL(url)) {
        return res.json({ error: "Invalid URL" });
    }

    try {

        const info = await ytdl.getInfo(url);

        const formats = ytdl
            .filterFormats(info.formats, "videoandaudio")
            .slice(0,5);

   res.json({
title: info.videoDetails.title,
id: info.videoDetails.videoId,
channel: info.videoDetails.author.name,
duration: info.videoDetails.lengthSeconds + " sec",
formats: formats.map(f=>({
quality:f.qualityLabel,
url:f.url
}))
});

    } catch (e) {
        res.json({ error: "Error fetching video" });
    }

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});