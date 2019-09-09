CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(4,0),
  stock_quantity INT,
  
  PRIMARY KEY(item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(01, "Onesie", "Baby", 20, 15), (02, "Bib", "Baby", 24, 20),
(03, "Boots", "Shoes", 90, 25), (04, "Sneakers", "Shoes", 30, 10),
(05, "Necklace", "Accessories", 20, 15), (06, "Hat", "Accessories", 12, 7),
(07, "Jeans", "Women's", 40, 3), (08, "Tunic", "Women's", 30, 9),
(09, "Shirt", "Men's", 20, 15), (10, "Jacket", "Men's", 2, 18);