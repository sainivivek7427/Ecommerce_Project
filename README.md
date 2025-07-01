# 🛒 E-Commerce REST API (Spring Boot)

This project is a fully functional E-Commerce Backend built with **Java Spring Boot**. It includes product management, category management, CSV upload, and a simple cart feature.

---

## 🚀 Features

- ✅ Add, update, delete, and get products
- ✅ Add products via CSV upload
- ✅ Category CRUD with integrity checks
- ✅ Add products to cart with quantity
- ✅ Search/filter products
- ✅ JWT-based authentication (optional to extend)
- ✅ Exception handling and validations

---

## 📦 Tech Stack

- **Java 17**
- **Spring Boot**
- **Spring Data JPA**
- **MySQL**
- **Maven**
- **Swagger/OpenAPI**
- **Postman (for testing)**

---

## 📁 Project Structure

```
com.ecom
├── controller         # REST controllers
├── entity             # JPA entities: Product, Category, CartItem
├── repository         # Spring Data JPA Repositories
├── service            # Service interfaces
├── serviceimpl        # Service implementations
└── exception          # Custom exceptions
```

---

## 🧪 API Endpoints

### 📂 Product APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/products/upload-csv` | Upload multiple products via CSV |
| `POST` | `/api/products` | Add single product |
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/filter?discount=10` | Filter by discount |
| `GET` | `/api/products/filter?category=Electronics` | Filter by category |
| `GET` | `/api/products/new` | Get latest products |

### 🗂 Category APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/categories/get` | Get all categories |
| `GET` | `/api/categories/get/{cid}` | Get category by ID |
| `DELETE` | `/api/categories/delete/{cid}` | Delete category (if not used in products) |
| `PUT` | `/api/categories/update/{cid}` | Update category name |

### 🛒 Cart APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/cart/add?userId=test123` | Add product to cart |
| `GET` | `/api/cart/view?userId=test123` | View cart items |
| `DELETE` | `/api/cart/delete/{cartItemId}` | Remove item from cart |

---

## 📥 Sample Add to Cart (Postman)

**URL**:  
```
POST http://localhost:8080/api/cart/add?userId=test123
```

**Body** (JSON):
```json
{
  "productId": "abc123",
  "quantity": 2
}
```

---

## 🗃 Sample CSV Format

```
name,price,discountPercent,discountPrice,description,brand,stockQuantity,imageUrl,isActive,category,createdDate,updatedDate
Smartphone,20000,10,18000,Latest smartphone,Samsung,100,http://img.com/1,true,Electronics,1718522101000,1718522101000
```

---

## ⚠️ Exception Handling

- If a category is used in a product, deletion throws:
  ```
  Cannot delete: Category is associated with products
  ```

---

## 📌 Future Improvements

- JWT Authentication with roles
- Wishlist and Order management
- Admin dashboard (frontend)
- Email notifications

---

## 🧑‍💻 Author

**Satyam Raikwar and Vivek Saini**  
Java Backend Developer – Spring Boot & Microservices  
📧 satyam@example.com | 📱 +91-XXXXXXXXXX

---

## 📃 License

This project is open-source and free to use under the MIT License.
