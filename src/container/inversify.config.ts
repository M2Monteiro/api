import { Container } from "inversify";
import { UserService } from "@services/UserService";
import { UserRepository } from "@repositories/UserRepository";
import { UserController } from "@controller/UserController";

const container = new Container();

container.bind<UserController>(UserController).to(UserController);
container.bind<UserService>(UserService).to(UserService);
container.bind<UserRepository>(UserRepository).to(UserRepository);

export default container;
