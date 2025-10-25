## 👨‍💻 Autor

<div align="center">
  <img src="https://avatars.githubusercontent.com/ninomiquelino" width="100" height="100" style="border-radius: 50%">
  <br>
  <strong>Onivaldo Miquelino</strong>
  <br>
  <a href="https://github.com/ninomiquelino">@ninomiquelino</a>
</div>

---

# 🛡️ Trusted Types Demo: Defesa Avançada Contra XSS

![JavaScript](https://img.shields.io/badge/Frontend-JavaScript-F7DF1E?logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-green)
![Status Stable](https://img.shields.io/badge/Status-Stable-success)
![Version 1.0.0](https://img.shields.io/badge/Version-1.0.0-blue)
![GitHub stars](https://img.shields.io/github/stars/NinoMiquelino/password-strength-checker?style=social)
![GitHub forks](https://img.shields.io/github/forks/NinoMiquelino/password-strength-checker?style=social)
![GitHub issues](https://img.shields.io/github/issues/NinoMiquelino/password-strength-checker)

---

## 💻 Visão Geral do Projeto

Este projeto é uma demonstração prática de como a diretiva **Trusted Types**, parte do Content Security Policy (CSP) Level 3, pode ser usada para mitigar vulnerabilidades de **Cross-Site Scripting (XSS)** persistente e refletido em aplicações web modernas.

Ele ilustra o princípio de quebrar a cadeia de confiança ao exigir que todos os valores atribuídos a **sinks de DOM perigosos** (como `innerHTML`) sejam objetos "Trusted" e não strings arbitrárias.

A demonstração utiliza a biblioteca **DOMPurify** como um sanitizer confiável para transformar código HTML potencialmente inseguro em um objeto `TrustedHTML`, permitindo sua atribuição segura.

❗ **Nota Crítica:** O bloqueio por Trusted Types só é ativado quando o cabeçalho HTTP `Content-Security-Policy: require-trusted-types-for 'script';` é enviado pelo servidor.

---

## ⚙️ Funcionalidades
- 🚫 Demonstração de Erro (Bloqueio): ilustra como o navegador bloqueia a atribuição de uma string HTML insegura ao innerHTML quando a CSP está ativa, gerando um TypeError.
- 🧹 Uso de Sanitização Confiável: demonstra o processo correto de pegar uma string insegura, sanitizá-la usando o DOMPurify, e convertê-la em um objeto TrustedHTML aceito pelo navegador.
- 🔐 Foco em Segurança: prova de conceito de uma política de segurança moderna que impede que o JavaScript injete strings arbitrárias no DOM.
- 🧩 Ambiente Único: todo o código está contido em um único arquivo HTML/JS, facilitando o estudo e a execução local.

---

## 🧩 Estrutura do Projeto
```
trusted-types-xss-mitigation-demo/
📁 docs/
│   └── index.html
│   └── assets/
│       └── js/script.js
├── README.md
├── .gitignore
└── LICENSE
```
---

## 🚀 Visualizar na prática

👉 [**Acesse o site online**](https://ninomiquelino.github.io/trusted-types-xss-mitigation-demo/)  
Clique em um dos botões e veja o resultado instantaneamente na interface.

---

## 🧠 Tecnologias utilizadas
- 💻 HTML5 / CSS3
- 🎨 Tailwind CSS
- ⚡ JavaScript (ES6+)

---

## 📦 Como usar
1. Clone este repositório:
   ```bash
   git clone https://github.com/ninomiquelino/trusted-types-xss-mitigation-demo.git

---   

## 🧾 Licença
Distribuído sob a licença **MIT**.  
Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🤝 Contribuições
Contribuições são sempre bem-vindas!  
Sinta-se à vontade para abrir uma [*issue*](https://github.com/NinoMiquelino/trusted-types-xss-mitigation-demo/issues) com sugestões ou enviar um [*pull request*](https://github.com/NinoMiquelino/trusted-types-xss-mitigation-demo/pulls) com melhorias.

---

## 💬 Contato
📧 [Entre em contato pelo LinkedIn](https://www.linkedin.com/in/onivaldomiquelino/)  
💻 Desenvolvido por **Onivaldo Miquelino**

---

### 🏷️ Explicando os badges:
| Badge | Significado |
|--------|--------------|
| 🟡 **JavaScript** | Mostra a stack usada na interface |
| 🟦 **TailwindCSS** | Framework CSS usado para estilização moderna e responsiva |
| 🟢 **License MIT** | Mostra a licença do repositório |
| 💙 **Version 1.0.0** | Versão estável do projeto |
| ✅ **Status Stable** | Mostra que o projeto está funcionando corretamente |

---
