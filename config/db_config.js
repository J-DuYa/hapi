//db_config.js
"use strict";
const env2 = require("env2");

if(process.env.NODE_ENV === "production") {
	env2("./.env.prod");
} else {
	env2("./.env");
};

// 配置不同環境下的數據庫信息
const { env } = process;

module.exports = {
    development: {
		database: env.MYSQL_DB_NAME,//库名
	    username: env.MYSQL_USERNAME,//用户名
	    password: env.MYSQL_PASSWORD,//密码
	    host: env.MYSQL_HOST,//数据库地址
	    port: env.MYSQL_PORT,// 數據庫的端口
	    dialect: "mysql",//数据库类型
	    operatorsAliase: false,
	    pool: {
		    max: 5,
		    min: 0,
		    idle: 10000
		},
		define: {
		    timestamps: true,
		    underscored: true,
		    underscoredAll: true,
		},
    },
    production: {
		database: env.MYSQL_DB_NAME,//库名
	    username: env.MYSQL_USERNAME,//用户名
	    password: env.MYSQL_PASSWORD,//密码
	    host: env.MYSQL_HOST,//数据库地址
	    port: env.MYSQL_PORT,// 數據庫的端口
	    dialect: "mysql",//数据库类型
	    operatorsAliase: false,
	    pool: {
		    max: 5,
		    min: 0,
		    idle: 10000
		},
		define: {
		    timestamps: true,
		    underscored: true,
		    underscoredAll: true,
		},
    }
}