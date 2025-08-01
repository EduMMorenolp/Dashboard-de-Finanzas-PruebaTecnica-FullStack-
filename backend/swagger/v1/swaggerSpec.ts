import info from "./info";
import servers from "./servers";

// Schemas
import Sale from "./components/schemas/Sale";
import Expense from "./components/schemas/Expense";

// Paths
import getSales from "./paths/getSales";
import getExpenses from "./paths/getExpenses";
import loadData from "./paths/loadData";

const swaggerSpec = {
  openapi: "3.0.0",
  info,
  servers,
  paths: {
    "/api/sales": getSales,
    "/api/expenses": getExpenses,
    "/api/load": loadData,
  },
  components: {
    schemas: {
      Sale,
      Expense,
    },
  },
};

export default swaggerSpec;