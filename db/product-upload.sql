-- START INSERT
use scottsdaleevents;

LOAD DATA LOCAL INFILE
'C:\\Users\\Trevor\\Desktop\\coding\\bootcamp\\scottsdale-events\\db\\csv-files\\inventoryFriday.csv'
IGNORE
INTO TABLE temps
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE
'C:\\Users\\Trevor\\Desktop\\coding\\bootcamp\\scottsdale-events\\db\\csv-files\\inventoryFriday.csv'
IGNORE
INTO TABLE products
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

UPDATE products
INNER JOIN temps on temps.id = products.id
SET
products.category = temps.category,
products.subcategory = temps.subcategory,
products.name = temps.name,
products.description = temps.description,
products.price = temps.price,
products.quantity = temps.quantity,
products.url = temps.url,
products.extraurl = temps.extraurl;

DELETE p FROM products p
LEFT JOIN temps t ON t.id = p.id
WHERE p.id IS NULL;

DELETE FROM products
WHERE NOT EXISTS(
SELECT NULL
FROM temps t
WHERE t.id = products.id
);

delete from temps;

-- END OF INSERT
