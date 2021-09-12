import { Category } from "../../entities/Category";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

export class ListCategoriesUseCase {
    constructor(private categoriesRepository: CategoriesRepository) {}

    execute(): Category[] {
        const data = this.categoriesRepository.list();

        return data;
    }
}
