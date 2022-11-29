-- CreateTable
CREATE TABLE `cities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(191) NOT NULL,
    `city_ascii` VARCHAR(191) NOT NULL,
    `lat` DOUBLE NOT NULL,
    `lng` DOUBLE NOT NULL,
    `pop` DOUBLE NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `iso2` VARCHAR(191) NULL,
    `iso3` VARCHAR(191) NULL,
    `state_ansi` VARCHAR(191) NULL,
    `exact_city` VARCHAR(191) NULL,
    `exact_province` VARCHAR(191) NULL,
    `province` VARCHAR(191) NULL,
    `timezone` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
