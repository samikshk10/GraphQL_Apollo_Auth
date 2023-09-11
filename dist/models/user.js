"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const index_1 = require("../config/index");
const User = index_1.sequelize.define("User", {
    id: {
        type: core_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    // paranoid: true,
});
exports.default = User;
