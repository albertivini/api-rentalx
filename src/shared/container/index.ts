import { container } from "tsyringe";

import "./providers";

import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokenRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../modules/accounts/repositories/IUsersTokenRepository";
import { CarsImagesRepository } from "../../modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarsImagesRepository } from "../../modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";
import { RentalsRepository } from "../../modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository";

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

// ISpecificationRepository
container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
);

// IUsersRepository
container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

// ICarsRepository
container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

// ICarsImagesRepository
container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImagesRepository
);

// IRentalsRepository
container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
);

// IUsersTokenRepository
container.registerSingleton<IUsersTokenRepository>(
    "UsersTokenRepository",
    UsersTokenRepository
);
