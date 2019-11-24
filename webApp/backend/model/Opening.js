const Sequelize = require('sequelize')
const db = require('../database/dbConfig.js')

module.exports = db.sequelize.define(
  'opening',
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
    job_title: {
      type: Sequelize.STRING(150),
      required: true
    },
    job_descr: {
      type: Sequelize.STRING(200),
      required: true
    },
    job_location: {
      type: Sequelize.STRING(150),
      required: true
    },
    skills_required: {
      type: Sequelize.STRING(150),
      required: true
    },
    job_status: {
      type: Sequelize.ENUM,
      values:['open','close'],
      defaultValue:'open'
    },
    closing_dt: {
      type: Sequelize.DATEONLY,
      
    },
    created_on: {
      type: Sequelize.DATEONLY
    }
  },
  {
    timestamps: false
  }
)