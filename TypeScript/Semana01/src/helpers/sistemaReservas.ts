// Crear un sistema de reservas de un restaurante
// Debe tener:
// Un map con clave La fecha en formato YYYY-MM-DD y el valor es un Set con los nombres de los clientes que han reservado ese día.

// funciones
// Agregar reservar
// Cancelar reserva
// Mostrar reservas
// Estadísticas (reservas por dia, reservas totales, media de reservas)

const reservas = new Map<string, Set<string>>();

const addReservations = (date: string, username: string): boolean => {
  if (!reservas.has(date)) {
    reservas.set(date, new Set<string>());
  }
  const clientesHoy = reservas.get(date);
  if(clientesHoy?.has(username)){
    console.log("Ya tienes una reserva para hoy");
  }
  return false;
};

const deleteReservations = (date: string, username: string): void => {
  const clients = reservas.get(date);
  clients?.delete(username);
  if (clients?.size === 0) {
    reservas.delete(date);
  }
};

const showReservations = (): void => {
  for (const [fecha, clientes] of reservas) {
    console.log(`${fecha}: ${Array.from(clientes)}`);
  }
  if (reservas.size === 0) {
    console.log("No hay reservas");
  }
};

const showStats = (): void => {
  let totalReservas: number = 0;
  let mediaReservas: number = 0;
  let reservasPorDia: { [fecha: string]: number } = {};

  for (const [fecha, clientes] of reservas) {
    reservasPorDia[fecha] = clientes.size;
    totalReservas += clientes.size;
  }

  mediaReservas = reservas.size > 0 ? totalReservas / reservas.size : 0;

  console.log("Reservas por día:", reservasPorDia);
  console.log("Reservas totales:", totalReservas);
  console.log("Media de reservas al día:", mediaReservas);

  if (reservas.size === 0) {
    console.log("No hay reservas");
  }
};
