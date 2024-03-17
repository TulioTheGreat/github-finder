searchButton.addEventListener("click", () => {
  performSearch();
});

const inputSearch = document.getElementById("search");

inputSearch.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  const inputSearch = document.getElementById("search").value;
  const cardsContainer = document.getElementById("cardsContainer");
  const searchCardContainer = document.getElementById("searchCardContainer");

  cardsContainer.style.display = "none";
  searchCardContainer.style.display = "flex";

  fetch("https://api.github.com/users/" + inputSearch)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("profile-image").src = data.avatar_url;
      document.getElementById("name").textContent = data.name;
      document.getElementById("username").textContent = data.login;
      document.getElementById("followers").textContent =
        data.followers + " followers";
      document.getElementById("following").textContent =
        data.following + " following";

      fetch(data.repos_url)
        .then((response) => response.json())
        .then((repos) => {
          const repository = repos[0];
          document.getElementById("repository").textContent = repository.name;
          document.getElementById("description").textContent =
            repository.description;
        });
    });
}
