import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  findById(id: string): Promise<Category | undefined>;
  findAll(): Promise<Category[]>;
}
