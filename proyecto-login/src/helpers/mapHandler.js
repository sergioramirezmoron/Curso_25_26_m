import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export const registrarUsuario = (username, password, tipo) => {
  if (!username || !password) throw new Error("All fields are mandatory");

  if (tipo.toLowerCase() === "map") {
    const stored = localStorage.getItem("users_map");
    const usersMap = stored ? new Map(JSON.parse(stored)) : new Map();

    if (usersMap.has(username)) {
      throw new Error(`Username '${username}' already exists`);
    }

    const newUser = {
      id: uuidv4(),
      username,
      passwordHash: bcrypt.hashSync(password, 10),
    };

    usersMap.set(username, newUser);
    localStorage.setItem(
      "users_map",
      JSON.stringify(Array.from(usersMap.entries()))
    );
    console.log("✅ User registered successfully (map)");
  } else {
    throw new Error("Invalid type, expected map");
  }
};

export const loginUsuario = (username, password, tipo) => {
  if (tipo.toLowerCase() !== "map") {
    throw new Error("Invalid type");
  }

  const stored = localStorage.getItem("users_map");
  const usersMap = stored ? new Map(JSON.parse(stored)) : new Map();

  if (!usersMap.has(username)) {
    throw new Error("❌ User not found");
  }

  const user = usersMap.get(username);
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
  if (tipo.toLowerCase() !== "map") throw new Error("Invalid type");

  const stored = localStorage.getItem("users_map");
  const usersMap = stored ? new Map(JSON.parse(stored)) : new Map();

  if (!usersMap.has(username)) {
    throw new Error("❌ User not found");
  }

  const user = usersMap.get(username);
  const valid = bcrypt.compareSync(passwordActual, user.passwordHash);
  if (!valid) {
    throw new Error("❌ Incorrect current password");
  }

  user.passwordHash = bcrypt.hashSync(passwordNueva, 10);
  usersMap.set(username, user);
  localStorage.setItem(
    "users_map",
    JSON.stringify(Array.from(usersMap.entries()))
  );
  console.log("✅ Password updated successfully");
};
