<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");


require_once('mysqlcredentials.php');

$query =  "SELECT * FROM `students`";
if( empty( $_GET['course'])  ) {
   $query = "SELECT * FROM `students`";
} else {
    $course = addslashes( $_GET['course']);
    $query ="SELECT * FROM  `students` WHERE `course`= '{$course}'";
}




$result = mysqli_query($db, $query);

$output = [
    'success' =>false
];
$data = [];

while($row = mysqli_fetch_assoc($result)) {
      array_push($data, $row);
}
$output['data'] = $data;
$output['success'] = true;

$json_output = json_encode( $output);

print( $json_output);
?>