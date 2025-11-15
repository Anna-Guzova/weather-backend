// export default async function handler(req, res) {
//   const { city } = req.query;

//   if (!city) {
//     return res.status(400).json({ error: "City parameter is required" });
//   }

//   const apiKey = process.env.API_KEY;

//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`;

//   const apiRes = await fetch(url);
//   const data = await apiRes.json();

//   res.status(200).json(data);
// }

export default async function handler(req, res) {
  // Додаємо CORS-заголовки
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Якщо preflight-запит (OPTIONS) — повертаємо 200
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const apiKey = process.env.API_KEY;
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch weather" });
  }
}
