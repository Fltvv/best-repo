<?php

$arr = array();
$points = array();
$where = null;
$imo = null;

if (!empty($_GET['imo'])) {
    $imo = intval($_GET['imo']);
}

if (!empty($imo)) {
    $where = "WHERE a.imo='".$imo."'";
}

$p = db_query("SELECT point_id, name FROM points");

if ($p!=false) {
    foreach($p as $b) {
        $points[ $b['point_id'] ] = $b['name'];
    }
}

$a = db_query("SELECT a.*,
  ships.name AS shipName,
  ships.ice_class AS iceShipClass
  FROM gant AS a 
  LEFT JOIN ships ON a.imo = ships.imo 
  ".$where." 
  ORDER BY a.point_begin, a.date_begin_fact, a.ice_class, a.dependencies_id");

if ($a != false) {
    
    foreach($a as $b) {
        
        $point_begin = null;
        $point_end = null;
        
        if (!empty($points[ $b['point_begin'] ])) {
            $point_begin = $points[ $b['point_begin'] ];
        }
        
        if (!empty($points[ $b['point_end'] ])) {
            $point_end = $points[ $b['point_end'] ];
        }
        
        $date_start = null;
        $date_end = null;
        
        if (!empty($b['date_begin_fact'])) {
            $date_start = strtotime($b['date_begin_fact'])*1000;
        }
        
        if (!empty($b['date_end_fact'])) {
            $date_end = strtotime($b['date_end_fact'])*1000;
        }
        
        $arr[] = array(
          'start' => $date_start,
          'end' => $date_end,
          'name' => $b['shipName'],
          'id' => $b['id'],
          'type' => 'task',
          'dependencies' => array($b['dependencies_id']),
          'progress' => $b['progress'],
          'color' => $b['color'],
          'point_begin' => $point_begin,
          'point_end' => $point_end,
          'priority' => $b['priority'],
          'ice_class' => $b['iceShipClass']
        );
    }
    
    $json = json_encode($arr,true);
    exit($json);
    
}