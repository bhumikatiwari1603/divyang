-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 03, 2019 at 07:05 AM
-- Server version: 5.7.21
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `disablity_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `openings`
--

DROP TABLE IF EXISTS `openings`;
CREATE TABLE IF NOT EXISTS `openings` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NOT NULL,
  `job_title` varchar(200) NOT NULL,
  `job_descr` varchar(300) NOT NULL,
  `job_location` varchar(150) NOT NULL,
  `skills_required` varchar(300) NOT NULL,
  `closing_dt` date NOT NULL,
  `job_status` enum('open','close') NOT NULL DEFAULT 'open',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `openings`
--

INSERT INTO `openings` (`id`, `user_id`, `job_title`, `job_descr`, `job_location`, `skills_required`, `closing_dt`, `job_status`, `created_on`, `updated_on`) VALUES
(1, 65, 'Testa', 'test job descriptionn', 'San Jose', 'test5,\ntest2', '2019-11-21', 'open', '2019-11-24 04:38:12', '2019-11-24 04:52:37'),
(2, 65, 'Test Job Second', 'jksaksjas', 'SFO', 'djljdadj ladmddm', '2020-04-22', 'close', '2019-11-24 04:40:14', '2019-11-24 06:16:40'),
(3, 65, 'TestTwo', 'jjdjdsds aksskj', 'SFO', 'kakjs ssllsdkjjds\n', '2019-11-28', 'open', '2019-11-25 22:12:41', NULL),
(4, 66, 'EmployerOneJobOne', 'jddhshd', 'San Jose', 'jkddkjsdsk\n', '2019-11-28', 'open', '2019-11-25 22:25:20', NULL),
(5, 66, 'EmployerTwoJobTwo', 'jsdhsj', 'Santa Clar', 'jskjdjs', '2019-11-29', 'open', '2019-11-25 22:29:08', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(300) NOT NULL,
  `type_of_user` enum('user','employer') NOT NULL DEFAULT 'user',
  `phone_num` varchar(20) DEFAULT NULL,
  `profile_img_file_name` varchar(300) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `d_o_b` date DEFAULT NULL,
  `resume_file_name` varchar(200) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `orgn_type` varchar(100) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `type_of_user`, `phone_num`, `profile_img_file_name`, `address`, `d_o_b`, `resume_file_name`, `company`, `orgn_type`, `created_on`, `updated_on`) VALUES
(1, 'Narisht', 'Dhyani', 'narishtdhyani14584@sjsu.edu', '$2b$10$iyCbuH3.6Uzrg.hK5m5JG.UDX7p7t9UkMK0wxIDi28v48/kO8E2X.', 'user', '9711661419', NULL, NULL, NULL, NULL, NULL, NULL, '2019-09-17 18:07:30', '2019-09-18 08:24:44'),
(63, 'test', 'user', 'test@gmail.com', '$2b$10$mVJHuLqkkI5JK1t7u1PTQu9E8JO04iEwORgoMmBWA1VR3yf6FocEC', 'user', '887785', 'pi-user-1573774961213.png', 'Fountain Plaza 01', NULL, NULL, NULL, NULL, '2019-11-12 04:35:52', '2019-11-23 22:17:03'),
(64, 'TestOne', 'User', 'test1@gmail.com', '$2b$10$S3t7C9GsggIclSPvFS2sjO3lV4oG5rtviOtJJcbiZ7.OqDthH1Wtu', 'user', '878878', 'pi-user-1574547463585.png', 'FP', NULL, NULL, NULL, NULL, '2019-11-13 03:24:00', '2019-11-23 22:17:43'),
(65, 'TestSecond', 'Employer', 'test2@gmail.com', '$2b$10$KcPKr/G92..pnJ3WGTjyNu89Tgw67WUQXEKuzWGVSzQvJCBgZj62W', 'employer', '78878', 'pi-employer-1574546410239.png', 'San Jose', NULL, NULL, 'AXT', 'Private', '2019-11-13 03:38:20', '2019-11-23 22:19:34'),
(66, 'Testhhd', 'Employer', 'employer1@gmail.com', '$2b$10$uSK/w1uc9TM/SpKsnJ1raOnWilIn.nrga3pwkDTNFBKKQMJOrCbWe', 'employer', NULL, NULL, NULL, NULL, NULL, NULL, 'Private', '2019-11-13 03:44:51', NULL),
(67, 'Testosjs', 'jdsdj', 'jajaoj@gmail.com', '$2b$10$XKP/Iy/7YINIrJzwRFyPy.fkt66MVkg9m7Mez7HF4nbKPCYs544uu', 'employer', NULL, NULL, NULL, NULL, NULL, NULL, 'mss smms sksk', '2019-11-13 03:49:11', NULL),
(68, 'TestO', 'ndnd', 'dndb@gmail.com', '$2b$10$upXz22E3O/HCWjZqzEIzeOK2/5XdvFVhYiGhMv/TClsXTe9ZBm4uO', 'employer', NULL, NULL, NULL, NULL, NULL, 'nsns snsns snsn', 'jsjs sjjsj', '2019-11-13 03:50:56', NULL),
(69, 'hdd', 'bssb', 'employer@gmail.com', '$2b$10$VSdqhxZWZj7XAITIuxlkrOJMyLPLD6ImvKthhvVDLZEbOF8vrQtYm', 'employer', NULL, NULL, NULL, NULL, NULL, 'assj dkdkd', 'ksdksd dkdkd', '2019-11-13 03:51:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_applications`
--

