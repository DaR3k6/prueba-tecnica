-- -----------------------------------------------------
-- Schema inventario
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `inventario` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `inventario`;

-- -----------------------------------------------------
-- Table inventario.marca
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marca` (
  `idmarca` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idmarca`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table inventario.producto
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `producto` (
  `idproducto` INT NOT NULL AUTO_INCREMENT,
  `idmarca` INT NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `descripcion` VARCHAR(50) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`idproducto`),
  INDEX `fk_producto_marca_idx` (`idmarca` ASC),
  CONSTRAINT `fk_producto_marca`
    FOREIGN KEY (`idmarca`)
    REFERENCES `marca` (`idmarca`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table inventario.sucursal
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sucursal` (
  `idsucursal` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idsucursal`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table inventario.catagolo
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `catagolo` (
  `idcatagolo` INT NOT NULL AUTO_INCREMENT,
  `idproducto` INT NOT NULL,
  `precio` DOUBLE NOT NULL,
  PRIMARY KEY (`idcatagolo`),
  INDEX `fk_catagolo_producto1_idx` (`idproducto` ASC),
  CONSTRAINT `fk_catagolo_producto1`
    FOREIGN KEY (`idproducto`)
    REFERENCES `producto` (`idproducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table inventario.producto_sucursal
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `producto_sucursal` (
  `idsucursal` INT NOT NULL,
  `idproducto` INT NOT NULL,
  `cantidad` DOUBLE NOT NULL,
  PRIMARY KEY (`idsucursal`, `idproducto`),
  INDEX `fk_producto_sucursal_sucursal_idx` (`idsucursal` ASC),
  INDEX `fk_producto_sucursal_producto_idx` (`idproducto` ASC),
  CONSTRAINT `fk_producto_sucursal_sucursal`
    FOREIGN KEY (`idsucursal`)
    REFERENCES `sucursal` (`idsucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_producto_sucursal_producto`
    FOREIGN KEY (`idproducto`)
    REFERENCES `producto` (`idproducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;
