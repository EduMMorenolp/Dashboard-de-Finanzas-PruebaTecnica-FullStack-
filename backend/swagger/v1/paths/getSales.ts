const getSales = {
  get: {
    tags: ["Sales"],
    summary: "Obtener todas las ventas",
    description: "Retorna una lista de todas las ventas registradas",
    responses: {
      200: {
        description: "Lista de ventas obtenida exitosamente",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Sale"
              }
            }
          }
        }
      },
      500: {
        description: "Error interno del servidor"
      }
    }
  }
};

export default getSales;