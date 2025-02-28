import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('TravelLedge', 'postgres', 'lukecage1244', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;