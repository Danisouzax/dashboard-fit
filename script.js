import { CLIENT_ID, SCOPES } from 'config.js';

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
