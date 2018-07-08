CREATE DATABASE scottsdaleEvents;

use scottsdaleEvents;

CREATE TABLE customers(
  userId INT AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY(userId)
);

CREATE TABLE admins(
  userId INT AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  superAdmin INT,
  PRIMARY KEY(userId)
);

CREATE TABLE inventory(
  CATEGORY VARCHAR(50),
  ID INT,
  NAME VARCHAR(50),
  QTY INT,
  DESCRIPTION VARCHAR(256),
  PRIMARY KEY(ID)
);
