CREATE DATABASE  IF NOT EXISTS `imgbook` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `imgbook`;
-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: imgbook
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `user_lastName` varchar(45) NOT NULL,
  `user_password` varchar(45) NOT NULL,
  `user_nickname` varchar(45) NOT NULL,
  `user_description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `id_users_UNIQUE` (`user_id`),
  UNIQUE KEY `user_nickname_UNIQUE` (`user_nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=690 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John','Doe','password123','johndoe','This is a description for John Doe.'),(2,'Jane','Smith','password123','janesmith','This is a description for Jane Smith.'),(3,'James','Bond','password123','jamesbond007','A secret agent known for his charm.'),(4,'Emily','Johnson','password123','emilyj','Loves traveling and photography.'),(5,'Michael','Williams','password123','mike_w','Enjoys sports and outdoor activities.'),(6,'Sarah','Brown','password123','sarah_b','A passionate chef and foodie.'),(7,'David','Jones','password123','davidjones','Tech enthusiast and programmer.'),(8,'Laura','Garcia','password123','laura_g','Enjoys reading and painting.'),(9,'Robert','Martinez','password123','rob_mart','A musician with a love for jazz.'),(10,'Linda','Rodriguez','password123','lindarod','Enjoys hiking and nature walks.'),(11,'William','Lee','password123','william_lee','Loves photography and editing.'),(12,'Barbara','Gonzalez','password123','barb_gon','A fan of classic films and theater.'),(13,'Richard','Perez','password123','rich_perez','Avid sports fan and gamer.'),(14,'Joseph','Wilson','password123','joseph_w','A passionate traveler and photographer.'),(15,'Charles','Anderson','password123','charles_and','Loves reading science fiction books.'),(16,'Susan','Thomas','password123','susan_th','Enjoys painting and writing poetry.'),(17,'Thomas','Taylor','password123','tom_taylor','Big fan of history and classical music.'),(18,'Matthew','Moore','password123','matt_moore','Avid gamer and tech lover.'),(19,'Elizabeth','Jackson','password123','liz_jack','Passionate about cooking and yoga.'),(20,'Donald','White','password123','don_white','Enjoys hiking and bird watching.'),(21,'Nancy','Harris','password123','nancy_h','A lover of animals and nature.'),(22,'Gary','Martin','password123','gary_martin','A car enthusiast and mechanic.'),(23,'Jessica','Thompson','password123','jess_t','A traveler and lover of adventure.'),(24,'Frank','Garcia','password123','frank_gar','Music lover and collector of vinyl records.'),(25,'Ruth','Martinez','password123','ruth_m','Enjoys reading and knitting.'),(26,'Eric','Roberts','password123','eric_r','Tech geek and gamer.'),(27,'Megan','Lewis','password123','megan_l','Loves writing and painting.'),(28,'Andrew','Walker','password123','andrew_w','A fan of movies and sports.'),(29,'Michelle','Allen','password123','michelle_a','Loves fashion and design.'),(30,'Steven','Young','password123','steve_young','Big fan of fitness and martial arts.'),(31,'Rebecca','King','password123','rebecca_k','A lover of books and history.'),(32,'Paul','Scott','password123','paul_s','Enjoys playing sports and working out.'),(33,'Kimberly','Adams','password123','kimberly_a','Avid reader and traveler.'),(34,'Brian','Baker','password123','brian_b','An adventurer and nature enthusiast.'),(35,'Sharon','Nelson','password123','sharon_n','Loves gardening and painting.'),(36,'Ronald','Carter','password123','ron_carter','A tech enthusiast and gamer.'),(37,'Betty','Mitchell','password123','betty_mit','Fan of gardening and the arts.'),(38,'George','Perez','password123','george_perez','Passionate about photography and nature.'),(39,'Melissa','Roberts','password123','mel_roberts','Enjoys dancing and singing.'),(40,'Kenneth','Evans','password123','ken_evans','Loves hiking and photography.'),(41,'Deborah','Collins','password123','debbie_c','Interested in history and traveling.'),(42,'Daniel','Stewart','password123','daniel_s','Avid sports player and tech enthusiast.'),(43,'Karen','Sanchez','password123','karen_s','Loves the arts and photography.'),(44,'Joshua','Morris','password123','josh_morris','Enjoys cycling and outdoor activities.'),(45,'Mary','Rogers','password123','mary_rogers','Loves art, music, and history.'),(46,'Nathan','Reed','password123','nathan_r','A fitness lover and entrepreneur.'),(47,'Donna','Cook','password123','donna_cook','Passionate about cooking and fitness.'),(48,'Gary','Morgan','password123','gary_morgan','Tech enthusiast and photographer.'),(49,'Cynthia','Bell','password123','cynthia_b','A lover of animals and literature.'),(50,'Jack','Hughes','password123','jack_hughes','Enjoys movies, books, and sports.'),(51,'Helen','Price','password123','helen_price','Loves volunteering and outdoor adventures.'),(52,'Samuel','Reyes','password123','samuel_reyes','A lover of photography and gaming.'),(53,'Anna','Wood','password123','anna_wood','Fan of fashion and cooking.');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


CREATE TABLE `imgbook`.`posts` (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `fk_user_id` INT NOT NULL,
  `post_description` VARCHAR(500) NULL,
  `post_img` VARCHAR(45) NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE INDEX `post_id_UNIQUE` (`post_id` ASC) VISIBLE,
  INDEX `fk_posts_1_idx` (`fk_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_userTopost`
    FOREIGN KEY (`fk_user_id`)
    REFERENCES `imgbook`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
-- Dump completed on 2024-12-31 13:32:15
