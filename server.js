const express = require("express")
const ytdl = require("ytdl-core")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.static("public"))

app.get("/download", async (req, res) => {
    const url = req.query.url

    if (!ytdl.validateURL(url)) {
        return res.json({ error: "Invalid URL" })
    }

    const info = await ytdl.getInfo(url)

    const formats = ytdl.filterFormats(info.formats, 'videoandaudio')

    const links = formats.slice(0,5).map(f => ({
        quality: f.qualityLabel,
        url: f.url
    }))

    res.json({ formats: links })
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})