import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class Expense extends Model {
  public id!: number;
  public user_id!: number;
  public amount!: number;
  public date!: Date;
}

Expense.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
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
  },
  {
    tableName: 'expenses',
    sequelize,
    timestamps: false,
  }
);

export default Expense;