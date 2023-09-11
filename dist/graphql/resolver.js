"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models");
exports.resolvers = {
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield models_1.User.findAll();
        }),
    },
    Mutation: {
        register: (parents, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { username, email, password, confirmPassword } = args.input;
            if (password.length < 8) {
                throw new Error("The password must be of at least 8 characters");
            }
            if (password !== confirmPassword) {
                throw new Error("confirm password doesnt match");
            }
            try {
                const userFind = yield models_1.User.findOne({ where: { email: email } });
                if (userFind != null) {
                    console.log("hello world and t");
                    throw new Error(`User ${email} already exists`);
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 12);
                const newUser = yield models_1.User.create({
                    email,
                    username,
                    password: hashedPassword,
                });
                console.log(`the user is ${newUser}`);
                return {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    createdAt: newUser.createdAt,
                    message: "Sign up Successfully",
                };
            }
            catch (error) {
                console.log(error);
                throw new Error(error.message);
            }
        }),
        //login
        login: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = args.input;
            if (password.length < 8) {
                throw new Error("The password must be of at least 8 characters");
            }
            try {
                const userFind = yield models_1.User.findOne({ where: { email: email } });
                if (!userFind) {
                    throw new Error(`User ${email} not found`);
                }
                const isValidPassword = yield bcrypt_1.default.compare(password.toString(), userFind.dataValues.password);
                if (!isValidPassword) {
                    throw new Error("Incorrect Email or Password");
                }
                return {
                    email,
                    password,
                    message: "Login successfully",
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        }),
    },
};
