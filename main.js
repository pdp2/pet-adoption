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
    console.log(pet.name);
  });
}

petsArea();
