export async function getWeather(location = "jakarta") {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.toLowerCase()}?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const description = data.description;

  return { description, ...data.days[0] };
}
