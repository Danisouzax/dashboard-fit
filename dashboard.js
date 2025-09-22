const CLIENT_ID = "32608600853-8h0s2q50bo9mfs09jr8vb4eh7eoqrcmd.apps.googleusercontent.com";
const SCOPES = `
  https://www.googleapis.com/auth/fitness.activity.read
  https://www.googleapis.com/auth/fitness.body.read
`;

let accessToken = null;

document.addEventListener("DOMContentLoaded", () => {
  accessToken = localStorage.getItem("fit_token");

  if (!accessToken) {
    // Se não tiver token, volta para login
    window.location.href = "index.html";
    return;
  }

  loadDashboard();
});

// Função para consultar dados do Fit
async function queryFit(dataTypeName) {
  const now = Date.now();
  const startTimeMillis = now - 24 * 60 * 60 * 1000; // últimas 24h

  const response = await fetch(
    "https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aggregateBy: [{ dataTypeName }],
        bucketByTime: { durationMillis: 24 * 60 * 60 * 1000 },
        startTimeMillis,
        endTimeMillis: now,
      }),
    }
  );

  if (!response.ok) {
    console.error("Erro HTTP:", response.status);
    return {};
  }

  return response.json();
}

// Preenche os cards
async function loadDashboard() {
  try {
    // Passos
    const stepsData = await queryFit("com.google.step_count.delta");
    const steps = stepsData.bucket?.[0]?.dataset[0]?.point[0]?.value[0]?.intVal || 0;
    document.getElementById("steps").textContent = steps.toLocaleString();

    // Calorias
    const caloriesData = await queryFit("com.google.calories.expended");
    const calories = caloriesData.bucket?.[0]?.dataset[0]?.point[0]?.value[0]?.fpVal || 0;
    document.getElementById("calories").textContent = calories.toFixed(0) + " kcal";

    // Distância
    const distanceData = await queryFit("com.google.distance.delta");
    const distance = distanceData.bucket?.[0]?.dataset[0]?.point[0]?.value[0]?.fpVal || 0;
    document.getElementById("distance").textContent = (distance / 1000).toFixed(2) + " km";

    // Peso
    const weightData = await queryFit("com.google.weight");
    const weight = weightData.bucket?.[0]?.dataset[0]?.point[0]?.value[0]?.fpVal || null;
    document.getElementById("weight").textContent = weight ? weight.toFixed(1) + " kg" : "—";

    // Altura
    const heightData = await queryFit("com.google.height");
    const height = heightData.bucket?.[0]?.dataset[0]?.point[0]?.value[0]?.fpVal || null;
    document.getElementById("height").textContent = height ? height.toFixed(2) + " m" : "—";

    // Treino (atividade segmentada simplificada)
    const workoutData = await queryFit("com.google.activity.segment");
    const activity = workoutData.bucket?.[0]?.dataset[0]?.point[0]?.value[0]?.intVal;
    document.getElementById("workout").textContent = activity ? "Atividade registrada" : "—";
  } catch (err) {
    console.error("Erro ao carregar dados:", err);
  }
}
