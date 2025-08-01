const getMetrics = {
  get: {
    tags: ["Metrics"],
    summary: "Obtener métricas financieras",
    description: "Retorna métricas financieras agregadas por período",
    parameters: [
      {
        name: "period",
        in: "query",
        schema: { 
          type: "string", 
          enum: ["day", "week", "month", "year"],
          default: "month"
        },
        description: "Período de tiempo para calcular métricas"
      }
    ],
    responses: {
      200: {
        description: "Métricas obtenidas exitosamente",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                sales: {
                  type: "object",
                  properties: {
                    ARS: { type: "number" },
                    USD: { type: "number" }
                  }
                },
                expenses: {
                  type: "object",
                  properties: {
                    ARS: { type: "number" },
                    USD: { type: "number" }
                  }
                },
                profit: {
                  type: "object",
                  properties: {
                    ARS: { type: "number" },
                    USD: { type: "number" }
                  }
                }
              }
            }
          }
        }
      },
      500: { description: "Error interno del servidor" }
    }
  }
};

export default getMetrics;