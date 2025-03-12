import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public role!: string;
  public trip_start_date!: Date;
  public trip_end_date!: Date;
    balance: any;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    trip_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    trip_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: false,
  }
);

export default User;