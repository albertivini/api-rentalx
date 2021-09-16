import { EntityRepository, getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

@EntityRepository(Category)
export class CategoriesRepository implements ICategoriesRepository {
    // deixa o repositorio do typeorm restrito apenas para o CategoriesRepository usar
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            name,
            description,
        });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = this.repository.find();

        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = this.repository.findOne({
            name,
        });

        return category;
    }
}
