<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

require_once('mysqlcredentials.php');

$output = [
  'success' => false,
  'error' =>[]
];

  foreach( $_POST as $key=>$value) {
      $_POST[$key] = addslashes($value);
  }

  if(strlen($_POST['name']) < 2) {
      $output['error'] = 'name must be at least 2 characters long';
  }
  if(strlen($_POST['course']) < 2) {
      $output['error'] = 'course must be at least 2 characters long';
  }
  if(!is_numeric($_POST['grade'])) {
          $output['error'] = 'grade must be a number';
  } else {
          $grade = intval($_POST['grade']);
          if ($grade > 100 || $grade < 0) {
              $output['error'] = 'grade must be greater or equal to 0 and less than or equal to 100';
      }
  }

  print($_POST['name']. $_POST['course']. $_POST['grade'].$_POST['student_id']);


//$query = "UPDATE `students` SET `name`= '{$_POST['name']}', `course`= '{$_POST['course']}', `grade`= '{$_POST['grade']}' WHERE `id`= {$_POST['id']} ";
$insertNewStudentQuery = $db->prepare("UPDATE `students` AS s SET
                                           s.name = ?, s.course = ?, s.grade = ?
                                           WHERE `id` = ?");

$insertNewStudentQuery->bind_param("ssii", $_POST['name'], $_POST['course'], $_POST['grade'],$_POST['student_id']);
$insertNewStudentQuery->execute();
$insertNewStudentQuery->store_result();

if($insertNewStudentQuery)

{$output['success']=true;

} else {
    $db -> error;
}

//$result = mysqli_query($db, $query) ;


//if($result){
//    $output['success']=true;
//    $output['new_id'] = mysqli_insert_id( $db);
//}else {
//    $output['error']= mysqli_error($db);
//}

$json_output = json_encode( $output );

print( $json_output );


?>