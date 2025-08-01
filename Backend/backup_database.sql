-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce_db
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `app_user`
--

DROP TABLE IF EXISTS `app_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_user`
--

LOCK TABLES `app_user` WRITE;
/*!40000 ALTER TABLE `app_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` varchar(255) NOT NULL,
  `created_date` bigint DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES ('0f8d7abb-6039-49eb-aa7c-0db4c2096d00',1750858503345,'6e0dfb6e-5567-463a-b121-2a742fdf9e6d'),('1acf4da4-09ac-4a05-8547-a6b714289898',1750852529218,'user-123'),('6aa41210-8bbc-40ba-a1e5-1d3e47d005eb',1750853099128,'vivek-123'),('7ddf2609-2d01-4770-9447-1bd804a951f2',1750852556959,'user-456'),('bfab8d0e-1ae9-44e5-a19f-4c75dafed713',1750858501558,'6e0dfb6e-5567-463a-b121-2a742fdf9e6d'),('cdec84b6-ddeb-4ca1-b0b3-dfbabc6a5ef9',1750853101003,'vivek-123'),('e3e57391-d9a5-45ab-b0ad-b431da62f1f5',1750849391640,'{\n  \"userId\": \"user-123\"\n}'),('e76c4c04-6e82-41c9-8d30-b55e8a99d7b3',1750851751045,'{\n  \"userId\": \"user-123\"\n}'),('eacc9418-4b4a-49b4-a0e6-259f4abecaf9',1750852334724,'{\n  userId: user-888\n}');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` varchar(255) NOT NULL,
  `created_date` bigint DEFAULT NULL,
  `product_id` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `cart_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK99e0am9jpriwxcm6is7xfedy3` (`cart_id`),
  CONSTRAINT `FK99e0am9jpriwxcm6is7xfedy3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES ('1da7cb1a-6457-4787-907b-c38874e0f483',1750852644971,'1d3431a0-be43-4b80-a6dd-ef19a03daf0c',3,'7ddf2609-2d01-4770-9447-1bd804a951f2');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` varchar(255) NOT NULL,
  `created_date` bigint DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('3e03de25-932b-4a37-a59d-a9f939a532ec',1750070275822,'electronics'),('7facabaf-7576-43ad-a649-e1b54bd5893d',1750070264989,'fruits'),('b89303d3-09b1-4f65-9365-dab49166670c',1750070215136,'grocery'),('d6922b02-000d-4637-90e3-a1a0ca9b7d5f',1750341019230,'Bakery'),('d7224ebe-ec8a-460a-b199-3b50a08a4f8b',1750342536375,'Meat'),('db65d502-582d-45a6-adb4-c2bbf3ce470b',1750070254274,'vegitable');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `cuuid` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `created_date` bigint DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phoneno` bigint DEFAULT NULL,
  `pincode` bigint DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `update_date` bigint DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cuuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('6e0dfb6e-5567-463a-b121-2a742fdf9e6d','Bhopal','Bhopal','India',1750487965914,'satyamr@8966.com','Satyam','Raikwar','12345',9876543210,462001,'User',1750487965914,'satyam123');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category_id` varchar(255) DEFAULT NULL,
  `created_date` bigint DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `discount_percent` double DEFAULT NULL,
  `discount_price` double DEFAULT NULL,
  `image_url` varchar(1000) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `stock_quantity` int DEFAULT NULL,
  `updated_date` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('1d3431a0-be43-4b80-a6dd-ef19a03daf0c','India Gate','b89303d3-09b1-4f65-9365-dab49166670c',1718549400000,'Premium long grain basmati rice',8,55.2,'https://drive.google.com/file/d/1B1emsdl639K9AENKxPgZ4e7aEr4KQeGo/view?usp=drive_link',_binary '','Basmati-Rice',60,1,1718549400000),('58e53fd3-cf84-4819-930e-78aa51ef5bea','India Gate','b89303d3-09b1-4f65-9365-dab49166670c',1718549400000,'Long grain rice',10,360,'https://drive.google.com/file/d/someImageID2/view',_binary '','Basmati Rice',400,100,1750258716561),('5cc10c61-8a71-4145-bf63-a1a9adb37274','Tata Sampann','b89303d3-09b1-4f65-9365-dab49166670c',1718549400000,'High protein chana dal',15,52.25,'https://drive.google.com/file/d/12YFiX_CJ4S2u32WOUmUTA19xeE3jl5rS/view?usp=drive_link',_binary '','Chana-dal',55,1,1718549400000),('62a672f1-cc6e-4c6d-a6a5-6f2e67ca8e3c','HP','3e03de25-932b-4a37-a59d-a9f939a532ec',1718549400000,'Gaming Laptop',15,51000,'https://drive.google.com/file/d/someImageID3/view',_binary '','Laptop',60000,20,1718549400000),('98d1053b-22b4-4be4-b558-598cec835ea4','Tata Sampann','b89303d3-09b1-4f65-9365-dab49166670c',1750073296846,'Premium quality aata',10,180,'https://drive.google.com/file/d/someImageID/view',_binary '','Wheat Flour',200,50,1750073296846),('ce7e6617-b83d-4957-bf1d-dd0b5704f0a7','Fortune','b89303d3-09b1-4f65-9365-dab49166670c',1718549400000,'Finely ground gram flour for crispy snacks',8,41.4,'https://drive.google.com/file/d/1Rq5aMqLqYokVaqTsF2uQFFY9H1vgx5VB/view?usp=drive_link',_binary '','Besan',45,1,1718549400000),('ea577436-d1da-4ee2-8272-fb7388991782','Catch','b89303d3-09b1-4f65-9365-dab49166670c',1718549400000,'Aromatic coriander powder for rich flavor',10,104.5,'https://drive.google.com/file/d/1B52Ev_X7CXvpSySR7E59fKOgwgHWERcX/view?usp=drive_link',_binary '','Dhaniya Powder',110,1,1718549400000),('f4faf33f-55e3-43b1-a86d-b4cef65430ec','Tata Sampann','b89303d3-09b1-4f65-9365-dab49166670c',1718549400000,'Premium quality aata',10,180,'https://drive.google.com/file/d/someImageID/view',_binary '','Wheat Flour',200,50,1718549400000);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-25 22:46:10
