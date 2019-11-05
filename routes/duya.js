const models = require("../models");

module.exports = [
	{
		method: "GET",
		path: "/css/index.css",
		handler: {
			file: "views/css/index.css"
		}
	},
	{
		method: "GET",
		path: "/home",
		handler: {
			file: "views/home.html"
		}
	},
	{
		method: "GET",
		path: "/svg/game.svg",
		handler: {
			file: "views/svg/game.svg"
		}
	},
	{
		method: "GET",
		path: "/queryUserList",
		handler: async (req, h) => {
			const result = await models.user.findAll();
			return result;
		},
		config: {
			tags: ["api", "tests"],
			description: "測試接口的返回"
		}
	},
	{
		method: "GET",
		path: "/test/cookies",
		handler: (req, h) => {
			// const value = req.state.data
			return "cookies";
		},
		config: {
			tags: ["api", "tests"],
			description: "测试cookies"
		}
	}
]