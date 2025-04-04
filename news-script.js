const apikey = 'pub_782663fd6639d84c2e2246023ffa39a14c23d'; // Replace with your valid API key
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Fetch top headlines
async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${apikey}&country=us&language=en`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}

// Fetch news by search
async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${apikey}&q=${query}&language=en`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching news by query", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  if (!articles.length) {
    blogContainer.innerHTML = "<p>No news articles found.</p>";
    return;
  }

  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    const img = document.createElement("img");
    img.src = article.image_url || "https://placehold.co/600x400";
    img.alt = article.title || "News Image";

    const title = document.createElement("h2");
    const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
    title.textContent = truncatedTitle;

    const description = document.createElement("p");
    const truncatedDes = article.description && article.description.length > 120
      ? article.description.slice(0, 120) + "..."
      : article.description || "No description available.";
    description.textContent = truncatedDes;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);

    blogCard.addEventListener("click", () => {
      window.open(article.link, "_blank");
    });

    blogContainer.appendChild(blogCard);
  });
}

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    const articles = await fetchNewsQuery(query);
    displayBlogs(articles);
  }
});

(async () => {
  const articles = await fetchRandomNews();
  displayBlogs(articles);
})();
