const getSale = {
  get: {
    tags: ["Sales"],
    summary: "Obtener venta por ID",
    description: "Retorna una venta específica por su ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer", minimum: 1 },
        description: "ID de la venta"
      }
    ],
    responses: {
      200: {
        description: "Venta encontrada",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Sale" }
          }
        }
      },
      400: { description: "ID inválido" },
      404: { description: "Venta no encontrada" },
      500: { description: "Error interno del servidor" }
    }
  }
};

export default getSale;