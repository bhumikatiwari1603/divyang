const Sequelize = require('sequelize')
const db = require('../database/dbConfig.js')

module.exports = db.sequelize.define(
  'user_application',
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
    opening_id: {
      type: Sequelize.INTEGER(9),
      required: true
    },
    created_on: {
      type: Sequelize.DATEONLY
    }
  },
  {
    timestamps: false
  }
)