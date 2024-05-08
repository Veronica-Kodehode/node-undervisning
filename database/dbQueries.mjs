import sqlite3 from "better-sqlite3";
import { join } from "path";
const { dirname } = import.meta;

// Initialize database
const db = new sqlite3(join(dirname, "..", "database", "store.sqlite"));

// Queries for /products
const getProducts = () => db.prepare("SELECT * FROM products").all();
const getCategory = (category) => {
  const getCategoryQuery = db.prepare(
    "SELECT * FROM products WHERE LOWER(category) = ?"
  );
  return getCategoryQuery.all(category);
};
const addProduct = ({ name, category, stock, price }) => {
  const addProductQuery = db.prepare(
    "INSERT INTO products (name, category, stock, price) VALUES(?, ?, ?, ?)"
  );
  addProductQuery.run(name, category, stock, price);
};
const getProduct = (id) => {
  const getProductQuery = db.prepare("SELECT * FROM products WHERE id = ?");
  return getProductQuery.get(id);
};
const deleteProduct = (id) => {
  const deleteProductQuery = db.prepare("DELETE FROM products WHERE id = ?");
  deleteProductQuery.run(id);
};
const updateProduct = (name, category, stock, price, id) => {
  const updateProductQuery = db.prepare(
    "UPDATE products SET name = ?, category = ?, stock = ?, price = ? WHERE id = ?"
  );
  updateProductQuery.run(name, category, stock, price, id);
};

const signupUser = (email, password) => {
  const signupUserQuery = db.prepare(
    "INSERT INTO users (email, password) VALUES(?, ?)"
  );
  signupUserQuery.run(email, password);
};

const loginUser = (email) => {
  const loginUserQuery = db.prepare("SELECT * FROM users WHERE email = ?");
  return loginUserQuery.get(email);
};

// Queries for /orders
const getOrders = () => db.prepare("SELECT * FROM orders").all();
const getOrder = (id) => {
  const getOrderQuery = db.prepare("SELECT * FROM orders WHERE id = ?");
  return getOrderQuery.get(id);
};
const addOrder = (customer_email, product) => {
  const addOrderQuery = db.prepare(
    "INSERT INTO orders (customer_email, product) VALUES(?, ?)"
  );
  addOrderQuery.run(customer_email, product);
};
const deleteOrder = (id) => {
  const deleteOrderQuery = db.prepare("DELETE FROM orders WHERE id = ?");
  deleteOrderQuery.run(id);
};

export {
  getProducts,
  getCategory,
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getOrders,
  getOrder,
  addOrder,
  deleteOrder,
  signupUser,
  loginUser,
};
