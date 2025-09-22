// Substitua pelo seu Client ID do Google Cloud
const CLIENT_ID = "32608600853-8h0s2q50bo9mfs09jr8vb4eh7eoqrcmd.apps.googleusercontent.com";

const SCOPES = `
  https://www.googleapis.com/auth/fitness.activity.read
  https://www.googleapis.com/auth/fitness.body.read
`;

let tokenClient;

document.addEventListener("DOMContentLoaded", () => {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (response) => {
      if (response.error) {
        alert("Erro ao autenticar: " + response.error);
        return;
      }

      // Guarda token no localStorage
      localStorage.setItem("fit_token", response.access_token);

      // Redireciona para dashboard
      window.location.href = "dashboard.html";
    },
  });

  // Clique no botão Google
  document.getElementById("googleLogin").addEventListener("click", () => {
    tokenClient.requestAccessToken();
  });
});
