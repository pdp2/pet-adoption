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
    clone.querySelector(".pet-name").textContent = pet.name;
    clone.querySelector(".pet-description").textContent = pet.description;
    clone.querySelector(".pet-age").textContent = getPetAge(pet.birthYear);
    const img = clone.querySelector(".pet-card-photo img");
    img.setAttribute("src", pet.photo);
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
