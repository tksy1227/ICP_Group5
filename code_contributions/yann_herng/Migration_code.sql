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

-- name and unit_of_measurement was swapped in the new dataset
CREATE TABLE IF NOT EXISTS public.np2025_product_final
(
    id character varying COLLATE pg_catalog."default" NOT NULL,
    sku character varying COLLATE pg_catalog."default" NOT NULL,
    type character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default",
    unit_of_measurement character varying COLLATE pg_catalog."default" NOT NULL,
    price numeric NOT NULL,
    description character varying COLLATE pg_catalog."default" NOT NULL
);

ALTER TABLE np2025_product_final
ALTER COLUMN unit_of_measurement DROP NOT NULL;

COPY np2025_product_final
FROM '/tmp/np2025_product.csv'
WITH (FORMAT csv, HEADER true);
