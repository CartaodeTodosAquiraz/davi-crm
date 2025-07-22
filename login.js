function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const status = document.getElementById("login-status");

  if (user === "CE476011089" && pass === "4603") {
    status.textContent = "Login bem-sucedido!";
    status.style.color = "#43cc25";
    document.querySelector(".login-container").style.boxShadow = "0 0 25px #43cc25";

    setTimeout(() => {
      window.location.href = "home.html"; // Redireciona corretamente agora
    }, 2000);
  } else {
    status.textContent = "Usuário ou senha incorretos!";
    status.style.color = "red";
  }
}
