-- MariaDB dump 10.19  Distrib 10.5.13-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: ProjetoIntegradorVIII
-- ------------------------------------------------------
-- Server version	10.7.3-MariaDB-1:10.7.3+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Doacoes`
--

DROP TABLE IF EXISTS `Doacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Doacoes` (
  `id` bigint(20) unsigned NOT NULL,
  `id_humano` int(10) unsigned NOT NULL,
  `data_doacao` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Doacoes_id_humano_IDX` (`id_humano`) USING BTREE,
  KEY `Doacoes_data_doacao_IDX` (`data_doacao`) USING BTREE,
  KEY `Doacoes_id_humano_data_doacao_IDX` (`id_humano`,`data_doacao`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Humanos`
--

DROP TABLE IF EXISTS `Humanos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Humanos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `tipo_sangue` enum('A','B','AB','O') CHARACTER SET utf8mb4 NOT NULL,
  `rh` enum('+','-') CHARACTER SET utf8mb4 NOT NULL,
  `cpf` char(11) CHARACTER SET utf8mb4 NOT NULL,
  `telefone` char(11) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cpf` (`cpf`),
  KEY `Humanos_tipo_sangue_IDX` (`tipo_sangue`) USING BTREE,
  KEY `Humanos_tipo_sangue_rh_IDX` (`tipo_sangue`,`rh`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_esperanto_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SMS`
--

DROP TABLE IF EXISTS `SMS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SMS` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `msg` varchar(160) CHARACTER SET utf16 NOT NULL,
  `enviado` datetime NOT NULL,
  `id_usuario` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `SMS_enviado_IDX` (`enviado`) USING BTREE,
  CONSTRAINT `SMS_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Humanos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `VW_HUMANOS_DOAR`
--

DROP TABLE IF EXISTS `VW_HUMANOS_DOAR`;
/*!50001 DROP VIEW IF EXISTS `VW_HUMANOS_DOAR`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `VW_HUMANOS_DOAR` (
  `id_humano` tinyint NOT NULL,
  `nome` tinyint NOT NULL,
  `tipo_sangue` tinyint NOT NULL,
  `rh` tinyint NOT NULL,
  `cpf` tinyint NOT NULL,
  `telefone` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `VW_SMS_HUMANOS`
--

DROP TABLE IF EXISTS `VW_SMS_HUMANOS`;
/*!50001 DROP VIEW IF EXISTS `VW_SMS_HUMANOS`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `VW_SMS_HUMANOS` (
  `id_sms` tinyint NOT NULL,
  `id_humano` tinyint NOT NULL,
  `nome` tinyint NOT NULL,
  `tipo_sangue` tinyint NOT NULL,
  `rh` tinyint NOT NULL,
  `cpf` tinyint NOT NULL,
  `telefone` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'ProjetoIntegradorVIII'
--
/*!50003 DROP PROCEDURE IF EXISTS `SPU_DOACOES_INSERIR` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SPU_DOACOES_INSERIR`(IN pId_usuario INT)
BEGIN
	INSERT INTO ProjetoIntegradorVIII.Doacoes (id_usuario, data_doacao) VALUES (pId_usuario, NOW());

	SELECT 1 AS OKAY;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPU_HUMANOS_INSERIR` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `SPU_HUMANOS_INSERIR`(IN pNome VARCHAR(255),IN  pTipo_sangue enum('A','B','AB','O'),IN  pRh enum('+', '-'),IN  pCpf char(11),IN pTelefone char(11))
BEGIN
	REPLACE INTO ProjetoIntegradorVIII.Humanos(nome,tipo_sangue, rh, cpf, telefone) VALUES (pNome, pTipo_sangue, pRh, pCpf, pTelefone);

	SELECT 1 AS OKAY;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `VW_HUMANOS_DOAR`
--

/*!50001 DROP TABLE IF EXISTS `VW_HUMANOS_DOAR`*/;
/*!50001 DROP VIEW IF EXISTS `VW_HUMANOS_DOAR`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `VW_HUMANOS_DOAR` AS select `h`.`id` AS `id_humano`,max(`h`.`nome`) AS `nome`,max(`h`.`tipo_sangue`) AS `tipo_sangue`,max(`h`.`rh`) AS `rh`,max(`h`.`cpf`) AS `cpf`,max(`h`.`telefone`) AS `telefone` from (`Humanos` `h` left join `Doacoes` `d` on(`d`.`id_humano` = `h`.`id`)) where `d`.`data_doacao` <= current_timestamp() - interval 3 month */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `VW_SMS_HUMANOS`
--

/*!50001 DROP TABLE IF EXISTS `VW_SMS_HUMANOS`*/;
/*!50001 DROP VIEW IF EXISTS `VW_SMS_HUMANOS`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `VW_SMS_HUMANOS` AS select `s`.`id` AS `id_sms`,`h`.`id` AS `id_humano`,`h`.`nome` AS `nome`,`h`.`tipo_sangue` AS `tipo_sangue`,`h`.`rh` AS `rh`,`h`.`cpf` AS `cpf`,`h`.`telefone` AS `telefone` from (`SMS` `s` left join `Humanos` `h` on(`s`.`id_usuario` = `h`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-28 16:14:55
