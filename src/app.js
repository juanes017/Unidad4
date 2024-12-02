const express = require("express");
const app = express();

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(express.json());

// Simulando una base de datos en memoria
let clientes = [
  { id_cliente: 1, nombre_cliente: "Juan Pérez", direccion_cliente: "Calle Falsa 123", celular_cliente: "555-1234" }
];

// Ruta GET para obtener todos los clientes
app.get("/clientes", (req, res) => {
  res.status(200).json(clientes); // Respondemos con el arreglo de clientes
});

// Ruta POST para crear un nuevo cliente
app.post("/clientes", (req, res) => {
  const { nombre_cliente, direccion_cliente, celular_cliente } = req.body;

  // Validación de los campos requeridos
  if (!nombre_cliente || !direccion_cliente || !celular_cliente) {
    return res.status(400).json({ error: "Se requieren todos los campos" });
  }

  // Creamos un nuevo cliente
  const nuevoCliente = {
    id_cliente: clientes.length + 1, // Generamos un nuevo ID
    nombre_cliente,
    direccion_cliente,
    celular_cliente
  };

  // Guardamos el cliente en la "base de datos"
  clientes.push(nuevoCliente);

  // Respondemos con el cliente creado
  res.status(200).json(nuevoCliente);
});

// Ruta PUT para actualizar un cliente completo
app.put("/clientes/:id", (req, res) => {
  const clienteId = parseInt(req.params.id);
  const { nombre_cliente, direccion_cliente, celular_cliente } = req.body;

  const cliente = clientes.find(c => c.id_cliente === clienteId);

  // Si el cliente no existe, respondemos con un error 404
  if (!cliente) {
    return res.status(404).json({ error: "Cliente no encontrado" });
  }

  // Actualizamos el cliente
  cliente.nombre_cliente = nombre_cliente;
  cliente.direccion_cliente = direccion_cliente;
  cliente.celular_cliente = celular_cliente;

  // Respondemos con el cliente actualizado
  res.status(200).json(cliente);
});

// Middleware para manejar errores 404 (si la ruta no existe)
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Iniciamos el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app; // Exporta la aplicación para usarla en las pruebas
