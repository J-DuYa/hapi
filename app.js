"use stricts";

const Hapi = require("@hapi/hapi");

require("env2")("./.env")
// routers
const duyaRoute = require("./routes/duya");

// 導入默認信息
const defaultConfig = require("./config/index");

// 引入數據据"hook"
const MODELS = require("./models");

// 引入swagger
const swagger = require("./plugins/swagger");

const server = Hapi.server({
	port: defaultConfig.port,
	host: defaultConfig.host
});

server.state('data', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: false, // remove invalid cookies
    strictHeader: true // don't allow violations of RFC 6265
});

// server.ext("onRequest", function(request, h) {
// 	// 出發
// 	// console.log("我想看看這個怎麽出發的？"); // 在請求的時候返回這個東西， 可能明白了點 - | - 
// 	// 可以在請求之前加的數據可以在這裏處理
// 	// request.setUrl("/hello");
// 	return h.continue;
// });

const init = async () => {

	// 初始化數據庫
	let sequelize = MODELS.sequelize;

	await server.register([
		...swagger
	]);

	server.route([...duyaRoute])

	sequelize.sync({ force: false }).then(() => {
		console.log("connection database successed");
	}).catch(err => {
		console.log("connection database failed: %s", err);
	});

	await server.start();

	console.log("Server running on %s", server.info.uri)
};

process.on("unHandledRejection", (err) => {
	console.log(err);
	process.exit(1);
});

init();
