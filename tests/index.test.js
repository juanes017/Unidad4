import request from "supertest";
import app from "../src/app"; // Asegúrate de que la ruta de importación sea correcta

describe("GET /clientes", () => {
  it("debería responder con un código de estado 200 y un arreglo de clientes", async () => {
    const respuesta = await request(app).get("/clientes").send();
    expect(respuesta.statusCode).toBe(200); // Verificamos el código de estado 200
    expect(respuesta.body).toBeInstanceOf(Array); // Verificamos que la respuesta sea un arreglo
    expect(respuesta.body.length).toBeGreaterThan(0); // Verificamos que haya al menos un cliente
  });
});

describe("POST /clientes", () => {
  const nuevoCliente = {
    nombre_cliente: "Carlos Pérez",
    direccion_cliente: "Calle Nueva 100",
    celular_cliente: "555-1234",
  };

  it("debería responder con un código de estado 200 y devolver el cliente creado", async () => {
    const respuesta = await request(app).post("/clientes").send(nuevoCliente);
    expect(respuesta.statusCode).toBe(200); // Verificamos el código de estado 200
    expect(respuesta.body).toHaveProperty("id_cliente"); // Verificamos que la respuesta tenga el ID
    expect(respuesta.body.nombre_cliente).toBe(nuevoCliente.nombre_cliente); // Verificamos el nombre
  });

  it("debería responder con un código 400 cuando faltan campos requeridos", async () => {
    const clienteInvalido = { nombre_cliente: "Juan" }; // Falta dirección y celular
    const respuesta = await request(app).post("/clientes").send(clienteInvalido);
    expect(respuesta.statusCode).toBe(400); // Esperamos un código 400 por error de validación
  });
});

describe("PUT /clientes/:id", () => {
  const clienteActualizado = {
    nombre_cliente: "Carlos Gómez",
    direccion_cliente: "Calle Actualizada 200",
    celular_cliente: "555-0000",
  };

  it("debería actualizar correctamente un cliente", async () => {
    const clienteId = 1; // Asumimos que el cliente con ID 1 existe en la base de datos
    const respuesta = await request(app).put(`/clientes/${clienteId}`).send(clienteActualizado);
    expect(respuesta.statusCode).toBe(200); // Verificamos el código de estado 200
    expect(respuesta.body.nombre_cliente).toBe(clienteActualizado.nombre_cliente); // Verificamos el nombre
    expect(respuesta.body.direccion_cliente).toBe(clienteActualizado.direccion_cliente); // Verificamos la dirección
  });

  it("debería responder con un código 404 si el cliente no existe", async () => {
    const clienteInexistenteId = 999; // ID que no existe
    const respuesta = await request(app).put(`/clientes/${clienteInexistenteId}`).send(clienteActualizado);
    expect(respuesta.statusCode).toBe(404); // Esperamos un error 404 por cliente no encontrado
  });
});
