const getExpense = {
  get: {
    tags: ["Expenses"],
    summary: "Obtener gasto por ID",
    description: "Retorna un gasto específico por su ID",
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
        description: "Gasto encontrado",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Expense" }
          }
        }
      },
      400: { description: "ID inválido" },
      404: { description: "Gasto no encontrado" },
      500: { description: "Error interno del servidor" }
    }
  }
};

export default getExpense;