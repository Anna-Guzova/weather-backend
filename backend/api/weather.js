export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  const apiKey = process.env.API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`;

  const apiRes = await fetch(url);
  const data = await apiRes.json();

  res.status(200).json(data);
}
