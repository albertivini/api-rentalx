import { Category } from "../../model/Category";
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

    execute({ name, description }: IRequest): Category {
        const categoryAlreadyExists =
            this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error("Category Already Exists.");
        }

        const category = this.categoriesRepository.create({
            name,
            description,
        });

        return category;
    }
}
