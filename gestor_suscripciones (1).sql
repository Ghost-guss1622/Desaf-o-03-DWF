-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-11-2025 a las 08:18:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestor_suscripciones`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripcion`
--

CREATE TABLE `suscripcion` (
  `id` bigint(20) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `Duracion_meses` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio` decimal(38,2) NOT NULL,
  `tipo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `suscripcion`
--

INSERT INTO `suscripcion` (`id`, `estado`, `Duracion_meses`, `nombre`, `precio`, `tipo`) VALUES
(1, 'Activo', 2, 'Netflix', 9.00, 'Estandár'),
(2, 'Activo', 1, 'Spotify', 7.65, 'Premium'),
(3, 'Activo', 1, '', 0.00, ''),
(4, 'Activo', 1, '', 0.00, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripciones_usuarios`
--

CREATE TABLE `suscripciones_usuarios` (
  `id` bigint(20) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `fecha_fin` date NOT NULL,
  `fecha_inicio` date NOT NULL,
  `id_suscripcion` bigint(20) NOT NULL,
  `id_usuario` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `suscripciones_usuarios`
--

INSERT INTO `suscripciones_usuarios` (`id`, `estado`, `fecha_fin`, `fecha_inicio`, `id_suscripcion`, `id_usuario`) VALUES
(1, 'ACTIVA', '2025-10-23', '2025-09-23', 3, 1),
(2, 'ACTIVA', '2025-09-26', '2025-08-26', 1, 2),
(3, 'ACTIVA', '2025-07-10', '2025-06-10', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fechanac` date DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `apellido`, `email`, `fechanac`, `nombre`, `password`, `username`) VALUES
(1, 'Fuentes', 'Leviacker98@gmail.com', '1998-05-10', 'Levi', '', ''),
(2, 'Gomez', 'sofia.gomez@gmail.com', '2000-03-10', 'Sofia', '', ''),
(3, 'Enriquez', 'JossEnriquez23@gmail.com', '2002-02-23', 'Josué', '', ''),
(4, 'Palacios', 'PalcaiosR@gmail.com', '1989-05-10', 'Ricardo', '', ''),
(5, 'Valleda', 'Ari.Valleda@gmail.com', '1996-08-23', 'Ariana', '', ''),
(6, 'Urrutia', 'marcelo.urrutia@gmail.com', '1998-04-12', 'Marcelo', 'admin123', 'Admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `suscripciones_usuarios`
--
ALTER TABLE `suscripciones_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKr884notgeanu7v6fvscnkif01` (`id_usuario`),
  ADD KEY `FKcwhee3c6wytyxqn162x16dxnj` (`id_suscripcion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK5171l57faosmj8myawaucatdw` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `suscripciones_usuarios`
--
ALTER TABLE `suscripciones_usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `suscripciones_usuarios`
--
ALTER TABLE `suscripciones_usuarios`
  ADD CONSTRAINT `FKcwhee3c6wytyxqn162x16dxnj` FOREIGN KEY (`id_suscripcion`) REFERENCES `suscripcion` (`id`),
  ADD CONSTRAINT `FKr884notgeanu7v6fvscnkif01` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
