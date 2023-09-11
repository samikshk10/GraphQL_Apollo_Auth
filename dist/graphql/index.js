"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const schema_1 = __importDefault(require("./schema"));
exports.typeDefs = schema_1.default;
const resolver_1 = require("./resolver");
Object.defineProperty(exports, "resolvers", { enumerable: true, get: function () { return resolver_1.resolvers; } });
