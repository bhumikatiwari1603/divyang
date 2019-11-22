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
    university_name: {
      type: Sequelize.STRING(100),
      required: true
    },
    degree_level: {
      type: Sequelize.STRING(100),
      required: true
    },
    qualification_name: {
      type: Sequelize.STRING(100),
      required: true
    },
    start_dt: {
      type: Sequelize.DATE,
      required: true
    },
    completion_dt: {
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