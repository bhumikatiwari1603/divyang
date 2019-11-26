const Sequelize = require('sequelize')
const db = require('../database/dbConfig.js')

module.exports = db.sequelize.define(
  'user_employments',
  {
    id: {
      type: Sequelize.INTEGER(9),
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER(9),
      required: true
    },
    orgn_name: {
      type: Sequelize.STRING(100),
      required: true
    },
    designation: {
      type: Sequelize.STRING(100),
      required: true
    },
    
    from_period: {
      type: Sequelize.DATE,
      required: true
    },
    to_period: {
      type: Sequelize.DATE,
      required: true
    },
    created_on: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
)