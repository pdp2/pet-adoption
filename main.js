const template = document.querySelector("#pet-card-template");
const wrapper = document.createDocumentFragment();

async function start() {
  const weatherResponse = await fetch(
    "https://api.weather.gov/gridpoints/MFL/110,50/forecast"
  );
  const weatherData = await weatherResponse.json();
  const ourTemperature = weatherData.properties.periods[0].temperature;
  document.querySelector("#temperature-output").textContent = ourTemperature;
}

start();

async function petsArea() {
  const petsResponse = await fetch(
    "https://learnwebcode.github.io/bootcamp-pet-data/pets.json"
  );
  const petsData = await petsResponse.json();
  petsData.forEach((pet) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".pet-card").setAttribute("data-species", pet.species);
    clone.querySelector(".pet-name").textContent = pet.name;
    clone.querySelector(".pet-description").textContent = pet.description;
    clone.querySelector(".pet-age").textContent = getPetAge(pet.birthYear);
    const petPhotoSrc = pet.photo ? pet.photo : "images/fallback.jpg";
    const img = clone.querySelector(".pet-card-photo img");
    img.setAttribute("src", petPhotoSrc);
    img.setAttribute("alt", `A ${pet.species} named ${pet.name}`);
    wrapper.appendChild(clone);
  });
  document.querySelector(".list-of-pets").appendChild(wrapper);
}

function getPetAge(birthYear) {
  const age = new Date().getFullYear() - birthYear;
  if (age < 1) {
    return "Less than a year old";
  }
  const suffix = age === 1 ? "year" : "years";
  return `${age} ${suffix} old`;
}

petsArea();

// Filter buttons
const allButtons = document.querySelectorAll(".pet-filter button");
allButtons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

function handleButtonClick(e) {
  allButtons.forEach((button) => button.classList.remove("active"));
  e.target.classList.add("active");
  const currentFilter = e.target.dataset.filter;
  document.querySelectorAll(".pet-card").forEach((card) => {
    const cardSpecies = card.dataset.species;
    if (currentFilter === "all" || currentFilter === cardSpecies) {
      card.style.display = "grid";
    } else {
      card.style.display = "none";
    }
  });
}
