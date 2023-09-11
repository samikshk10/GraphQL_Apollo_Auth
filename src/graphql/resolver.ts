import bcrypt from "bcrypt";
import { User } from "../models";
import { InputUserInterface, OutputUserInterface } from "../interfaces";

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

      if (password !== confirmPassword) {
        throw new Error("confirm password doesnt match");
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      try {
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
        };
      } catch (error) {
        console.log("Error registering user:", error);
        throw new Error("register failed");
      }
    },
  },
};
