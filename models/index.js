// 創建第一個hapi的sequelize對象
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const configs = require("./../config/db_config");

const basename = path.basename(__filename);

const env = process.env.NODE_ENV || "development";

const config= {
	...configs[env],
	define: {
		underscored: true
	}
};

let db = {};
let sequelize = null;

if(config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	console.log(config.database, config.username, config.password,config);
	sequelize = new Sequelize(config.database, config.username, config.password, {
		port: "3306",
		dialect:'mysql',
		pool:{
	        max:5,
	        min:0,
	        idle:30000
	    }
	});
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return file.indexOf(".") && file !== "index.js";
	}).forEach((file) => {
		const model =  sequelize["import"](path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if(db[modelName].associate) {
		db[modelName].associate(db);
	}
})	

db.sequelize = sequelize;

module.exports = db;  