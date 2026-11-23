const screens = [...document.querySelectorAll(".screen")];
const navItems = [...document.querySelectorAll(".nav-item")];

function showScreen(id) {
  screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
  navItems.forEach(item => item.classList.toggle("active", item.dataset.screen === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => showScreen(button.dataset.go));
});
navItems.forEach(button => {
  button.addEventListener("click", () => showScreen(button.dataset.screen));
});
document.querySelector(".brand").addEventListener("click", event => {
  event.preventDefault();
  showScreen("home");
});

// Calculadora ilustrativa baseada na equação da continuidade: v = Q/A.
const flowInput = document.getElementById("flow-rate");
const diameterInput = document.getElementById("diameter");
const flowOutput = document.getElementById("flow-output");
const diameterOutput = document.getElementById("diam-output");
const velocityOutput = document.getElementById("velocity");
const flowState = document.getElementById("flow-state");

function updateCalculator() {
  const q = Number(flowInput.value) / 10000; // 0,0001 a 0,0050 m³/s
  const diameterMm = Number(diameterInput.value);
  const diameterM = diameterMm / 1000;
  const area = Math.PI * diameterM ** 2 / 4;
  const velocity = q / area;

  flowOutput.textContent = q.toLocaleString("pt-BR", { minimumFractionDigits: 4, maximumFractionDigits: 4 }) + " m³/s";
  diameterOutput.textContent = diameterMm + " mm";
  velocityOutput.innerHTML = velocity.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' <small>m/s</small>';

  if (velocity < 0.5) flowState.textContent = "VELOCIDADE BAIXA";
  else if (velocity < 2) flowState.textContent = "VELOCIDADE MODERADA";
  else flowState.textContent = "VELOCIDADE MAIS ELEVADA";
}
flowInput.addEventListener("input", updateCalculator);
diameterInput.addEventListener("input", updateCalculator);
updateCalculator();