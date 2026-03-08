// Tabs navigation
const tabs = document.querySelectorAll(".tab-btn");
const tools = document.querySelectorAll(".tool");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    tools.forEach(tool => tool.style.display = "none");
    document.getElementById(tab.dataset.tool).style.display = "block";
  });
});

// Show first tab
tools[0].style.display = "block";

// Video Downloader
async function downloadVideo() {

  const url = document.getElementById("videoURL").value.trim();

  if (!url) {
    alert("Please enter a YouTube URL");
    return;
  }

  const resultBox = document.getElementById("downloadResult");
  resultBox.innerHTML = "Loading video info...";

  try {

    const response = await fetch("/download?url=" + encodeURIComponent(url));
    const data = await response.json();

    if (data.error) {
      resultBox.innerText = data.error;
      return;
    }

    let html = `
      <div style="margin-bottom:15px">
        <img src="${data.thumbnail}" width="200"><br>
        <strong>${data.title}</strong><br>
        Channel: ${data.channel}<br>
      </div>
    `;

    data.formats.forEach(f => {
      html += `
        <a href="${f.url}" target="_blank">
          Download ${f.quality}
        </a><br>
      `;
    });

    resultBox.innerHTML = html;

  } catch (error) {

    resultBox.innerText = "Failed to fetch video.";

  }

}

// Tag Generator
function generateTags() {
  let topic = document.getElementById("tagTopic").value.trim();
  if (!topic) return;
  let words = topic.split(" ");
  let tags = words.concat(words.map(w=>"best "+w));
  document.getElementById("tagsResult").innerText = tags.join(", ");
}

// Title Generator
function generateTitles() {
  let topic = document.getElementById("titleTopic").value.trim();
  if (!topic) return;
  let prefixes = ["How to", "Top 5", "Easy", "Ultimate Guide"];
  let titles = prefixes.map(p=>p+" "+topic);
  document.getElementById("titleResult").innerText = titles.join("\n");
}

// Description Generator
function generateDescription() {
  let topic = document.getElementById("descTopic").value.trim();
  if (!topic) return;
  document.getElementById("descResult").innerText = `Learn everything about ${topic} in this video. Like and subscribe!`;
}

// Playlist Calculator
function calculatePlaylist() {
  let lines = document.getElementById("playlistTimes").value.split("\n");
  let total = 0;
  lines.forEach(l=>{
    let parts = l.split(":").map(Number);
    if(parts.length==2) total += parts[0]*60 + parts[1];
  });
  let min = Math.floor(total/60), sec = total%60;
  document.getElementById("playlistResult").innerText = `${min}m ${sec}s`;
}

// Comment Analyzer
function analyzeComments() {
  let text = document.getElementById("commentsInput").value.toLowerCase().replace(/[^a-z\s]/g,'').split(/\s+/);
  let freq = {};
  text.forEach(w=>{ if(w) freq[w]=(freq[w]||0)+1 });
  let sorted = Object.entries(freq).sort((a,b)=>b[1]-a[1]);
  document.getElementById("commentsResult").innerText = sorted.slice(0,10).map(e=>`${e[0]}:${e[1]}`).join(", ");
}

// Video Idea Generator
function generateVideoIdea() {
  let ideas = ["Top 10 Tips", "Beginner Tutorial", "Common Mistakes to Avoid", "Tools for Content Creation"];
  document.getElementById("ideaResult").innerText = ideas[Math.floor(Math.random()*ideas.length)];
}