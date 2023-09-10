<?php

$a = db_query("SELECT * FROM tasks");

if ($a != false) {
    $json = json_encode($a,true);
    exit($json);
}