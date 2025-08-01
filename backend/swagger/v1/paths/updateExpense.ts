const updateExpense = {
  put: {
    tags: ["Expenses"],
    summary: "Actualizar gasto",
    description: "Actualiza un gasto existente",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer", minimum: 1 },
        description: "ID del gasto"
      }
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Expense" }
        }
      }
    },
    responses: {
      200: {
        description: "Gasto actualizado exitosamente",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Expense" }
          }
        }
      },
      400: { description: "Datos inválidos" },
      404: { description: "Gasto no encontrado" },
      500: { description: "Error interno del servidor" }
    }
  }
};

export default updateExpense;