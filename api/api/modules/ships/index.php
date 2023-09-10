<?php

$a = db_query("SELECT * FROM ships");

if ($a != false) {
    $json = json_encode($a,true);
    exit($json);
}