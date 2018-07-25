DROP DATABASE scottsdaleevents;

CREATE DATABASE scottsdaleevents;

use scottsdaleEvents;

LOAD DATA LOCAL INFILE 
'C:\\Users\\Trevor\\Desktop\\coding\\bootcamp\\scottsdaleEvents\\db\\csv-files\\inventory.csv'
IGNORE
INTO TABLE products
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;