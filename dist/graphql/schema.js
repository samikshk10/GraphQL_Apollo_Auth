"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `#graphql
type User{
    id:ID
    username: String
    password: String
    email: String
    createdAt:String
    message: String
}

  type Query{
    users:[User]
  }

input RegisterInput{
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
}

input LoginInput{
    email:String!
    password: String!
}

type Mutation{
    register(input: RegisterInput): User!  
    login(input: LoginInput):User
    
}
`;
exports.default = typeDefs;
