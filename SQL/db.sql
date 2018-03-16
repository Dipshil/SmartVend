DROP VIEW logs;
DROP TABLE item;
DROP TABLE item_type;
DROP TABLE machine;
DROP TABLE machine_stock;
DROP TABLE purchase;
DROP TABLE payment_type;

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
	id SERIAL,
	machine_id SERIAL,
	item_id SERIAL
);

---------------
-- PURCHASES --
---------------

CREATE TABLE purchase (
	id SERIAL PRIMARY KEY,
	item_id SERIAL,
	machine_id SERIAL,
	timestamp TIMESTAMP,
	payment_type_id SERIAL
);

CREATE TABLE payment_type (
	id SERIAL,
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


----------------
-- PRIVILEGES --
----------------

GRANT ALL PRIVILEGES ON DATABASE smart_vend TO vend_admin;
GRANT INSERT ON TABLE machine_stock TO vend_machine;
GRANT INSERT ON TABLE purchase TO vend_machine;
GRANT SELECT ON TABLE logs to vend_analytics;