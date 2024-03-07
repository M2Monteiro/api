import { AppDataSource } from "../database/connection";
import { User } from "../entities/User";

export class UserRepository {
  static async findByEmail(email: string): Promise<User | null> {
    const userRepository = AppDataSource.getRepository(User);

    try {
      return userRepository.findOneBy({
        email: email,
      });
    } catch (error) {
      return null;
    } finally {
      AppDataSource.destroy();
    }
  }

  static async create(user: User): Promise<User> {
    const newUser = user;
    try {
      await AppDataSource.manager.save(user);
    } catch (error) {
    } finally {
      AppDataSource.destroy();
    }
    return newUser;
  }
}
