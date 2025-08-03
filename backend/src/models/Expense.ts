// src/models/Expense.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export interface ExpenseAttributes {
  id?: number;
  currency: string;
  amount: number;
  date: string;
  description: string;
  provider: string;
}

export type ExpenseCreationAttributes = Optional<ExpenseAttributes, "id">;

export class Expense
  extends Model<ExpenseAttributes>
  implements ExpenseAttributes
{
  public id!: number;
  public currency!: string;
  public amount!: number;
  public date!: string;
  public description!: string;
  public provider!: string;
}

Expense.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Expense",
    tableName: "expenses",
    timestamps: false,
  }
);
