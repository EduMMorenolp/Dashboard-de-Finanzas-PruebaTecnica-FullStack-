const deleteSale = {
  delete: {
    tags: ["Sales"],
    summary: "Eliminar venta",
    description: "Elimina una venta del sistema",
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
        description: "Venta eliminada exitosamente",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string", example: "Venta eliminada" }
              }
            }
          }
        }
      },
      400: { description: "ID inválido" },
      404: { description: "Venta no encontrada" },
      500: { description: "Error interno del servidor" }
    }
  }
};

export default deleteSale;