module.exports = [
	{
		method: "GET",
		path: "/",
		handler: (req, h) => {
			return "Welcome to duya's world!!!"
		},
		config: {
			tags: ["api", "tests"],
			description: "測試接口的返回"
		}
	}
]