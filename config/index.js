"use stricts";

// 獲取默認信息
const { env } = process;

// 配置文件信息
module.exports = {
	host: env.HOST,
	port: env.PORT
}