const ApiKey = "56444b4c11ff4ea58b670975ac48ee55";
let BlogContainer = document.querySelector("#BlogContainer");
const search = document.querySelector("#SearchInput");
const SearchBtn = document.querySelector(".SearchBtn");

async function fetchRandomNews() {
  try {
    const apiurl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${ApiKey}`;
    const response = await fetch(apiurl);
    const data = await response.json();

    // Check if data.articles exists and return it
    if (data.articles) {
      return data.articles;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error fetching random news", error);
    return [];
  }
}
SearchBtn.addEventListener("click", async () => {
    const searchvalue = search.value.trim();
    if (searchvalue !== "") {
        try { 
            const article = await fetchSearch(searchvalue)
         displayBlogs(article)
        }
        catch (error) {
            console.log("Error We got from search",error);
            
        }
    }
});

async function fetchSearch(searchvalue) {
  try {
    const apiurl = `https://newsapi.org/v2/everything?q=${searchvalue}&pageSize=10&apikey=${ApiKey}`;
    const response = await fetch(apiurl);
    const data = await response.json();

    if (data.articles) {
      return data.articles;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error fetching random news", error);
    return [];
  }
};

function displayBlogs(articles) {
  BlogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCardHost = document.createElement("div");
    blogCardHost.classList.add("blogCard");

    const img = document.createElement("img");
    img.src = article.urlToImage; // Corrected property
    img.alt = article.title;
    img.classList.add("blogCardImage");

    const title = document.createElement("h2");
      title.classList.add("blogCard__Header");
      const trunketedTitle = article.title.length>30 ?article.title.slice(0,30) + "...." : article.title
    title.textContent = trunketedTitle;

    const description = document.createElement("p");
      description.classList.add("blogCardPara");
     const Fulldescription =
       article.description && article.description.length > 50
         ? article.description.slice(0, 50) + "...."
         : article.description || "No description available.";


    description.textContent = Fulldescription;

    blogCardHost.appendChild(img);
    blogCardHost.appendChild(title);
      blogCardHost.appendChild(description);
      blogCardHost.addEventListener("click", () => {
          window.open(article.url, "_blank")
      })
      
    BlogContainer.appendChild(blogCardHost);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.log("Error displaying blogs", error);
  }
})();
