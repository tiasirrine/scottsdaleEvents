-- START INSERT
use afmus74x59uysw5t;

LOAD DATA LOCAL INFILE
'C:\\Users\\Trevor\\Desktop\\coding\\bootcamp\\scottsdale-events\\db\\csv-files\\inventoryFriday.csv'
IGNORE
INTO TABLE Temps
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE
'C:\\Users\\Trevor\\Desktop\\coding\\bootcamp\\scottsdale-events\\db\\csv-files\\inventoryFriday.csv'
IGNORE
INTO TABLE Products
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

UPDATE Products
INNER JOIN Temps on Temps.id = Products.id
SET
Products.category = Temps.category,
Products.subcategory = Temps.subcategory,
Products.name = Temps.name,
Products.description = Temps.description,
Products.price = Temps.price,
Products.quantity = Temps.quantity,
Products.url = Temps.url,
Products.extraurl = Temps.extraurl;

DELETE p FROM Products p
LEFT JOIN Temps t ON t.id = p.id
WHERE p.id IS NULL;

DELETE FROM Products
WHERE NOT EXISTS(
SELECT NULL
FROM Temps t
WHERE t.id = Products.id
);

delete from Temps;

-- END OF INSERT