<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

require_once('mysqlcredentials.php');

$student_id = intval( $POST['student_id']);

$query = "DELETE FROM `students` WHERE `id` > 100";

$result = mysqli_query($db, $query);

if( $result ){
    if(mysqli_affected_rows($db) ===1) {
        $output['success'] = true;
    } else {
        $output['error'] = 'could not delete student';
    }
} else {
    $output['error'] = mysqli_error($db);
}

$json_output = json_encode($output);

print($json_output);




?>