const updateSale = {
  put: {
    tags: ["Sales"],
    summary: "Actualizar venta",
    description: "Actualiza una venta existente",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer", minimum: 1 },
        description: "ID de la venta"
      }
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Sale" }
        }
      }
    },
    responses: {
      200: {
        description: "Venta actualizada exitosamente",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Sale" }
          }
        }
      },
      400: { description: "Datos inválidos" },
      404: { description: "Venta no encontrada" },
      500: { description: "Error interno del servidor" }
    }
  }
};

export default updateSale;