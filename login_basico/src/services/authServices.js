// Crear función que valide que username y password son correctos usando las siguientes restricciones.
// 1. No pueden estar vacías.
// 2. Password > 3 caractéres.
// 3. Username y Password están en el localStorage
// Nota: Siempre trimmear la data del formulario

import { getUsers } from "../helpers/storage";
import bcrypt from "bcryptjs";

export const validateCredentials = (username, password) => {
  if (!username.trim() || !password.trim() || password.trim().length < 3) {
    return false;
  }

  const users = getUsers();

  const user = users.find((u) => u.username === username.trim());
  if (!user) {
    return false;
  }
  const ok = bcrypt.compareSync(password.trim(), user.passwordHash);
  return ok;
};
