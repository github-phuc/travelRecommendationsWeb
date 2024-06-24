async function fetchRecommendations() {
  const response = await fetch("travel-recommendation.json");
  const data = await response.json();
  return data;
}

document
  .getElementById("search-button")
  .addEventListener("click", async function () {
    var query = document.getElementById("search-input").value.toLowerCase();
    var results = document.getElementById("results");
    results.innerHTML = ""; // Clear previous results

    const recommendations = await fetchRecommendations();

    let keyword;
    if (query.includes("beach") || query.includes("beaches")) {
      keyword = "beaches";
    } else if (query.includes("temple") || query.includes("temples")) {
      keyword = "temples";
    } else if (query.includes("country") || query.includes("countries")) {
      keyword = "countries";
    }

    if (keyword && recommendations[keyword]) {
      recommendations[keyword].forEach((item) => {
        if (item.cities) {
          item.cities.forEach((city) => {
            const recDiv = document.createElement("div");
            recDiv.className = "recommendation";
            recDiv.innerHTML = `
                          <img src="${city.imageUrl}" alt="${city.name}">
                          <div class="details">
                              <h3>${city.name}</h3>
                              <p>${city.description}</p>
                              <button>Visit</button>
                          </div>
                      `;
            results.appendChild(recDiv);
          });
        } else {
          const recDiv = document.createElement("div");
          recDiv.className = "recommendation";
          recDiv.innerHTML = `
                      <img src="${item.imageUrl}" alt="${item.name}">
                      <div class="details">
                          <h3>${item.name}</h3>
                          <p>${item.description}</p>
                          <button>Visit</button>
                      </div>
                  `;
          results.appendChild(recDiv);
        }
      });
    } else {
      results.innerHTML = "<p>No results found</p>";
    }
  });

document.getElementById("clear-button").addEventListener("click", function () {
  document.getElementById("search-input").value = ""; // Clear search input
  document.getElementById("results").innerHTML = ""; // Clear results
});
