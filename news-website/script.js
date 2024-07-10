document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  const searchText = document.getElementById("search-text");
  const cardsContainer = document.getElementById("cards-container");
  const templateNewsCard = document.getElementById("template-news-card");

  searchButton.addEventListener("click", () => {
    const query = searchText.value;
    fetchNews(query);
  });

  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      fetchNews(item.id);
    });
  });

  const fetchNews = async (query) => {
    console.log(`Fetching news for query: ${query}`);
    try {
      const response = await fetch(`http://localhost:3000/news?q=${query}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Data received:", data);
      displayNews(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const displayNews = (articles) => {
    console.log("Displaying articles:", articles);
    cardsContainer.innerHTML = "";
    articles.forEach((article) => {
      const cardClone = templateNewsCard.content.cloneNode(true);
      cardClone.querySelector("#news-img").src =
        article.urlToImage || "https://via.placeholder.com/400x200";
      cardClone.querySelector("#news-title").textContent = article.title;
      cardClone.querySelector("#news-source").textContent = `${
        article.source.name
      } ${new Date(article.publishedAt).toLocaleDateString()}`;
      cardClone.querySelector("#news-desc").textContent = article.description;
      cardsContainer.appendChild(cardClone);
    });
  };

  // Fetch default news on load
  fetchNews("latest");
});
