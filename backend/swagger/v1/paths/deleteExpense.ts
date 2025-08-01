const deleteExpense = {
  delete: {
    tags: ["Expenses"],
    summary: "Eliminar gasto",
    description: "Elimina un gasto del sistema",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer", minimum: 1 },
        description: "ID del gasto"
      }
    ],
    responses: {
      200: {
        description: "Gasto eliminado exitosamente",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string", example: "Gasto eliminado" }
              }
            }
          }
        }
      },
      400: { description: "ID inválido" },
      404: { description: "Gasto no encontrado" },
      500: { description: "Error interno del servidor" }
    }
  }
};

export default deleteExpense;