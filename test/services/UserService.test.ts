// import "@types/jest";
import { describe } from "node:test";
import jwt from "jsonwebtoken";

import { UserService } from "../../src/services/UserService";
import { UserRepository } from "../../src/repositories/UserRepository";
import { hashPassword, hashCompare } from "../../src/utils/bcrypt/HashPassword";
import { UserDTO } from "../../src/dtos/UserDTO";

jest.mock("../../src/repositories/UserRepository");
jest.mock("../../src/utils/bcrypt/HashPassword");
jest.mock("jsonwebtoken");

describe("UserService", () => {
  let userService: UserService;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepositoryMock = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(userRepositoryMock);
  });
  describe("register", () => {
    it("should register a new user", async () => {
      userRepositoryMock.findByEmail.mockResolvedValue(null);
      (hashPassword as jest.Mock).mockResolvedValue("hashed_password");

      const userDto: UserDTO = {
        name: "Test User",
        email: "test@example.com",
        password: "password",
      };

      await expect(userService.register(userDto)).resolves.not.toThrow();
      expect(userRepositoryMock.create).toHaveBeenCalledWith({
        ...userDto,
        password: "hashed_password",
      });
    });

    it("should throw an error if email already exists", async () => {
      userRepositoryMock.findByEmail.mockResolvedValue({
        name: "Existing User",
        email: "existing_email@example.com",
        password_hash: "hashed_password",
      });

      const userDto: UserDTO = {
        name: "Test User",
        email: "existing_email",
        password: "password",
      };

      await expect(userService.register(userDto)).rejects.toThrow(
        "E-mail already exists"
      );
    });
  });

  describe("login", () => {
    it("should login with valid credentials", async () => {
      const user = [
        { email: "test@example.com", password_hash: "hashed_password" },
      ];
      userRepositoryMock.findUserByEmail.mockResolvedValue(user);
      (hashCompare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("access_token");

      const userDto: UserDTO = {
        name: "Test User",
        email: "test@example.com",
        password: "password",
      };

      await expect(userService.login(userDto)).resolves.toBe("access_token");
    });

    it("should throw an error if user does not exist", async () => {
      userRepositoryMock.findUserByEmail.mockResolvedValue(null);

      const userDto: UserDTO = {
        name: "Test User",
        email: "nonexistent@example.com",
        password: "password",
      };

      await expect(userService.login(userDto)).rejects.toThrow(
        "User not exist"
      );
    });

    it("should throw an error if password is invalid", async () => {
      const user = [
        { email: "test@example.com", password_hash: "hashed_password" },
      ];
      userRepositoryMock.findUserByEmail.mockResolvedValue(user);
      (hashCompare as jest.Mock).mockResolvedValue(false);

      const userDto: UserDTO = {
        name: "Test User",
        email: "test@example.com",
        password: "invalid_password",
      };

      await expect(userService.login(userDto)).rejects.toThrow(
        "E-mail or Password is invalid"
      );
    });
  });
});
