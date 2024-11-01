import { Not, Repository, getRepository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllUsersDTO from '@modules/users/dtos/IFindAllUsersDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll({ exceptUserId }: IFindAllUsersDTO): Promise<User[]> {
    let users: User[];

    if (exceptUserId) {
      users = await this.ormRepository.find({
        where: {
          id: Not(exceptUserId)
        }
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      ...userData,
      avatar: 'default.png'
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
