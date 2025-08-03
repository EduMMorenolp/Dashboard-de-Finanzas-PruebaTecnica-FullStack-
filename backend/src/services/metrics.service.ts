import { Sale } from "../models/Sale";
import { Expense } from "../models/Expense";
import { Op } from "sequelize";

/**
 * Calcula el rango de fechas basado en el período especificado.
 * @param period El período de tiempo (day, week, month, year).
 * @returns Objeto con fechas de inicio y fin del período.
 */
const getDateRange = async (period: string) => {
  const [latestSale, latestExpense, earliestSale, earliestExpense] =
    await Promise.all([
      Sale.findOne({ order: [["date", "DESC"]] }),
      Expense.findOne({ order: [["date", "DESC"]] }),
      Sale.findOne({ order: [["date", "ASC"]] }),
      Expense.findOne({ order: [["date", "ASC"]] }),
    ]);

  const latestDate = new Date(
    Math.max(
      new Date(latestSale?.date || "2025-01-01").getTime(),
      new Date(latestExpense?.date || "2025-01-01").getTime()
    )
  );

  const earliestDate = new Date(
    Math.min(
      new Date(earliestSale?.date || "2025-01-01").getTime(),
      new Date(earliestExpense?.date || "2025-01-01").getTime()
    )
  );

  let startDate: Date;

  switch (period) {
    case "day":
      // Últimos 7 días
      startDate = new Date(latestDate.getTime() - 6 * 24 * 60 * 60 * 1000);
      break;
    case "week":
      // Últimas 4 semanas (28 días)
      startDate = new Date(latestDate.getTime() - 27 * 24 * 60 * 60 * 1000);
      break;
    case "month":
      // Últimos 12 meses
      startDate = new Date(
        latestDate.getFullYear(),
        latestDate.getMonth() - 11,
        1
      );
      break;
    case "year":
      // Todos los años disponibles
      startDate = earliestDate;
      break;
    default:
      startDate = new Date(latestDate.getFullYear(), 0, 1);
  }

  return { startDate, endDate: latestDate };
};

/**
 * Obtiene datos organizados para gráficos según el período.
 * @param period El período de agrupación (day, week, month, year).
 * @returns Datos de ventas y gastos agrupados por fecha y moneda.
 */