DROP TABLE IF EXISTS `user_applications`;
CREATE TABLE IF NOT EXISTS `user_applications` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `opening_id` int(11) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_applications`
--

INSERT INTO `user_applications` (`id`, `user_id`, `opening_id`, `created_on`) VALUES
(1, 63, 1, '2019-11-25 05:15:26'),
(3, 63, 4, '2019-11-25 22:29:40'),
(6, 63, 3, '2019-11-26 20:51:55'),
(7, 64, 1, '2019-11-26 20:58:28');

-- --------------------------------------------------------

--
-- Table structure for table `user_disabilities`
--

DROP TABLE IF EXISTS `user_disabilities`;
CREATE TABLE IF NOT EXISTS `user_disabilities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_disabilities`
--

INSERT INTO `user_disabilities` (`id`, `user_id`, `name`, `created_on`, `updated_on`) VALUES
(1, 63, 'TestOne', '2019-11-12 06:39:32', '2019-11-14 20:13:23'),
(2, 63, 'Test3', '2019-11-12 06:39:43', '2019-11-12 06:44:18'),
(3, 63, 'TestThree', '2019-11-14 20:12:09', NULL),
(4, 63, 'testfour', '2019-11-14 23:43:00', NULL),
(5, 64, 'dshsds', '2019-11-26 20:57:34', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_employments`
--

DROP TABLE IF EXISTS `user_employments`;
CREATE TABLE IF NOT EXISTS `user_employments` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NOT NULL,
  `orgn_name` varchar(150) NOT NULL,
  `designation` varchar(150) NOT NULL,
  `from_period` date NOT NULL,
  `to_period` date NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_employments`
--

INSERT INTO `user_employments` (`id`, `user_id`, `orgn_name`, `designation`, `from_period`, `to_period`, `created_on`, `updated_on`) VALUES
(1, 63, 'ABC Systems Pvt. Ltd.', 'Assistant', '2017-10-22', '2019-11-22', '2019-11-22 20:23:13', NULL),
(2, 63, 'XYZ Pvt. Ltd.', 'OA', '2015-10-22', '2017-10-21', '2019-11-22 20:23:13', NULL),
(3, 63, 'Dummy Employ', 'ABC', '2014-12-11', '2015-12-16', '2019-12-03 00:19:27', '2019-12-03 00:25:01');

-- --------------------------------------------------------

--
-- Table structure for table `user_qualifications`
--

DROP TABLE IF EXISTS `user_qualifications`;
CREATE TABLE IF NOT EXISTS `user_qualifications` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) UNSIGNED NOT NULL,
  `university_name` varchar(150) NOT NULL,
  `degree_level` varchar(150) NOT NULL,
  `qualification_name` varchar(150) NOT NULL,
  `start_dt` date NOT NULL,
  `completion_dt` date NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_qualifications`
--

INSERT INTO `user_qualifications` (`id`, `user_id`, `university_name`, `degree_level`, `qualification_name`, `start_dt`, `completion_dt`, `created_on`, `updated_on`) VALUES
(1, 63, 'ABC University', 'Bachelor', 'B Tech', '2016-10-26', '2018-11-16', '2019-11-22 21:11:31', '2019-11-23 00:23:48'),
(2, 63, 'QWE University', 'Masters', 'MS', '2019-07-08', '2019-11-22', '2019-11-23 00:24:22', NULL),
(3, 64, 'kndsdn', 'msnsnm', 'mskdkdns', '2019-11-12', '2019-11-20', '2019-11-26 20:58:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_skills`
--

DROP TABLE IF EXISTS `user_skills`;
CREATE TABLE IF NOT EXISTS `user_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_skills`
--

INSERT INTO `user_skills` (`id`, `user_id`, `name`, `created_on`, `updated_on`) VALUES
(1, 63, 'Skill One', '2019-11-22 20:51:59', '2019-11-22 20:52:39'),
(2, 64, 'dnknskd dk', '2019-11-26 20:57:47', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
