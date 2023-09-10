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
$ships = array();
$distance = array();

if (isset($_POST['form_id']) && $_POST['form_id'] == 'form_jsFilter') {
    
    $where = null;
    $allTimes = array();
    $speed = array();
    $speedCount = array();
    $imo = array();
    
    foreach($_POST as $key=>$val) {
        
        if ($key == 'date_start') {
            $date_start = date('Y-m-d',strtotime($val));
            $date_start = $date_start.' 00:00:00';
            
            $where .= " AND DATE(a.date_begin_route) >=  '".$date_start."' ";
        }
        
        if ($key == 'date_finish') {
            $date_finish = date('Y-m-d',strtotime($val));
            $date_finish = $date_finish.' 23:59:59';
            $where .= " AND DATE(a.date_end) <=  '".$date_finish."' ";
        }
        
    }
    
    if (!empty($where)) {
        
        $a = db_query("SELECT a.*,
        points.lng,
        points.lat,
        reqests.imo  
        FROM time_steps AS a 
        JOIN points ON a.point_id = points.point_id 
        JOIN reqests ON a.reqest_id = reqests.id 
        WHERE a.optimal=1   
        ".$where." 
        ORDER BY a.step_id");
        
        if ($a != false) {
        
        // корабли
        $ships = array();

        $sh = db_query("SELECT * FROM ships");

        if ($sh != false) {
         foreach($sh as $b) {
           $ships[ $b['imo'] ] = array(
            'name' => $b['name'],
            'img' => $b['img'],
            'speed' => $b['speed'],
            'ice_class' => $b['ice_class'],
            'imo' => $b['imo']
          );
         }
        }
        
        
        
        foreach($a as $b) {
        
        $imo[ $b['route_id'] ][ $b['imo'] ] = $b['imo'];
        
        if (empty($speed[ $b['route_id'] ])) {
            $speed[ $b['route_id'] ] = $b['speed']; 
        }
        
        else {
            $speed[ $b['route_id'] ] += $b['speed'];
        }
        
        $speedCount[$b['route_id']][] = $b['speed'];
        
        // считаем время, нужное для прохождения каждого участка пути
        if (empty($allTimes[ $b['route_id'] ])) {
            $allTimes[ $b['route_id'] ] = $b['time'];
        }
        
        else {
             $allTimes[ $b['route_id'] ] += $b['time'];
        }
        
        
        if (empty($times[ $b['route_id'] ])) {
            $times[ $b['route_id'] ] = round( $b['time'] * 1000 );
        }
        
        else {
            $times[ $b['route_id'] ] .= ','.round( $b['time'] * 1000 );
        }
        
        $routes[ $b['route_id'] ][] = $b['lat'].','.$b['lng'];
        
        if (empty($coords[ $b['route_id'] ])) {
            $coords[ $b['route_id'] ] = '['.$b['lat'].','.$b['lng'].']';
        }
        
        else {
            $coords[ $b['route_id'] ] .= ',['.$b['lat'].','.$b['lng'].']';
        }     
    }
    
    $routeShip = array();
    // к каждому маршруту привязываем корабль
    foreach($imo as $route_id=>$val) {
        foreach($val as $imo_number=>$v) {
            $routeShip[$route_id] = $imo_number;
        }
    }
    
    ob_start();
    require_once $_SERVER['DOCUMENT_ROOT'].'/map2/includes/map.inc.php';
    $html = ob_get_clean();
    exit($html);
    
  }
        
}    
}