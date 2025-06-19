const button = document.getElementById("enviar");
const input = document.querySelector("input");
const resultado = document.querySelector(".result-api");
const sun = document.querySelector("#sun");
const moon = document.querySelector("#moon");

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.style.setProperty("--principal-color", "#040024");
    moon.style.display = "block";
    sun.style.display = "none";
  } else {
    document.documentElement.style.setProperty("--principal-color", "#7979f1");
    sun.style.display = "block";
    moon.style.display = "none";
  }
});

sun.addEventListener("click", () => {
  document.documentElement.style.setProperty("--principal-color", "#040024");
  moon.style.display = "block";
  localStorage.setItem("theme", "dark");
  sun.style.display = "none";
  console.log("botao");
});

moon.addEventListener("click", () => {
  document.documentElement.style.setProperty("--principal-color", "#7979f1");
  sun.style.display = "block";
  localStorage.setItem("theme", "light");
  moon.style.display = "none";
  console.log("botao");
});

button.addEventListener("click", async (event) => {
  event.preventDefault();
  const cidade = input.value;

  if (input.value === "") {
    console.error("type something!");
    resultado.innerHTML = `<p style="color: red;">type something!</p>`;
    return;
  }

  resultado.innerHTML = `<p>Loading temperature...</p>`;

  const res = await fetch("/clima", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cidade }),
  });

  if (!res.ok) {
    console.error("error in requisition");
    resultado.innerHTML = `<p style="color: red;">temperature in "${cidade}" couldn't be found<p>`;
    return;
  }

  const data = await res.json();

  console.log(data.temperatura);

  resultado.innerHTML = `<h3>Temperature in ${cidade}</h3>
  <p>${data.temperatura} Celsius</p>`;
});
