<?php
//ini_set('error_reporting', E_ALL);
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);

date_default_timezone_set("UTC"); // Устанавливаем часовой пояс по Гринвичу
header('Content-Type: text/html; charset=utf-8'); // устанавливаем кодировку
setlocale(LC_ALL, 'ru_RU', 'ru_RU.UTF-8', 'ru', 'russian');

require_once $_SERVER['DOCUMENT_ROOT'] . "/api/config.php";
require_once $_SERVER['DOCUMENT_ROOT'] . "/api/lib/db.php";
require_once $_SERVER['DOCUMENT_ROOT'] . "/api/lib/functions.php";

// если в url не указано название модуля, то по умолчанию загружается модуль главной страницы
if (empty($_GET['mod']))
    $xc['module'] = 'main';
    
else
    $xc['module'] = clearData($_GET['mod'], 'get');
// ---------------------------------------------------------------------------------------------------------------------

// если указанный в url модуль не существует, то по умолчанию загружается модуль главной страницы
if (!file_exists($_SERVER['DOCUMENT_ROOT'] . '/api/modules/' . $xc['module'] .'/index.php')) {
      $xc['module'] = 'main';
}
// ---------------------------------------------------------------------------------------------------------------------

if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/api/modules/' . $xc['module'] . '/index.php')) {
    require_once $_SERVER['DOCUMENT_ROOT'] . '/api/modules/' . $xc['module'] . '/index.php';
}
    
?>