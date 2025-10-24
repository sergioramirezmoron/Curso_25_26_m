import { initialStorage, getUsers, setUsers } from "./helpers/storage";
import { DB } from "./db/db";
import { renderLoginForm } from "./views/loginView";
import { validateCredentials } from "./services/authServices";
import { renderRegisterForm } from "./views/registerView";
import bcrypt from "bcryptjs";

export function initialApp() {
  // Iniciamos guardando los usuarios en localStorage
  initialStorage(DB);

  // Renderizamos formularios
  const app = document.getElementById("app");
  app.innerHTML = `${renderLoginForm()} ${renderRegisterForm()}`;

  // Referencias a los formularios y mensajes
  const form = document.querySelector("#loginForm");
  const message = document.querySelector("#message");
  const formRegister = document.querySelector("#registerForm");
  const messageRegister = document.querySelector("#messageRegister");

  // LOGIN
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtenemos los valores directamente de los inputs
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const username = String(usernameInput.value || "");
    const password = String(passwordInput.value || "");

    const ok = validateCredentials(username, password);

    message.textContent = ok
      ? `Login correcto: ${username}`
      : `Credenciales incorrectas`;
    message.style.color = ok ? "green" : "red";

    form.reset();
  });

  // REGISTRO
  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById('reg-username');
    const passwordInput = document.getElementById('reg-password');

    const username = String(usernameInput.value || "").trim();
    const password = String(passwordInput.value || "").trim();

    if (!username || !password || password.length < 3) {
      messageRegister.textContent = "Datos inválidos";
      messageRegister.style.color = "red";
      return;
    }

    const users = getUsers();
    const exists = users.some((u) => u.username === username);
    if (exists) {
      messageRegister.textContent = "El usuario ya existe";
      messageRegister.style.color = "red";
      return;
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id || 0)) + 1 : 1,
      username,
      passwordHash,
      rol: "invitado",
    };

    setUsers(newUser);
    messageRegister.textContent = `Usuario ${username} registrado correctamente`;
    messageRegister.style.color = "green";
    formRegister.reset();
  });
}
