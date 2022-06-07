-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema cassas
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cassas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cassas` DEFAULT CHARACTER SET utf8mb3 ;
USE `cassas` ;

-- -----------------------------------------------------
-- Table `cassas`.`departments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cassas`.`departments` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `code` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cassas`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cassas`.`categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `code` INT(11) NOT NULL,
  `department_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC),
  INDEX `department_id_idx` (`department_id` ASC),
  CONSTRAINT `categories_department_id`
    FOREIGN KEY (`department_id`)
    REFERENCES `cassas`.`departments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cassas`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cassas`.`cities` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cassas`.`collections`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cassas`.`collections` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `code` INT(11) NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cassas`.`colors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cassas`.`colors` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `code` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cassas`.`collections_colors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cassas`.`collections_colors` (
  `id` INT(11) NOT NULL,
  `collection_id` INT(11) NULL DEFAULT NULL,
  `color_id` INT(11) NULL DEFAULT NULL,
  `preview_img_url` VARCHAR(1000) NOT NULL,
  `date` DATE NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  INDEX `color_id_idx` (`color_id` ASC),
  INDEX `collection_id_idx` (`collection_id` ASC),
  CONSTRAINT `collections_colors_collection_id`
    FOREIGN KEY (`collection_id`)
    REFERENCES `cassas`.`collections` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `collections_colors_color_id`
    FOREIGN KEY (`color_id`)
    REFERENCES `cassas`.`colors` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cassas`.`collection_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cassas`.`collection_images` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `img_url` VARCHAR(1000) NOT NULL,
  `collections_colors_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `collections_colors_id_idx` (`collections_colors_id` ASC),
  CONSTRAINT `collection_images_collections_colors_id`
    FOREIGN KEY (`collections_colors_id`)
    REFERENCES `cassas`.`collections_colors` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cassas`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cassas`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `israeliId` VARCHAR(10) NOT NULL,
  `hash` VARCHAR(10000) NOT NULL,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `cityId` VARCHAR(45) NULL DEFAULT NULL,
  `street` VARCHAR(45) NULL DEFAULT NULL,
  `streetNumber` INT(11) NULL DEFAULT NULL,
  `dateOfbirth` DATE NULL DEFAULT NULL,
  `registrationDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `isAdmin` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cassas`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cassas`.`orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` INT(11) NOT NULL,
  `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `street` VARCHAR(45) NULL DEFAULT NULL,
  `street_number` INT(11) NULL DEFAULT NULL,
  `delievery_date` DATE NULL DEFAULT NULL,
  `last_four_digits_credit_card` INT(11) NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  `city_id` INT(11) NULL DEFAULT NULL,
  `order_date` DATETIME NULL DEFAULT NULL,
  `total_price` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `city_id_idx` (`city_id` ASC),
  INDEX `user_id_idx` (`user_id` ASC),
  CONSTRAINT `orders_city_id`
    FOREIGN KEY (`city_id`)
    REFERENCES `cassas`.`cities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `orders_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `cassas`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cassas`.`rootproducts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cassas`.`rootproducts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(500) NULL DEFAULT NULL,
  `composition` VARCHAR(100) NULL DEFAULT NULL,
  `origin` VARCHAR(45) NULL DEFAULT NULL,
  `height` FLOAT NULL DEFAULT NULL,
  `width` FLOAT NULL DEFAULT NULL,
  `depth` FLOAT NULL DEFAULT NULL,
  `collection_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `collection_id_idx` (`collection_id` ASC),
  CONSTRAINT `fk_collection_id`
    FOREIGN KEY (`collection_id`)
    REFERENCES `cassas`.`collections` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cassas`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cassas`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `price` FLOAT NOT NULL,
  `available` TINYINT(1) NOT NULL,
  `quantity` INT(11) NULL DEFAULT NULL,
  `rootProduct_id` INT(11) NOT NULL,
  `color_id` INT(11) NULL DEFAULT NULL,
  `date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `preview_img_url` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `color_id_idx` (`color_id` ASC),
  INDEX `product_id_idx` (`rootProduct_id` ASC),
  CONSTRAINT `products_color_id`
    FOREIGN KEY (`color_id`)
    REFERENCES `cassas`.`colors` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `products_rootProduct_id`
    FOREIGN KEY (`rootProduct_id`)
    REFERENCES `cassas`.`rootproducts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cassas`.`order_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cassas`.`order_items` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_id` INT(11) NOT NULL,
  `order_id` INT(11) NOT NULL,
  `price` FLOAT NULL DEFAULT NULL,
  `quantity` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `product_id_idx` (`product_id` ASC),
  INDEX `order_id_idx` (`order_id` ASC),
  CONSTRAINT `order_items_order_id`
    FOREIGN KEY (`order_id`)
    REFERENCES `cassas`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `order_items_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `cassas`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cassas`.`product_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cassas`.`product_images` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `img_url` VARCHAR(45) NULL DEFAULT NULL,
  `product_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `product_id_idx` (`product_id` ASC),
  CONSTRAINT `product_images_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `cassas`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cassas`.`products_categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cassas`.`products_categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `category_id` INT(11) NOT NULL,
  `root_product_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `category_id_idx` (`category_id` ASC),
  INDEX `product_id_idx` (`root_product_id` ASC),
  CONSTRAINT `products_categories_category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `cassas`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `products_categories_root_product_id`
    FOREIGN KEY (`root_product_id`)
    REFERENCES `cassas`.`rootproducts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cassas`.`sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cassas`.`sessions` (
  `session_id` VARCHAR(128) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `expires` INT(11) UNSIGNED NOT NULL,
  `data` MEDIUMTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  PRIMARY KEY (`session_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
