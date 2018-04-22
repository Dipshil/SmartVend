DROP DATABASE smart_vend;
DROP USER vend_admin;
DROP USER vend_analytics;
DROP USER vend_machine;

-----------
-- USERS --
-----------

-- Admin user with read/write/delete access
CREATE USER vend_admin WITH PASSWORD 'vend_admin';

-- Analytics user with read-only access
CREATE USER vend_analytics WITH PASSWORD 'vend_analytics';

-- Vending machine user with write-only access
CREATE USER vend_machine WITH PASSWORD 'vend_machine';

CREATE DATABASE smart_vend;

\c smart_vend;

-----------
-- ITEMS --
-----------

CREATE TABLE item (
	id SERIAL PRIMARY KEY,
	item_name VARCHAR(40),
	item_type_id SERIAL,
	price NUMERIC(12, 2)
);

CREATE TABLE item_type (
	id SERIAL PRIMARY KEY,
	item_type_name VARCHAR(40)
);


----------------------
-- VENDING MACHINES --
----------------------

CREATE TABLE machine (
	id SERIAL PRIMARY KEY,
	location VARCHAR(40)
);

CREATE TABLE machine_stock (
	id SERIAL PRIMARY KEY,
	machine_id SERIAL,
	item_id SERIAL,
	month INT
);

---------------
-- PURCHASES --
---------------

CREATE TABLE purchase (
	id SERIAL PRIMARY KEY,
	item_id SERIAL,
	machine_id SERIAL,
	timestamp FLOAT,
	month INT,
	payment_type_id SERIAL 
);

CREATE TABLE payment_type (
	id SERIAL PRIMARY KEY,
	payment_type_name VARCHAR(40)
);

---------------
-- ANALYTICS --
---------------

CREATE VIEW logs AS (
	SELECT
		purchase.id,
		item.item_name,
		item_type.item_type_name,
		item.price,
		machine.location,
		purchase.timestamp,
		payment_type.payment_type_name
	FROM 
		item,
		item_type,
		machine,
		purchase,
		payment_type
	WHERE
		purchase.item_id = item.id AND
		item.item_type_id = item_type.id AND
		machine.id = purchase.machine_id AND
		purchase.payment_type_id = payment_type.id
);

CREATE VIEW stock_logs AS (
	SELECT 
		c.id,
		c.month,
		a.location,
		b.item_name
	FROM 
		machine AS a,  
		item AS b,
		machine_stock AS c 
	WHERE
		a.id = c.item_id AND 
		b.id = c.machine_id 
);

----------------
-- PRIVILEGES --
----------------

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO vend_admin;
GRANT ALL PRIVILEGES ON TABLE item to vend_admin;
GRANT ALL PRIVILEGES ON TABLE item_type to vend_admin;
GRANT ALL PRIVILEGES ON TABLE machine to vend_admin;
GRANT ALL PRIVILEGES ON TABLE machine_stock to vend_admin;
GRANT ALL PRIVILEGES ON TABLE purchase to vend_admin;
GRANT ALL PRIVILEGES ON TABLE payment_type to vend_admin;
GRANT ALL PRIVILEGES ON TABLE logs to vend_admin;
GRANT ALL PRIVILEGES ON TABLE stock_logs to vend_admin;
GRANT INSERT ON TABLE machine_stock TO vend_machine;
GRANT INSERT ON TABLE purchase TO vend_machine;
GRANT SELECT ON TABLE logs to vend_analytics;

---------------
-- LOAD DATA --
---------------

\copy item_type(item_type_name) FROM './simulated_data/item_types.csv' DELIMITER ',' CSV;
\copy item(item_name, item_type_id, price) FROM './simulated_data/items.csv' DELIMITER ',' CSV;
\copy machine(location)  FROM './simulated_data/machines.csv' DELIMITER ',' CSV;
\copy payment_type(payment_type_name) FROM './simulated_data/payment_types.csv' DELIMITER ',' CSV;
\copy machine_stock(machine_id, item_id, month) FROM './simulated_data/machine_stocks.csv' DELIMITER ',' CSV;
\copy purchase(item_id, machine_id, timestamp, month, payment_type_id) FROM './simulated_data/purchases.csv' DELIMITER ',' CSV;


