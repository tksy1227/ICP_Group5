-- create new empty tables for new data
CREATE TABLE np2025_area (LIKE area INCLUDING CONSTRAINTS);
CREATE TABLE np2025_farm (LIKE farm INCLUDING CONSTRAINTS);
CREATE TABLE np2025_product (LIKE product INCLUDING CONSTRAINTS);
CREATE TABLE np2025_sale_order (LIKE sale_order INCLUDING CONSTRAINTS);
CREATE TABLE np2025_sale_order_item (LIKE sale_order_item INCLUDING CONSTRAINTS);

-- amend variable constraints
ALTER TABLE np2025_farm
ALTER COLUMN area_id DROP NOT NULL;
ALTER COLUMN owner_id DROP NOT NULL;

ALTER TABLE np2025_sale_order_item
DROP COLUMN clicked_from_recommendation,
DROP COLUMN click_timestamp;

-- append new data from respective csv files
COPY np2025_area
FROM '/tmp/np2025_area.csv'
WITH (FORMAT csv, HEADER true);

COPY np2025_farm
FROM '/tmp/np2025_farm.csv'
WITH (FORMAT csv, HEADER true);

COPY np2025_product
FROM '/tmp/np2025_product.csv'
WITH (FORMAT csv, HEADER true);

COPY np2025_sale_order
FROM '/tmp/np2025_sale_order.csv'
WITH (FORMAT csv, HEADER true);

COPY np2025_sale_order_item
FROM '/tmp/np2025_sale_order_item.csv'
WITH (FORMAT csv, HEADER true);
