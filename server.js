import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();

app.use(express.static("public"));
app.use(express.json());

const apiKey = process.env.APIKEY;

app.post("/clima", async (req, res) => {
  const city = req.body.cidade;

  const url = `https://api.geoapify.com/v1/geocode/search?text=${city}&format=json&apiKey=${apiKey}`;

  try {
    const resposta = await fetch(url);
    const data = await resposta.json();
    const longitude = data.results[0].lon;
    const latitude = data.results[0].lat;

    const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,temperature_80m,wind_speed_80m,visibility`;

    const response = await fetch(urlClima);
    const dataClima = await response.json();
    const temperatura = dataClima.hourly.temperature_2m[0];

    console.log("temperatura " + temperatura);

    res.json({ temperatura, longitude, latitude });
  } catch (erro) {
    res.status(500).json({ erro: "erro na busca pela latitude e longitude" });
  }
});

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

app.listen(PORT, HOSTNAME, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`servidor rodando em ${HOSTNAME}`);
});
