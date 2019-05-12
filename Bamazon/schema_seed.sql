DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DOUBLE(8, 3) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ("iphone", "electronics", 1000, 100 ),
("imac", "electronics", 2000, 20 ),
("XZ5 Compact", "electronics", 1000, 100 ),
("Learning Javascript for Dummies", "books", 5.99, 50 ),
("How to Hack GitHub", "books", 4.99, 15 ),
("No Comment T-Shirt", "clothing", 19.99, 20 ),
("Diesel Logo T-Shirt", "clothing", 1000, 100 ),
("LG UHD 65\"", "tv", 2199.99, 5 ),
("LG UHD 55\"", "tv", 1600, 8 ),
("Balenciaga", "HandBags", 1000, 100 );

SELECT * FROM products ORDER BY product_name;

UPDATE products SET stock_quantity = 100 WHERE id = 1;

SELECT * FROM products WHERE id = 1;