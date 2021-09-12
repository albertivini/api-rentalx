import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

export class CreateCategoryUseCase {
    private categoriesRepository: ICategoriesRepository;

    constructor(categoriesRepository: ICategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

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
