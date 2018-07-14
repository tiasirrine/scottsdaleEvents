DROP DATABASE scottsdaleevents;

CREATE DATABASE scottsdaleevents;

use scottsdaleEvents;

CREATE TABLE customers(
    id INT AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NULL,
    frozen INT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE admins(
    id INT AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    superAdmin INT,
    PRIMARY KEY(id)
);

CREATE TABLE products(
	CATEGORY VARCHAR(50),
    ID INT,
    NAME VARCHAR(50),
    QTY INT,
    DESCRIPTION VARCHAR(256),
    PRIMARY KEY(ID)
);

CREATE TABLE user_carts(
	id INT AUTO_INCREMENT,
	user_id INT NOT NULL,
    did_check_out INT NULL,
    -- timestamp
    PRIMARY KEY(id)
);

CREATE TABLE cart_products(
	id INT AUTO_INCREMENT,
    user_cart_id INT NOT NULL,
    inventory_id INT NOT NULL,
    qty INT NOT NULL,
    PRIMARY KEY(id)
);

LOAD DATA LOCAL INFILE 
'C:\\Users\\wwong\\Desktop\\Project3\\scottsdaleEvents\\inventory.csv'
IGNORE
INTO TABLE products
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;