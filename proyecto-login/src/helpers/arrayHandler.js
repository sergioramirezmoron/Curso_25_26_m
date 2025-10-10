import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export const registrarUsuario = (username, password, tipo) => {
  if (!username || !password) {
    throw new Error("❌ All fields are mandatory");
  }

  if (tipo.toLowerCase() === "array") {
    const stored = localStorage.getItem("users_array");
    const users = stored ? JSON.parse(stored) : [];

    if (users.find((user) => user.username === username)) {
      throw new Error("❌ Username already exists");
    }

    const newUser = {
      id: uuidv4(),
      username,
      passwordHash: bcrypt.hashSync(password, 10),
    };

    users.push(newUser);
    localStorage.setItem("users_array", JSON.stringify(users));

    console.log("✅ User registered successfully");
  } else {
    throw new Error("❌ Invalid type, expected an array");
  }
};

export const loginUsuario = (username, password, tipo) => {
  if (tipo.toLowerCase() !== "array") {
    throw new Error("❌ Invalid type, expected an array");
  }

  const stored = localStorage.getItem("users_array");
  const users = stored ? JSON.parse(stored) : [];

  const user = users.find((u) => u.username === username);

  if (!user) {
    throw new Error("❌ User not found");
  }

  const passwordOk = bcrypt.compareSync(password, user.passwordHash);
  if (!passwordOk) {
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
  if (tipo.toLowerCase() !== "array") {
    throw new Error("❌ Invalid type, expected an array");
  }

  const stored = localStorage.getItem("users_array");
  const users = stored ? JSON.parse(stored) : [];

  const user = users.find((u) => u.username === username);

  if (!user) {
    throw new Error("❌ User not found");
  }

  const passwordOk = bcrypt.compareSync(passwordActual, user.passwordHash);
  if (!passwordOk) {
    throw new Error("❌ Incorrect current password");
  }

  user.passwordHash = bcrypt.hashSync(passwordNueva, 10);
  localStorage.setItem("users_array", JSON.stringify(users));

  console.log("✅ Password changed successfully");
};
