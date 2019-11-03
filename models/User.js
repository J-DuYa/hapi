// 先試試看這個簡單的user查詢
module.exports = function(sequelize, Datatypes) {
	const User = sequelize.define("user", {
		id: {
			type: Datatypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true
		},
		name: Datatypes.STRING,
		sex: Datatypes.BIGINT,
		age: Datatypes.INTEGER
	}, {
		freezeTableName:true,
		timestamps: false
	});
	return User;
};