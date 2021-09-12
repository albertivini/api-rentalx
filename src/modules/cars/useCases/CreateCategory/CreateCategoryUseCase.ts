import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
export class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    // mesma coisa que:
    // constructor(private categoriesRepositories: ICategoriesRepositories)

    async execute({ name, description }: IRequest): Promise<Category> {
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error("Category Already Exists.");
        }

        const category = await this.categoriesRepository.create({
            name,
            description,
        });

        return category;
    }
}
