let currentPageUrl = "https://swapi.dev/api/people/";

window.onload = async () => {
  try {
    await loadCharacters(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert("Error to load cards");
  }

  const nextButton = document.getElementById("next-button");
  const previousButton = document.getElementById("previous-button");

  nextButton.addEventListener("click", loadNextPage);
  previousButton.addEventListener("click", loadPreviousPage);
};

async function loadCharacters(url) {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";

  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    responseJson.results.forEach((character) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(
        /\D/g,
        ""
      )}.jpg')`;
      card.className = "cards";

      const characterNameBG = document.createElement("div");
      characterNameBG.className = "character-name-bg";

      const characterName = document.createElement("span");
      characterName.className = "character-name";
      characterName.innerText = `${character.name}`;

      characterNameBG.appendChild(characterName);
      card.appendChild(characterNameBG);

      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = "";

        const characterImage = document.createElement("div");
        characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(
          /\D/g,
          ""
        )}.jpg')`;
        characterImage.className = "character-image";

        const name = document.createElement("span");
        name.className = "character-details";
        name.innerText = `Name: ${character.name}`;

        const characterHeight = document.createElement("span");
        characterHeight.className = "character-details";
        characterHeight.innerText = `Height: ${convertHeight(
          character.height
        )}`;

        const mass = document.createElement("span");
        mass.className = "character-details";
        mass.innerText = `Mass: ${convertMass(character.mass)}`;

        const eyeColor = document.createElement("span");
        eyeColor.className = "character-details";
        eyeColor.innerText = `Eye color: ${character.eye_color}`;

        const birthYear = document.createElement("span");
        birthYear.className = "character-details";
        birthYear.innerText = `Birth year: ${character.birth_year}`;

        modalContent.appendChild(characterImage);
        modalContent.appendChild(name);
        modalContent.appendChild(characterHeight);
        modalContent.appendChild(mass);
        modalContent.appendChild(eyeColor);
        modalContent.appendChild(birthYear);
      };

      mainContent.appendChild(card);
    });

    const nextButton = document.getElementById("next-button");
    const previousButton = document.getElementById("previous-button");

    nextButton.disabled = !responseJson.next;
    previousButton.disabled = !responseJson.previous;

    previousButton.style.visibility = responseJson.previous
      ? "visible"
      : "hidden";

    currentPageUrl = url;
  } catch (error) {
    alert("Error to load characters");
    console.log(error);
  }
}

async function loadNextPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.next);
  } catch (error) {
    console.log(error);
    alert("Error to load next page");
  }
}

async function loadPreviousPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.previous);
  } catch (error) {
    console.log(error);
    alert("Error to load previous page");
  }
}

function hideModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}

function convertHeight(height) {
  return (height / 100).toFixed(2);
}

function convertMass(mass) {
  return `${mass} kg`;
}
