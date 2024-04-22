async function start() {
  const weatherResponse = await fetch('https://api.weather.gov/gridpoints/MFL/110,50/forecast')
  const weatherData = await weatherResponse.json()
  const ourTemperature = weatherData.properties.periods[0].temperature
  document.querySelector('#temperature-output').textContent = ourTemperature
}

start()
