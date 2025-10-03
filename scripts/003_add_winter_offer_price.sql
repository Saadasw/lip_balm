-- Add winter_offer_price column to products table
ALTER TABLE products
ADD COLUMN winter_offer_price DECIMAL(10, 2);

-- Update some products with winter offer prices for demo
UPDATE products
SET winter_offer_price = price * 0.85
WHERE id IN (SELECT id FROM products LIMIT 3);
