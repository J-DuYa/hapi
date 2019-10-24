"use stricts";

const Hapi = require("@hapi/hapi");

require("env2")("./.env")
// routers
const duyaRoute = require("./routes/duya");

// 導入默認信息
const defaultConfig = require("./config/index");

const server = Hapi.server({
	port: defaultConfig.port,
	host: defaultConfig.host
});

server.ext("onRequest", function(request, h) {
	// 出發
	console.log("我想看看這個怎麽出發的？"); // 在請求的時候返回這個東西， 可能明白了點 - | - 
	// 可以在請求之前加的數據可以在這裏處理
	// request.setUrl("/hello");
	return h.continue;
});

// 創建人生hapi的第一個插件
const getDate = {
	name: "getDate",
	version: "1.0.0",
	register: async function(server, option) {
		const currentDate = function() {
			const date = new Date(); // 獲取當前的時間
			return date;
		};

		server.decorate("toolkit", "getDate", currentDate);
	}
};

// 使用cookies
server.state("data", {
	ttl: null,
	isSecure: true,
	isHttpOnly: true
});

const init = async () => {

	await server.start();

	// 在server中注冊它
	server.register({
		plugin: getDate
	});

	console.log("Server running on %s", server.info.uri)
};

server.route([...duyaRoute])

process.on("unHandledRejection", (err) => {
	console.log(err);
	process.exit(1);
});

init();