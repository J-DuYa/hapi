const Hapi = require("@hapi/hapi");

const server = Hapi.server({
	port: "3000",
	host: "localhost"
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
	server.route({
		method: "GET",
		path: "/test",
		handler: async (req, h) => {
			// console.log("我看看這裏面有什麽：", req, h);
			console.log("我想使用插件：", h.getDate)
			await h.state("data", {username: "duya"})
			return {
				name: req.query.name,
				time: h.getDate()
			}
		}
	})

	await server.start();

	// 在server中注冊它
	server.register({
		plugin: getDate
	});

	console.log("Server running on %s", server.info.uri)
};

process.on("unHandledRejection", (err) => {
	console.log(err);
	process.exit(1);
});

init();