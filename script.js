const PROMPT = "please input your information >_<";
let timer;

/* ===== DOM selection methods ===== */

// 1) getElementById
const form = document.getElementById("card-form");
const status = document.getElementById("status");

// 2) getElementsByClassName
const generateBtn = document.getElementsByClassName("btn-primary")[0];

// 3) querySelector
const cardInfo = document.querySelector(".info");

// 4) getElementsByTagName
const outputSpans = cardInfo.getElementsByTagName("span");

function formatDate(value) {
  if (!value) return "";
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function setStatus(msg) {
  status.textContent = msg;
}

function getValue(id) {
  return document.getElementById(id).value.trim();
}

function getGender() {
  const checked = document.querySelector('input[name="gender"]:checked');
  return checked ? checked.value : "";
}

function getColors() {
  const checked = document.querySelectorAll('input[name="color"]:checked');
  return Array.from(checked, (box) => box.value).join(", ");
}

function setOutput(key, value) {
  document.getElementById("out-" + key).textContent = value || "";
}

document.getElementById("birthday").addEventListener("change", (e) => {
  if (!e.target.value) return;
  const [y, m, d] = e.target.value.split("-").map(Number);
  const today = new Date();
  let age = today.getFullYear() - y;
  if (
    today.getMonth() + 1 < m ||
    (today.getMonth() + 1 === m && today.getDate() < d)
  )
    age--;
  if (age >= 0) document.getElementById("age").value = age;
});

// Typing in any field replaces the prompt with "on progress..."
form.addEventListener("input", () => {
  clearTimeout(timer);
  generateBtn.disabled = false;
  setStatus("on progress...");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearTimeout(timer);

  setStatus("on progress...");
  generateBtn.disabled = true;

  timer = setTimeout(() => {
    setOutput("name", getValue("name"));
    setOutput("birthday", formatDate(getValue("birthday")));
    setOutput("age", getValue("age"));
    setOutput("address", getValue("address"));
    setOutput("email", getValue("email"));
    setOutput("phone", getValue("phone"));
    setOutput("gender", getGender());
    setOutput("mbti", getValue("mbti"));
    setOutput("color", getColors());
    setOutput("other", getValue("other"));

    generateBtn.disabled = false;
    setStatus("successfully created!");
  }, 500);
});

form.addEventListener("reset", () => {
  clearTimeout(timer);
  generateBtn.disabled = false;
  // clear every output span found with getElementsByTagName
  Array.from(outputSpans).forEach((span) => (span.textContent = ""));
  setStatus(PROMPT);
});
