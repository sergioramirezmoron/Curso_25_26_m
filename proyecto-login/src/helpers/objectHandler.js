import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export const registrarUsuario = (username, password, tipo) => {
  if (!username || !password) throw new Error("All fields are mandatory");

  if (tipo.toLowerCase() === "object") {
    const stored = localStorage.getItem("users_object");
    const users = stored ? JSON.parse(stored) : {};

    if (users[username]) {
      throw new Error(`Username '${username}' already exists`);
    }

    const newUser = {
      id: uuidv4(),
      username,
      passwordHash: bcrypt.hashSync(password, 10),
    };

    users[username] = newUser;
    localStorage.setItem("users_object", JSON.stringify(users));
    console.log("✅ User registered successfully (object)");
  } else {
    throw new Error("Invalid type, expected object");
  }
};

export const loginUsuario = (username, password, tipo) => {
  if (tipo.toLowerCase() !== "object") throw new Error("Invalid type");

  const stored = localStorage.getItem("users_object");
  const users = stored ? JSON.parse(stored) : {};

  const user = users[username];
  if (!user) {
    throw new Error("❌ User not found");
  }

  const valid = bcrypt.compareSync(password, user.passwordHash);
  if (!valid) {
    throw new Error("❌ Incorrect password");
  }

  console.log(`✅ Welcome, ${username}`);
};

export const cambiarPassword = (
  username,
  passwordActual,
  passwordNueva,
  tipo
) => {
  if (tipo.toLowerCase() !== "object") {
    throw new Error("Invalid type");
  }

  const stored = localStorage.getItem("users_object");
  const users = stored ? JSON.parse(stored) : {};

  const user = users[username];
  if (!user) {
    throw new Error("❌ User not found");
  }

  const valid = bcrypt.compareSync(passwordActual, user.passwordHash);
  if (!valid) {
    throw new Error("❌ Incorrect current password");
  }

  user.passwordHash = bcrypt.hashSync(passwordNueva, 10);
  users[username] = user;
  localStorage.setItem("users_object", JSON.stringify(users));
  console.log("✅ Password updated successfully");
};
