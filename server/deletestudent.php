<?php


require_once('mysqlcredentials.php');


$student_id  = intval( $_POST['student_id']);

$output = [
    'success'=>false
];

$query = "DELETE FROM `students` WHERE `id`=$student_id";

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