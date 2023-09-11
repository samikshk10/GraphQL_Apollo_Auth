import bcrypt from "bcrypt";
import { User } from "../models";
import {
  InputUserInterface,
  LoginInputInterface,
  OutputUserInterface,
  loginOutputInterface,
} from "../interfaces";

export const resolvers = {
  Query: {
    users: async () => {
      return await User.findAll();
    },
  },
  Mutation: {
    register: async (
      parents: any,
      args: { input: InputUserInterface }
    ): Promise<OutputUserInterface> => {
      const { username, email, password, confirmPassword } = args.input;

      if (password.length < 8) {
        throw new Error("The password must be of at least 8 characters");
      }

      if (password !== confirmPassword) {
        throw new Error("confirm password doesnt match");
      }

      try {
        const userFind = await User.findOne({ where: { email: email } });

        if (userFind != null) {
          console.log("hello world and t");
          throw new Error(`User ${email} already exists`);
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser: any = await User.create({
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
      } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
      }
    },

    //login

    login: async (
      parent: any,
      args: { input: LoginInputInterface }
    ): Promise<loginOutputInterface> => {
      const { email, password } = args.input;
      if (password!.length < 8) {
        throw new Error("The password must be of at least 8 characters");
      }
      try {
        const userFind = await User.findOne({ where: { email: email } });

        if (!userFind) {
          throw new Error(`User ${email} not found`);
        }

        const isValidPassword = await bcrypt.compare(
          password!.toString(),
          userFind.dataValues.password
        );

        if (!isValidPassword) {
          throw new Error("Incorrect Email or Password");
        }

        return {
          email,
          password,
          message: "Login successfully",
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
