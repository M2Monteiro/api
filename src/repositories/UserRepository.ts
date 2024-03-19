import { injectable } from "inversify";
import { AppDataSource } from "../database/connection";

import { UserDTO } from "../dtos/UserDTO";
import { User } from "../entities/User";
@injectable()
export class UserRepository {
  public async findUserByEmail(email: string): Promise<User[] | null> {
    return AppDataSource.getRepository(User).find({
      select: {
        name: true,
        email: true,
        password_hash: true,
      },
      where: {
        email: email,
      },
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    const userRepository = AppDataSource.getRepository(User);

    return userRepository.findOneBy({
      email: email,
    });
  }

  public async create(userDTO: UserDTO): Promise<User> {
    const newUser: User = new User();

    newUser.name = userDTO.name!;
    newUser.email = userDTO.email;
    newUser.password_hash = userDTO.password;

    await AppDataSource.manager.save(newUser);
    return newUser;
  }
}
