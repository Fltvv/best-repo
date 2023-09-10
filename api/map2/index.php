<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

date_default_timezone_set("UTC"); // Устанавливаем часовой пояс по Гринвичу
header('Content-Type: text/html; charset=utf-8'); // устанавливаем кодировку
setlocale(LC_ALL, 'ru_RU', 'ru_RU.UTF-8', 'ru', 'russian');

require_once $_SERVER['DOCUMENT_ROOT'] . "/api/config.php";
require_once $_SERVER['DOCUMENT_ROOT'] . "/api/lib/db.php";
require_once $_SERVER['DOCUMENT_ROOT'] . "/api/lib/functions.php";

define('MOBILE', is_mobile($_SERVER['HTTP_USER_AGENT']));

// достаём из базы координаты маршрута
$routes = array();
$coords = array();
$times = array();
$distance = array();

$a = db_query("SELECT * 
        FROM routes 
        WHERE route_id=5 OR route_id=8 
        ORDER BY step");

      if ($a != false) {
        
        // корабли
        $ships = array();

        $sh = db_query("SELECT * FROM ships");

        if ($sh != false) {
         foreach($sh as $b) {
           $ships[ $b['id'] ] = array(
            'name' => $b['name'],
            'img' => $b['img'],
            'speed' => $b['speed'],
            'ice_class' => $b['ice_class'],
            'imo' => $b['imo']
          );
         }
        }
        
        foreach($a as $b) {
        
        if (empty($distance[ $b['route_id'] ])) {
            $distance[ $b['route_id'] ] = $b['distance'];
        }
        
        else {
            $distance[ $b['route_id'] ] += $b['distance'];
        }
        
        // считаем время, нужное для прохождения каждого участка пути
        if (empty($times[ $b['route_id'] ])) {
            $times[ $b['route_id'] ] = round( ($b['distance'] / $ships[ $b['route_id'] ]['speed']) * 1000 );
        }
        
        else {
            $times[ $b['route_id'] ] .= ','.round( ($b['distance'] / $ships[ $b['route_id'] ]['speed']) * 1000 );
        }
        
        $routes[ $b['route_id'] ][] = $b['lat'].','.$b['lng'];
        
        if (empty($coords[ $b['route_id'] ])) {
            $coords[ $b['route_id'] ] = '['.$b['lat'].','.$b['lng'].']';
        }
        
        else {
            $coords[ $b['route_id'] ] .= ',['.$b['lat'].','.$b['lng'].']';
        }     
    }

}

// достаём список кораблей
$ships2 = db_query("SELECT id, name FROM ships");

// находим максимальную и минимальную дату 
$dates = db_query("SELECT MIN(date_begin_route) AS min_date, MAX(date_end) AS max_date FROM time_steps");

$minDate = date('d.m.Y',strtotime($dates[0]['min_date']));
$maxDate = date('d.m.Y',strtotime($dates[0]['max_date']));

//exit(print_r($dates));

require_once $_SERVER['DOCUMENT_ROOT'].'/map2/tmp.inc.php';
?>