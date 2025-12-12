export const fetching = async (endpoint) => {
  const response = await fetch(`http://localhost:1492/${endpoint}`);
  if (!response) throw new Error("Error trayendo la data");
  return await response.json();
};
