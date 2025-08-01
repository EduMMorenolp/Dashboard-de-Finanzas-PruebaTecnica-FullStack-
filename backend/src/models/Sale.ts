// src/models/Sale.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export interface SaleAttributes {
  id?: number;
  id_venta: string;
  currency: string;
  amount: number;
  date: string;
  description: string;
  client: string;
}

export type SaleCreationAttributes = Optional<SaleAttributes, "id">;

export class Sale extends Model<SaleAttributes> implements SaleAttributes {
  public id!: number;
  public id_venta!: string;
  public currency!: string;
  public amount!: number;
  public date!: string;
  public description!: string;
  public client!: string;
}

Sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_venta: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
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
    client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Sale",
    tableName: "sales",
    timestamps: false,
  }
);
