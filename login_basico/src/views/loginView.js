export function renderLoginForm() {
  return `
  <h2>Login</h2>
<form id="loginForm">
  <label>Username:</label>
  <input type="text" id="username" name="username" required></input>
  <label>Password:</label>
  <input type="password" id="password" name="password" required></input>
  <button type="submit">Iniciar Sesión</button>
</form>
<p id="message"></p>
`;
}
