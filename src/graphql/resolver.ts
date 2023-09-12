import bcrypt from "bcrypt";
import { User } from "../models";
import {
  InputUserInterface,
  LoginInputInterface,
  UserInterface,
  loginOutputInterface,
} from "../interfaces";
import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        throw new GraphQLError("Failed to fetch users", {
          extensions: {
            code: "FAILED ",
            http: {
              status: 400,
            },
          },
        });
      }
    },
  },
  Mutation: {
    register: async (
      parents: any,
      args: { input: InputUserInterface }
    ): Promise<any> => {
      const { username, email, password, confirmPassword } = args.input;

      if (password.length < 8 || confirmPassword.length < 8) {
        throw new GraphQLError(
          "The password must be of at least 8 characters",
          {
            extensions: {
              code: "INVALID_PASSWORD_FORMAT",
              http: {
                status: 401,
              },
            },
          }
        );
      }

      if (password !== confirmPassword) {
        throw new GraphQLError("The ConfirmPassword Doesn't Match", {
          extensions: {
            code: "INVALID_CPASSWORD",
            http: {
              status: 401,
            },
          },
        });
      }

      try {
        const userFind = await User.findOne({ where: { email: email } });

        if (userFind !== null) {
          throw new GraphQLError(`User ${email} already exists`, {
            extensions: {
              code: "EMAIL_EXISTS",
              http: {
                status: 409,
              },
            },
          });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser: any = await User.create({
          email,
          username,
          password: hashedPassword,
        });

        console.log(newUser.dataValues);
        return {
          ...newUser.dataValues,
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
        // throw new Error("The password must be of at least 8 characters");
        throw new GraphQLError(
          "The password must be of at least 8 characters",
          {
            extensions: {
              code: "INVALID_PASSWORD_FORMAT",
            },
          }
        );
      }
      try {
        const userFind = await User.findOne({ where: { email: email } });

        if (!userFind) {
          throw new GraphQLError(`User ${email} not found`, {
            extensions: {
              code: "EMAIL_NOT_FOUND",
            },
          });
        }

        const isValidPassword = await bcrypt.compare(
          password!.toString(),
          userFind.dataValues.password
        );

        if (!isValidPassword) {
          throw new GraphQLError(
            "The password must be of at least 8 characters",
            {
              extensions: {
                code: "INCORRECT_USERNAME_PASSWORD",
              },
            }
          );
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
