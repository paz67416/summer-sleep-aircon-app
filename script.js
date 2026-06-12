const form = document.querySelector("#sleepForm");
const result = document.querySelector("#result");
const resultTitle = document.querySelector("#resultTitle");
const resultText = document.querySelector("#resultText");
const meterBar = document.querySelector("#meterBar");
const tips = document.querySelector("#tips");
const resetButton = document.querySelector("#resetButton");

const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const tempOut = document.querySelector("#tempOut");
const humidityOut = document.querySelector("#humidityOut");

const labels = {
  cool: {
    title: "冷え寄りバランス",
    text: "暑さ対策はできていますが、朝のだるさや冷えが出やすい設定かもしれません。温度だけでなく、風の向きや寝具の薄さも見直してみましょう。",
    width: "34%",
    tips: [
      "風が体に直接当たっていないか確認する",
      "何も掛けないより、薄いものを一枚掛ける",
      "冷えを感じる日は温度を1℃上げるか、風量を弱める"
    ]
  },
  balanced: {
    title: "ちょうどいい寄り",
    text: "温度・湿度・体感のバランスはかなり良さそうです。寝る前の小さな違和感だけ拾って、翌朝の状態を見ながら微調整していきましょう。",
    width: "66%",
    tips: [
      "寝る前と起きた直後の体感をメモする",
      "湿度が高い日は温度より除湿を意識する",
      "朝までつける場合は風向きを天井寄りにする"
    ]
  },
  warm: {
    title: "暑さ残りバランス",
    text: "眠りに入る前の暑さや、夜中の汗で睡眠が浅くなりやすい状態かもしれません。温度を下げるより先に、湿度と空気の動きを整えるのがコツです。",
    width: "88%",
    tips: [
      "湿度が高い日は除湿や送風を組み合わせる",
      "寝る30分前から部屋を冷やしておく",
      "汗で起きる日は寝具を薄くしすぎていないか見る"
    ]
  }
};

function updateOutputs() {
  tempOut.value = `${temp.value}℃`;
  humidityOut.value = `${humidity.value}%`;
}

function scoreForm() {
  let score = 0;
  const t = Number(temp.value);
  const h = Number(humidity.value);
  const feeling = document.querySelector("#feeling").value;
  const bedding = document.querySelector("#bedding").value;
  const mode = document.querySelector("#mode").value;
  const morning = document.querySelector("#morning").value;

  if (t <= 24) score -= 2;
  if (t >= 29) score += 2;
  if (h >= 70) score += 2;
  if (h <= 40) score -= 1;
  if (feeling === "hot") score += 2;
  if (feeling === "cold") score -= 2;
  if (bedding === "none") score -= 1;
  if (bedding === "heavy") score += 1;
  if (mode === "timer") score += 1;
  if (mode === "fan") score += 1;
  if (morning === "sweat") score += 2;
  if (morning === "dry") score -= 1;
  if (morning === "heavy") score -= 2;

  if (score <= -2) return labels.cool;
  if (score >= 3) return labels.warm;
  return labels.balanced;
}

function renderResult(profile) {
  resultTitle.textContent = profile.title;
  resultText.textContent = profile.text;
  meterBar.style.width = profile.width;
  tips.innerHTML = profile.tips.map((tip) => `<div class="tip">${tip}</div>`).join("");
  result.classList.remove("is-hidden");
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

temp.addEventListener("input", updateOutputs);
humidity.addEventListener("input", updateOutputs);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderResult(scoreForm());
});

resetButton.addEventListener("click", () => {
  result.classList.add("is-hidden");
  form.scrollIntoView({ behavior: "smooth", block: "start" });
});

updateOutputs();
