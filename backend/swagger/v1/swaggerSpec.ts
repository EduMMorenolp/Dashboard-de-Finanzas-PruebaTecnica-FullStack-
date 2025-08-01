import info from "./info";
import servers from "./servers";

// Schemas
import Sale from "./components/schemas/Sale";
import Expense from "./components/schemas/Expense";

// Paths
import getSales from "./paths/getSales";
import getSale from "./paths/getSale";
import createSale from "./paths/createSale";
import updateSale from "./paths/updateSale";
import deleteSale from "./paths/deleteSale";
import getExpenses from "./paths/getExpenses";
import getExpense from "./paths/getExpense";
import createExpense from "./paths/createExpense";
import updateExpense from "./paths/updateExpense";
import deleteExpense from "./paths/deleteExpense";
import loadData from "./paths/loadData";
import normalizeData from "./paths/normalizeData";

const swaggerSpec = {
  openapi: "3.0.0",
  info,
  servers,
  paths: {
    "/api/sales": getSales,
    "/api/sale/{id}": { ...getSale, ...updateSale, ...deleteSale },
    "/api/sale": createSale,
    "/api/expenses": getExpenses,
    "/api/expense/{id}": { ...getExpense, ...updateExpense, ...deleteExpense },
    "/api/expense": createExpense,
    "/api/load": loadData,
    "/api/normalize": normalizeData,
  },
  components: {
    schemas: {
      Sale,
      Expense,
    },
  },
};

export default swaggerSpec;