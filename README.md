# 🏋️‍♀️ Dashboard Fit

Este é um projeto de **Dashboard conectado ao Google Fit**, que permite visualizar seus dados de saúde e atividades físicas diretamente no navegador.  
Ele integra autenticação com Google OAuth 2.0 e exibe métricas como **passos, calorias, distância percorrida, peso, altura e treinos**.

---

## 🚀 Funcionalidades
- Login com conta Google e integração com Google Fit.
- Leitura de métricas principais:
  - ✅ Passos
  - ✅ Calorias
  - ✅ Distância percorrida
  - ✅ Peso corporal
  - ✅ Altura
  - ✅ Treinos (atividades segmentadas)
- Design moderno e responsivo (HTML + CSS).
- Uso do **localStorage** para armazenar o token de sessão.

---

## 🛠️ Tecnologias utilizadas
- **HTML5 / CSS3 / JavaScript (ES6)**  
- **Google Fit REST API**  
- **OAuth 2.0 com Google Identity Services**  
- Hospedagem via **GitHub Pages**

---

## 📂 Estrutura do projeto
```bash
dashboard-fit/
│

├── index.html        # Página de login

├── dashboard.html    # Página do dashboard

├── script.js         # Lógica do login + OAuth

├── dashboard.js      # Lógica de consumo da API do Google Fit

├── style.css         # Estilos da página de login

├── dashboard.css     # Estilos do dashboard

└── README.md         # Este arquivo

🌐 Acessar online

O projeto também está disponível em:
👉 https://danisouzax.github.io/dashboard-fit/
