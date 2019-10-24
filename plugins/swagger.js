// 2019/10/24 存放hapi-swagger配置
const inert =  require("@hapi/inert");
const vision = require("@hapi/vision");
const package = require("package");
const hapiSwagger = require("hapi-swagger");

module.exports = [
	inert,
	vision,
	{
		plugin: hapiSwagger,
		option: {
			info: {
				title: "接口文檔",
				version: package.version
			},
			grouping: "tags",
			tags: [
				{
					name: "tests",
					description: "測試相關"
				}
			]
		}
	}
];