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