export const getChartData = async (period: string) => {
  try {
    const { startDate, endDate } = await getDateRange(period);

    if (period === "year") {
      // Para año, agrupar por año
      const [salesByYear, expensesByYear] = await Promise.all([
        Sale.findAll({
          attributes: [
            [
              Sale.sequelize!.fn(
                "EXTRACT",
                Sale.sequelize!.literal('YEAR FROM "date"')
              ),
              "year",
            ],
            "currency",
            [Sale.sequelize!.fn("SUM", Sale.sequelize!.col("amount")), "total"],
          ],
          where: { date: { [Op.between]: [startDate, endDate] } },
          group: [
            Sale.sequelize!.fn(
              "EXTRACT",
              Sale.sequelize!.literal('YEAR FROM "date"')
            ),
            "currency",
          ],
          order: [
            [
              Sale.sequelize!.fn(
                "EXTRACT",
                Sale.sequelize!.literal('YEAR FROM "date"')
              ),
              "ASC",
            ],
          ],
        }),
        Expense.findAll({
          attributes: [
            [
              Expense.sequelize!.fn(
                "EXTRACT",
                Expense.sequelize!.literal('YEAR FROM "date"')
              ),
              "year",
            ],
            "currency",
            [
              Expense.sequelize!.fn("SUM", Expense.sequelize!.col("amount")),
              "total",
            ],
          ],
          where: { date: { [Op.between]: [startDate, endDate] } },
          group: [
            Expense.sequelize!.fn(
              "EXTRACT",
              Expense.sequelize!.literal('YEAR FROM "date"')
            ),
            "currency",
          ],
          order: [
            [
              Expense.sequelize!.fn(
                "EXTRACT",
                Expense.sequelize!.literal('YEAR FROM "date"')
              ),
              "ASC",
            ],
          ],
        }),
      ]);

      const salesData = salesByYear.map((sale: any) => ({
        date: `${sale.getDataValue("year")}-01-01`,
        amount: parseFloat(sale.getDataValue("total")),
        currency: sale.currency,
      }));

      const expensesData = expensesByYear.map((expense: any) => ({
        date: `${expense.getDataValue("year")}-01-01`,
        amount: parseFloat(expense.getDataValue("total")),
        currency: expense.currency,
      }));

      return { sales: salesData, expenses: expensesData };
    }

    if (period === "month") {
      // Para mes, agrupar por mes
      const [salesByMonth, expensesByMonth] = await Promise.all([
        Sale.findAll({
          attributes: [
            [
              Sale.sequelize!.fn(
                "DATE_TRUNC",
                "month",
                Sale.sequelize!.col("date")
              ),
              "month",
            ],
            "currency",
            [Sale.sequelize!.fn("SUM", Sale.sequelize!.col("amount")), "total"],
          ],
          where: { date: { [Op.between]: [startDate, endDate] } },
          group: [
            Sale.sequelize!.fn(
              "DATE_TRUNC",
              "month",
              Sale.sequelize!.col("date")
            ),
            "currency",
          ],
          order: [
            [
              Sale.sequelize!.fn(
                "DATE_TRUNC",
                "month",
                Sale.sequelize!.col("date")
              ),
              "ASC",
            ],
          ],
        }),
        Expense.findAll({
          attributes: [
            [
              Expense.sequelize!.fn(
                "DATE_TRUNC",
                "month",
                Expense.sequelize!.col("date")
              ),
              "month",
            ],
            "currency",
            [
              Expense.sequelize!.fn("SUM", Expense.sequelize!.col("amount")),
              "total",
            ],
          ],
          where: { date: { [Op.between]: [startDate, endDate] } },
          group: [
            Expense.sequelize!.fn(
              "DATE_TRUNC",
              "month",
              Expense.sequelize!.col("date")
            ),
            "currency",
          ],
          order: [
            [
              Expense.sequelize!.fn(
                "DATE_TRUNC",
                "month",
                Expense.sequelize!.col("date")
              ),
              "ASC",
            ],
          ],
        }),
      ]);

      const salesData = salesByMonth.map((sale: any) => ({
        date: sale.getDataValue("month"),
        amount: parseFloat(sale.getDataValue("total")),
        currency: sale.currency,
      }));

      const expensesData = expensesByMonth.map((expense: any) => ({
        date: expense.getDataValue("month"),
        amount: parseFloat(expense.getDataValue("total")),
        currency: expense.currency,
      }));

      return { sales: salesData, expenses: expensesData };
    }

    if (period === "week") {
      // Para semana, agrupar por semana
      const [salesByWeek, expensesByWeek] = await Promise.all([
        Sale.findAll({
          attributes: [
            [Sale.sequelize!.fn('DATE_TRUNC', 'week', Sale.sequelize!.col('date')), 'week'],
            'currency',
            [Sale.sequelize!.fn('SUM', Sale.sequelize!.col('amount')), 'total']
          ],
          where: { date: { [Op.between]: [startDate, endDate] } },
          group: [Sale.sequelize!.fn('DATE_TRUNC', 'week', Sale.sequelize!.col('date')), 'currency'],
          order: [[Sale.sequelize!.fn('DATE_TRUNC', 'week', Sale.sequelize!.col('date')), 'ASC']]
        }),
        Expense.findAll({
          attributes: [
            [Expense.sequelize!.fn('DATE_TRUNC', 'week', Expense.sequelize!.col('date')), 'week'],
            'currency',
            [Expense.sequelize!.fn('SUM', Expense.sequelize!.col('amount')), 'total']
          ],
          where: { date: { [Op.between]: [startDate, endDate] } },
          group: [Expense.sequelize!.fn('DATE_TRUNC', 'week', Expense.sequelize!.col('date')), 'currency'],
          order: [[Expense.sequelize!.fn('DATE_TRUNC', 'week', Expense.sequelize!.col('date')), 'ASC']]
        })
      ]);

      const salesData = salesByWeek.map((sale: any) => ({
        date: sale.getDataValue('week'),
        amount: parseFloat(sale.getDataValue('total')),
        currency: sale.currency
      }));

      const expensesData = expensesByWeek.map((expense: any) => ({
        date: expense.getDataValue('week'),
        amount: parseFloat(expense.getDataValue('total')),
        currency: expense.currency
      }));

      return { sales: salesData, expenses: expensesData };
    }

    // Para day, agrupar por día
    const [salesByDay, expensesByDay] = await Promise.all([
      Sale.findAll({
        attributes: [
          'date',
          'currency',
          [Sale.sequelize!.fn('SUM', Sale.sequelize!.col('amount')), 'total']
        ],
        where: { date: { [Op.between]: [startDate, endDate] } },
        group: ['date', 'currency'],
        order: [['date', 'ASC']]
      }),
      Expense.findAll({
        attributes: [
          'date',
          'currency',
          [Expense.sequelize!.fn('SUM', Expense.sequelize!.col('amount')), 'total']
        ],
        where: { date: { [Op.between]: [startDate, endDate] } },
        group: ['date', 'currency'],
        order: [['date', 'ASC']]
      })
    ]);

    const salesData = salesByDay.map((sale: any) => ({
      date: sale.date,
      amount: parseFloat(sale.getDataValue('total')),
      currency: sale.currency
    }));

    const expensesData = expensesByDay.map((expense: any) => ({
      date: expense.date,
      amount: parseFloat(expense.getDataValue('total')),
      currency: expense.currency
    }));

    return { sales: salesData, expenses: expensesData };
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw new Error("Failed to fetch chart data");
  }
};

/**
 * Calcula métricas financieras resumidas para el período especificado.
 * @param period El período para calcular las métricas (day, week, month, year).
 * @returns Totales de ventas, gastos y ganancias separados por moneda.
 */
export const getFinancialMetrics = async (period: string) => {
  try {
    const { startDate, endDate } = await getDateRange(period);

    const [salesARS, salesUSD, expensesARS, expensesUSD] = await Promise.all([
      Sale.sum("amount", {
        where: {
          currency: "ARS",
          date: { [Op.between]: [startDate, endDate] },
        },
      }),
      Sale.sum("amount", {
        where: {
          currency: "USD",
          date: { [Op.between]: [startDate, endDate] },
        },
      }),
      Expense.sum("amount", {
        where: {
          currency: "ARS",
          date: { [Op.between]: [startDate, endDate] },
        },
      }),
      Expense.sum("amount", {
        where: {
          currency: "USD",
          date: { [Op.between]: [startDate, endDate] },
        },
      }),
    ]);

    return {
      sales: { ARS: salesARS || 0, USD: salesUSD || 0 },
      expenses: { ARS: expensesARS || 0, USD: expensesUSD || 0 },
      profit: {
        ARS: (salesARS || 0) - (expensesARS || 0),
        USD: (salesUSD || 0) - (expensesUSD || 0),
      },
    };
  } catch (error) {
    console.error("Error fetching financial metrics:", error);
    throw new Error("Failed to fetch financial metrics");
  }
};
