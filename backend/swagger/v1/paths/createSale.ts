const createSale = {
  post: {
    tags: ["Sales"],
    summary: "Crear nueva venta",
    description: "Crea una nueva venta en el sistema",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Sale" }
        }
      }
    },
    responses: {
      201: {
        description: "Venta creada exitosamente",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Sale" }
          }
        }
      },
      400: { description: "Datos inválidos" },
      500: { description: "Error interno del servidor" }
    }
  }
};

export default createSale;