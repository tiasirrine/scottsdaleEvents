DROP DATABASE scottsdaleevents;

CREATE DATABASE scottsdaleevents;

use scottsdaleEvents;

LOAD DATA LOCAL INFILE 
'C:\\Users\\wwong\\Desktop\\Project3\\scottsdaleEvents\\inventory.csv'
IGNORE
INTO TABLE products
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

-- one customer can have many carts
-- one cart can only have one customer
-- carts are associated to users in the carts table by the customerId

-- when a user logs in their active cart gets loaded with the customer
-- this allows a customer to start saving to their active cart right away
-- when a user goes to check out, their active cart gets pulled from the db
-- users will be able to view their past carts, and at any time switch their active cart

CREATE TABLE carts(
  id AUTO_INCREMENT,
  isActive bool,
  updatedAt timestamp
  customerId -- foreign key, belongs to customers
);

-- one cart can have many cartProducts
-- one cartProduct has one productId

CREATE TABLE cartProducts(
  id AUTO_INCREMENT,
  qty INT
  cartId --foreign key. belongs to carts table
  productId --foreign key. belongs to products table
);

CREATE TABLE customers(
  id AUTO_INCREMENT,
  email varchar
  password varchar
  frozen bool
  PRIMARY KEY(id)
);

CREATE TABLE products(
  id INT AUTO_INCREMENT,
  category VARCHAR
  subcategory VARCHAR
  name VARCHAR
  description VARCHAR
  price DECIMAL
  quantity INTEGER
  url VARCHAR
);


