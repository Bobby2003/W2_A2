-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: charityevents_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Assistance','Activities providing help to people in need.'),(2,'Fundraising','Activities to collect funds or resources.'),(3,'Collection','Activities to collect specific items or resources.'),(4,'Running','Charity events in the form of running.'),(5,'Animal Protection','Activities focusing on animal welfare and conservation.');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `org_id` int NOT NULL,
  `category_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `short_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_description` text COLLATE utf8mb4_unicode_ci,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_datetime` datetime NOT NULL,
  `end_datetime` datetime NOT NULL,
  `price` decimal(8,2) DEFAULT '0.00',
  `goal_amount` decimal(12,2) DEFAULT '0.00',
  `current_amount` decimal(12,2) DEFAULT '0.00',
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive','close','cancel') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `org_id` (`org_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`org_id`) REFERENCES `organisations` (`id`),
  CONSTRAINT `events_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,1,2,'Donation for an Unknown Shrine','Raise funds to repair a local shrine and support the poor shrine maidens.',NULL,'Gensokyo Shrine','2025-10-10 09:00:00','2025-10-10 17:00:00',0.00,5000.00,1200.00,'/images/events/shrine.jpg','active','2025-10-05 16:11:38','2025-10-05 16:11:38'),(2,1,1,'Midnight Diner Assistance','Provide meals and support for night-time workers.',NULL,'Diner','2025-11-01 20:00:00','2025-11-01 23:00:00',5.00,2000.00,800.00,'/images/events/food.jpg','active','2025-10-05 16:11:38','2025-10-05 16:11:38'),(3,2,3,'Collect Fallen Teddy Bears','Collect toy teddy bears that fall from the sky.',NULL,'Under the apartment','2025-10-25 10:00:00','2025-10-25 16:00:00',0.00,1000.00,450.00,'/images/events/teddybear.jpg','active','2025-10-05 16:11:38','2025-10-05 16:11:38'),(4,2,1,'Caring for Left-behind Children','Provide daily life and learning support for left-behind children.',NULL,'Shirasu Gorge','2025-11-10 09:00:00','2025-11-10 17:00:00',0.00,3000.00,1500.00,'/images/events/childcare.jpg','active','2025-10-05 16:11:38','2025-10-05 16:11:38'),(5,4,2,'Sponsorship for Searching a First Love Abroad','Seek sponsorship for an overseas travel to find a first love.',NULL,'D3XB','2025-12-01 09:00:00','2025-12-15 17:00:00',10.00,10000.00,3000.00,'/images/events/lovefund.jpg','active','2025-10-05 16:11:38','2025-10-05 16:11:38'),(6,3,5,'Protect the Dodo Bird Operation','Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo...',NULL,'Unemployed Cat Group','2025-10-20 08:00:00','2025-10-20 12:00:00',0.00,7000.00,2500.00,'/images/events/dodo.jpg','active','2025-10-05 16:11:38','2025-10-05 16:11:38'),(7,3,4,'Sunshine Run','Charity running event for the community.',NULL,'On the street','2025-11-05 07:00:00','2025-11-05 10:00:00',15.00,5000.00,2000.00,'/images/events/sunrun.jpg','active','2025-10-05 16:11:38','2025-10-05 16:11:38'),(8,5,2,'Equipment Donation','Collect adventure equipment donations for reincarnators.',NULL,'Otherworld Rebirth Center','2025-11-15 09:00:00','2025-11-15 17:00:00',0.00,6000.00,1800.00,'/images/events/equipment.jpg','active','2025-10-05 16:11:38','2025-10-05 16:11:38');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organisations`
--

DROP TABLE IF EXISTS `organisations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organisations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `contact_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organisations`
--

LOCK TABLES `organisations` WRITE;
/*!40000 ALTER TABLE `organisations` DISABLE KEYS */;
INSERT INTO `organisations` VALUES (1,'Gensokyo Foundation','A foundation dedicated to public welfare and cultural preservation in the Gensokyo region.',NULL,NULL,NULL,NULL,'2025-10-05 16:05:58'),(2,'Shirasu Gorge','A bar.',NULL,NULL,NULL,NULL,'2025-10-05 16:05:58'),(3,'Unemployed Cat Group','Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo Dodo.',NULL,NULL,NULL,NULL,'2025-10-05 16:05:58'),(4,'D3XB','D3XB D3XB D3XB D3XB D3XB D3XB D3XB D3XB D3XB D3XB D3XB D3XB D3XB.',NULL,NULL,NULL,NULL,'2025-10-05 16:05:58'),(5,'Otherworld Rebirth Center','A charity and mutual aid center for otherworld experience seekers.',NULL,NULL,NULL,NULL,'2025-10-05 16:05:58');
/*!40000 ALTER TABLE `organisations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-06  1:17:05
