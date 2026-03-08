// =========================
// TOOL SEARCH
// =========================
const toolSearch = document.getElementById("toolSearch");

if (toolSearch) {

  toolSearch.addEventListener("input", function () {

    const value = this.value.toLowerCase();

    const cards = document.querySelectorAll(".tool-card");

    cards.forEach(card => {

      const text = card.innerText.toLowerCase();

      card.style.display = text.includes(value) ? "block" : "none";

    });

  });

}


// =========================
// TAG GENERATOR
// =========================
function generateTags() {

  const topic = document.getElementById("tagTopic").value.trim();

  if (!topic) {
    alert("Enter a topic");
    return;
  }

  const words = topic.split(" ");

  let tags = [];

  words.forEach(word => {

    tags.push(word);
    tags.push(word + " tutorial");
    tags.push("best " + word);
    tags.push(word + " tips");

  });

  document.getElementById("tagsResult").innerText = tags.join(", ");

}


// =========================
// TITLE GENERATOR
// =========================
function generateTitles() {

  const topic = document.getElementById("titleTopic").value.trim();

  if (!topic) {
    alert("Enter a topic");
    return;
  }

  const templates = [

    "How to " + topic,
    "10 Tips for " + topic,
    "Beginner Guide to " + topic,
    "Best Way to " + topic,
    topic + " Explained"

  ];

  document.getElementById("titleResult").innerText =
    templates.join("\n");

}


// =========================
// DESCRIPTION GENERATOR
// =========================
function generateDescription() {

  const topic = document.getElementById("descTopic").value.trim();

  if (!topic) {
    alert("Enter a topic");
    return;
  }

  const description = `
In this video we talk about ${topic}.

If you enjoyed this video make sure to like and subscribe for more helpful content.

#${topic.replace(/\s+/g, "")}
`;

  document.getElementById("descResult").innerText = description;

}


// =========================
// HASHTAG GENERATOR
// =========================
function generateHashtags() {

  const topic = document.getElementById("hashtagTopic").value.trim();

  if (!topic) {
    alert("Enter a topic");
    return;
  }

  const words = topic.split(" ");

  let hashtags = words.map(w => "#" + w);

  hashtags.push("#youtube");
  hashtags.push("#contentcreator");

  document.getElementById("hashtagResult").innerText =
    hashtags.join(" ");

}


// =========================
// KEYWORD GENERATOR
// =========================
function generateKeywords() {

  const topic = document.getElementById("keywordTopic").value.trim();

  if (!topic) {
    alert("Enter a keyword");
    return;
  }

  const keywords = [

    topic,
    topic + " tutorial",
    topic + " tips",
    topic + " for beginners",
    "best " + topic

  ];

  document.getElementById("keywordResult").innerText =
    keywords.join(", ");

}


// =========================
// PLAYLIST DURATION
// =========================
function calculatePlaylist() {

  const input = document.getElementById("playlistTimes").value;

  if (!input) {
    alert("Enter video times");
    return;
  }

  const lines = input.split("\n");

  let totalSeconds = 0;

  lines.forEach(line => {

    const parts = line.split(":").map(Number);

    if (parts.length === 2) {

      totalSeconds += parts[0] * 60 + parts[1];

    }

  });

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("playlistResult").innerText =
    minutes + " minutes " + seconds + " seconds";

}


// =========================
// VIDEO IDEA GENERATOR
// =========================
function generateVideoIdea() {

  const ideas = [

    "Top 10 Tips for YouTube Growth",
    "Beginner Guide to YouTube SEO",
    "How to Get Your First 1000 Subscribers",
    "Best Tools for YouTube Creators",
    "Common Mistakes New YouTubers Make"

  ];

  const randomIdea =
    ideas[Math.floor(Math.random() * ideas.length)];

  document.getElementById("ideaResult").innerText = randomIdea;

}


// =========================
// EARNINGS CALCULATOR
// =========================
function calculateEarnings() {

  const views = Number(document.getElementById("views").value);

  if (!views || views <= 0) {
    alert("Enter valid views");
    return;
  }

  const low = views * 0.002;
  const high = views * 0.01;

  document.getElementById("earningsResult").innerText =
    "$" + low.toFixed(2) + " - $" + high.toFixed(2);

}


// =========================
// COPY RESULT BUTTON
// =========================
function copyText(id) {

  const element = document.getElementById(id);

  if (!element) return;

  const text = element.innerText;

  navigator.clipboard.writeText(text)
    .then(() => alert("Copied!"))
    .catch(() => alert("Copy failed"));

}