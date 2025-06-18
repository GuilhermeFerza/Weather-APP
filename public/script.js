const button = document.getElementById("enviar");
const input = document.querySelector("input");
const resultado = document.querySelector(".result-api");

button.addEventListener("click", async (event) => {
  event.preventDefault();
  const cidade = input.value;

  const res = await fetch("/clima", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cidade }),
  });

  if (!res.ok) {
    console.error("erro na requisicao");
    resultado.innerHTML = `<p style="color: red;">temperature in "${cidade}" couldn't be found<p>`;
    return;
  }

  const data = await res.json();

  console.log(data.temperatura);

  resultado.innerHTML = `<h3>Temperature in ${cidade}</h3>
  <p>${data.temperatura} Celsius</p>`;
});
