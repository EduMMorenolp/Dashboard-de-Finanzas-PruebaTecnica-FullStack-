import { Sale } from "../models/Sale";
import { Expense } from "../models/Expense";
import { Op } from "sequelize";

const getDateRange = (period: string) => {
  const now = new Date();
  let startDate: Date;

  switch (period) {
    case "day":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "year":
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default: // month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  return { startDate, endDate: now };
};

export const getChartData = async (period: string) => {
  const { startDate, endDate } = getDateRange(period);

  const [sales, expenses] = await Promise.all([
    // amazonq-ignore-next-line
    Sale.findAll({
      where: { date: { [Op.between]: [startDate, endDate] } },
      order: [["date", "ASC"]]
    }),
    Expense.findAll({
      where: { date: { [Op.between]: [startDate, endDate] } },
      order: [["date", "ASC"]]
    })
  ]);

  const salesData = sales.map(sale => ({
    date: sale.date,
    amount: sale.amount,
    currency: sale.currency
  }));

  const expensesData = expenses.map(expense => ({
    date: expense.date,
    amount: expense.amount,
    currency: expense.currency
  }));

  return { sales: salesData, expenses: expensesData };
};

export const getFinancialMetrics = async (period: string) => {
  const { startDate, endDate } = getDateRange(period);

  const [salesARS, salesUSD, expensesARS, expensesUSD] = await Promise.all([
    Sale.sum("amount", { where: { currency: "ARS", date: { [Op.between]: [startDate, endDate] } } }),
    Sale.sum("amount", { where: { currency: "USD", date: { [Op.between]: [startDate, endDate] } } }),
    Expense.sum("amount", { where: { currency: "ARS", date: { [Op.between]: [startDate, endDate] } } }),
    Expense.sum("amount", { where: { currency: "USD", date: { [Op.between]: [startDate, endDate] } } })
  ]);

  return {
    sales: { ARS: salesARS || 0, USD: salesUSD || 0 },
    expenses: { ARS: expensesARS || 0, USD: expensesUSD || 0 },
    profit: { 
      ARS: (salesARS || 0) - (expensesARS || 0), 
      USD: (salesUSD || 0) - (expensesUSD || 0) 
    }
  };
};