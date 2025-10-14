export function renderRegisterForm() {
  return `
  <h2>Register</h2>
<form id="registerForm">
  <label>Username:</label>
  <input type="text" id="reg-username" name="username" required></input>
  <label>Password:</label>
  <input type="password" id="reg-password" name="password" required></input>
  <button type="submit">Registrarse</button>
</form>
<p id="messageRegister"></p>
`;
}
