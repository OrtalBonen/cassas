-- MariaDB dump 10.19  Distrib 10.6.7-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: cassas
-- ------------------------------------------------------
-- Server version	10.6.7-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Towels',1,5),(2,'Bathroom Rugs',2,5),(3,'Accesories',3,5),(4,'Storage',4,5),(5,'Spa',5,5),(6,'Decorations',6,2),(7,'Pillows',7,2),(8,'Storage',8,2),(9,'Rugs',9,2),(10,'Cookware & Bakeware',10,3),(11,'Storage',11,3),(12,'Kitchen Towels',12,3),(13,'Kitchen Accesories',13,3),(14,'Bed Linen',14,1),(15,'Bedspreads ',15,1),(16,'Blankets',16,1),(17,'Pillows',17,1),(18,'Storage',18,1),(19,'Decorations',19,1),(20,'Tableware',20,4),(21,'Cultery',21,4),(22,'Tablecloths',22,4),(23,'Accesories',23,4);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Tel Aviv'),(2,'Givataym'),(3,'Holon'),(4,'Ramat Gan'),(5,'Rishon Lezion'),(6,'Bat Yam'),(7,'Ranana'),(8,'Ramat Asharon'),(9,'Ashdod'),(10,'Yavne');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `collection_images`
--

LOCK TABLES `collection_images` WRITE;
/*!40000 ALTER TABLE `collection_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `collections`
--

LOCK TABLES `collections` WRITE;
/*!40000 ALTER TABLE `collections` DISABLE KEYS */;
/*!40000 ALTER TABLE `collections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `collections_colors`
--

LOCK TABLES `collections_colors` WRITE;
/*!40000 ALTER TABLE `collections_colors` DISABLE KEYS */;
/*!40000 ALTER TABLE `collections_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'transparant',1),(2,'white',2),(3,'black',3),(4,'orang',4),(5,'green',5),(6,'red',6),(7,'yellow',7),(8,'gray',8),(9,'gold',9),(10,'silver',10),(11,'colorfull',11);
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Bedroom',1),(2,'Living room',2),(3,'Kitchen',3),(4,'Dinning',4),(5,'Bathroom',5);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,52,0,20,1,2,'2022-05-03','https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmFzZXxlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60'),(2,28,0,12,2,8,'2022-05-03','https://images.unsplash.com/photo-1554577621-1a3def0b656c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmFzZXxlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60'),(3,42,0,2,4,4,'2022-05-03','https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dmFzZXxlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60'),(4,12,0,2,5,4,'2022-05-03','https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FuZGxlfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=400&q=60'),(5,22,0,10,6,11,'2022-05-03','https://images.unsplash.com/photo-1603905179139-db12ab535ca9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNhbmRsZXxlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60'),(6,8,0,22,7,2,'2022-05-03','https://images.unsplash.com/photo-1612179543058-ab74d388e0ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhbmRsZXxlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60'),(7,220,0,10,8,7,'2022-05-03','https://images.unsplash.com/photo-1572427734891-5592aae758b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cnVnc3xlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60'),(8,345,0,2,9,5,'2022-05-03','https://images.unsplash.com/photo-1615473857926-96b545a7e399?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cnVnc3xlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60'),(9,20,0,10,10,8,'2022-05-03','https://images.unsplash.com/photo-1638232928539-6e91c47ddec5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dG93ZWx8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60'),(10,12,0,16,11,2,'2022-05-03','https://images.unsplash.com/photo-1621468644541-deea173bd43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dG93ZWx8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60'),(11,34,0,60,12,11,'2022-05-03','https://images.unsplash.com/photo-1616663717839-2fea42e1a1f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dG93ZWx8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60'),(12,38,0,12,13,8,'2022-05-03','https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmF0aHJvb20lMjBydWd8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60'),(13,26,0,14,14,3,'2022-05-03','https://images.unsplash.com/photo-1614806686974-4d53169a47cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzcGVuc2VyfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=400&q=60'),(14,10,0,30,15,4,'2022-05-03','https://images.unsplash.com/photo-1614806687792-7fcec07dcbbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZGlzcGVuc2VyJTIwYmF0aHxlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60'),(15,6,0,23,18,2,'2022-05-03','https://images.unsplash.com/photo-1648650899893-72873119db3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29hcCUyMGRpc2h8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60'),(16,63,0,2,19,2,'2022-05-03','https://images.unsplash.com/photo-1606137065352-02861cd59491?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVjb3JhdGUlMjBwaWxsb3d8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60'),(17,42,0,6,20,7,'2022-05-03','https://images.unsplash.com/photo-1592789705442-5b20c74711cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGRlY29yYXRlJTIwcGlsbG93fGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=400&q=60'),(18,22,0,8,21,11,'2022-05-03','https://images.unsplash.com/photo-1605845990090-9efce68df1c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGRlY29yYXRlJTIwcGlsbG93fGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=400&q=60'),(19,225,0,6,22,11,'2022-05-03','https://images.unsplash.com/photo-1571139627661-cf707929f465?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGJsYW5rZXR8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60'),(20,275,0,12,23,11,'2022-05-03','https://images.unsplash.com/photo-1630931219308-803ac33ea9b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmxhbmtldHxlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60'),(21,124,0,2,24,8,'2022-05-03','https://images.unsplash.com/photo-1608158222851-af032106bca9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYW5rZXR8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60'),(22,422,0,23,25,11,'2022-05-03','https://images.unsplash.com/photo-1559051668-9024c9b5e84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGlsbG93fGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=400&q=60'),(23,52,0,22,26,11,'2022-05-03','https://images.unsplash.com/photo-1624538861479-347affd8511f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHRvd2Vsc3xlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60'),(24,45,0,23,27,11,'2022-05-03','https://images.unsplash.com/photo-1596433904500-97b901c5d274?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHRvd2Vsc3xlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60'),(25,26,0,54,28,11,'2022-05-03','https://images.unsplash.com/photo-1596433904493-c7ae3d6d179f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fHRvd2Vsc3xlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60'),(26,362,0,12,29,7,'2022-05-03','https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVjb3JhdGlvbnxlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60'),(27,14,0,23,30,1,'2022-05-03','https://images.unsplash.com/photo-1604306354505-8bab3239b009?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGVjb3JhdGlvbnxlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60'),(28,12,0,31,31,2,'2022-05-03','https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRlY29yYXRpb258ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60'),(29,48,0,12,32,9,'2022-05-03','https://images.unsplash.com/photo-1608892236892-ab98c047f498?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRlY29yYXRpb258ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60'),(30,346,0,231,33,2,'2022-05-03','https://images.unsplash.com/photo-1527694224012-be005121c774?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGRlY29yYXRpb258ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60'),(31,12,0,34,34,1,'2022-05-03','https://images.unsplash.com/photo-1595753076458-19a4fc7b9150?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGRlY29yYXRpb258ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60'),(32,124,0,324,35,2,'2022-05-03','https://images.unsplash.com/photo-1526827826797-7b05204a22ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fGRlY29yYXRpb258ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products_categories`
--

LOCK TABLES `products_categories` WRITE;
/*!40000 ALTER TABLE `products_categories` DISABLE KEYS */;
INSERT INTO `products_categories` VALUES (1,6,1),(2,6,2),(3,6,4),(4,6,5),(5,6,6),(6,19,7),(7,9,8),(8,9,9),(9,1,10),(10,1,11),(11,1,12),(12,2,13),(13,3,14),(14,3,15),(15,3,18),(16,7,19),(17,17,20),(18,7,21),(19,16,22),(20,16,23),(21,16,24),(22,7,25),(23,12,26),(24,12,27),(25,12,28),(26,6,29),(27,19,30),(28,7,31),(29,19,32),(30,9,33),(31,6,34),(32,6,35);
/*!40000 ALTER TABLE `products_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rootproducts`
--

LOCK TABLES `rootproducts` WRITE;
/*!40000 ALTER TABLE `rootproducts` DISABLE KEYS */;
INSERT INTO `rootproducts` VALUES (1,'White Ceramic Vase ',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'Gray Ceramic Vase',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'Wood Vase',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'Wood Vase',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'Glass candle',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'Ceramic Candle',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'White Candle',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'Jute Rug',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'Green Rug',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'Gray Towel',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'White Small Towell',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'Pair Of Towels',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'Round Rg',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'Dispenser Black & Gold',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'Wood Soap Dish',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'Stone Soap Dish',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'Stone Soap Dish',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'Stone Soap Dish',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'Texture Pillow',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,'Woven Pillow',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,'Flowers Pattern Pillow',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,'Set Of Three Blankets',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,'Pair Of Blankets',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,'Gray Wool Blanket',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,' Pillows Set',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,'Five Towels',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,'Five Cotton Towels ',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(28,'Four Cotton Towels Set',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,'Two Wood Vases',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(30,'Small Glase Vase',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(31,'White Small Vase',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(32,'Shelf Accesory',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(33,'White Rug',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(34,'Glass Vase ',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(35,'Cotton Plant Basket',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `rootproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('iRjO3ZdmKVfCsr80uzBAwYTZvBvY5cxF',1656793315,'{\"cookie\":{\"originalMaxAge\":5184000000,\"expires\":\"2022-07-02T20:21:55.110Z\",\"httpOnly\":true,\"path\":\"/\"},\"userId\":1,\"isAdmin\":1}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@cassas.com','','$2b$10$gh8PE6ct2UiDP1MtmnnfiutINetsE5SvMiQVY2VCQVo0forR9ssXa','admin','admin',NULL,NULL,NULL,NULL,'2022-05-03 21:51:50',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-03 23:30:01
