/* information about jsdocs:
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
*
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

$(document).on('click', '.saveEdit', function(){
    console.log ("testing new Edit");
    var student_id = $(".saveEdit").attr("ID");

    const nameValue = $('#editStudentName').val();
    const courseValue = $('#editCourse').val();
    const gradeValue = $('#editStudentGrade').val();

    $.ajax({
        url: "http://localhost:8888/student_grade_table/server/updatestudent.php",
        method: "POST",
        data: {
            student_id:student_id,
            name: nameValue,
            course: courseValue,
            grade: gradeValue
        },
        // dataType:"json",
        // success:function(data){
        //     $('#editStudentName').val(data.editStudentName),
        //     $('#editCourse').val(data.editCourse),
        //     $('#editStudentGrade').val(data.editStudentGrade);
        // }
    })
});


/**
 * Define all global variables here.
 */
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input:
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
var student_array = [];





/***************************************************************************************************
 * initializeApp
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application, including adding click handlers and pulling in any data from the server, in later versions
 */
function initializeApp(){
    addClickHandlersToElements();
    getData();
    // inputValidation();
}

// function validation(){
//     var name = $("#studentName").val();
//     var course = $("#course").val();
//     var grade = $("#studentGrade").val();
//
//     var nameCheck = /^([A-Z][a-z]+)\s([A-Z][a-zA-Z-]+)$/;
//     var courseCheck = /^[a-zA-Z ]{2,30}$/;
//     var gradeCheck = /^100$|^\d{0,2}(\.\d{1,2})? *%?$/;
//
//     if(nameCheck.test(name)){
//         debugger;
//         document.getElementById('name-error').innerHTML = "";
//     } else {
//      document.getElementById("name-error").innerHTML= "testing";
//         return false;
//
//     }
//     if(courseCheck.test(course)){
//         document.getElementById('course-error').innerHTML = "";
//     } else {
//         document.getElementById("course-error").innerHTML= "please enter your first and last name"
//         return false;
//
//     }
//     if(gradeCheck.test(grade)){
//         document.getElementById('grade-error').innerHTML = "";
//     } else {
//         document.getElementById("grade-error").innerHTML= "please enter your first and last name";
//         return false;
//
//     }
//     addStudent()
//
//
//
//
//
// }

// function validation() {
//     debugger;
//     var name = $("#studentName").val();
//     var course = $("#course").val();
//     var grade = $("#studentGrade").val();
//
//     if(name.length == 0) {
//         namePrompt("Name is required", "name-error", "red");
//         event.preventDefault()
//         return false
//     }
//     if(course.length == 0 ){
//         coursePrompt("course is required", "course-error", "red");
//         event.preventDefault()
//         return false;
//     }
//     if (grade.length == 0) {
//         gradePrompt("Grade is required", "grade-error", "red")
//         event.preventDefault()
//     }
//     if(!name.match(/^([A-Z][a-z]+)\s([A-Z][a-zA-Z-]+)$/)) {
//         event.preventDefault()
//         namePrompt("First and Last Name please", "name-error", "red");
//         return false
//     }
//     if(!course.match(/^[a-zA-Z ]{2,30}$/)) {
//         coursePrompt("Please enter a valid course", "course-error", "red");
//         event.preventDefault()
//         return false
//     }
//     if(!grade.match(/^100$|^\d{0,2}(\.\d{1,2})? *%?$/)) {
//         gradePrompt("Please enter a valid grade", "grade-error", "red");
//         event.preventDefault()
//         return false
//     }
//     namePrompt("name is valid", "name-error", "green");
//     coursePrompt("Course is valid", "course-error", "green");
//     gradePrompt("Grade is valid", "grade-error", "green");
//     return true;
//
// }
function nameValidation() {
    var name = $("#studentName").val();
    if(name.length == 0) {
        namePrompt("Name is required", "name-error", "red");
        return false
    }
    if(!name.match(/^([A-Z][a-z]+)\s([A-Z][a-zA-Z-]+)$/)) {
        event.preventDefault()
        namePrompt("First and Last Name please", "name-error", "red");
        return false
    }
    namePrompt("name is valid", "name-error", "green");
    return true;


}

function namePrompt(message, promptLocation, color) {
    document.getElementById(promptLocation).innerHTML = message;
    document.getElementById(promptLocation).style.color = color;
}

function editNameValidation() {
    var editName = $("#editStudentName").val();
    if(editName.length == 0) {
        editnamePrompt("Name is required", "editName-error", "red");
        return false
    }
    if(!editName.match(/^([A-Z][a-z]+)\s([A-Z][a-zA-Z-]+)$/)) {
        event.preventDefault()
        editNamePrompt("First and Last Name please", "editName-error", "red");
        return false
    }
    editNamePrompt("name is valid", "editName-error", "green");
    return true;
}
function editNamePrompt(message, promptLocation, color) {
    document.getElementById(promptLocation).innerHTML = message;
    document.getElementById(promptLocation).style.color = color;
}
function courseValidation() {
    console.log('course error');
    var course = $("#course").val();

    if(course.length == 0 ){
        coursePrompt("course is required", "course-error", "red");
        return false;
    }
    if(!course.match(/^[a-zA-Z ]{2,30}$/)) {
        coursePrompt("Please enter a valid course", "course-error", "red");
        return false
    }
    coursePrompt("Course is valid", "course-error", "green");
    return true;
}

function coursePrompt(errorMessage, messageLocation, color) {
    document.getElementById(messageLocation).innerHTML = errorMessage;
    document.getElementById(messageLocation).style.color = color;
}

function editCourseValidation() {
    var editCourse = $("#editCourse").val();

    if(editCourse.length == 0 ){
        editCoursePrompt("Valid course is required", "editCourse-error", "red");
        return false;
    }
    if(!editCourse.match(/^[a-zA-Z ]{2,30}$/)) {
        editCoursePrompt("Please enter a valid course", "editCourse-error", "red");
        return false
    }
    editCoursePrompt("Course is valid", "editCourse-error", "green");
    return true;
}
function editCoursePrompt(errorMessage, messageLocation, color) {
    document.getElementById(messageLocation).innerHTML = errorMessage;
    document.getElementById(messageLocation).style.color = color;
}


function gradeValidation() {
    var grade = $("#studentGrade").val();
    if (grade.length == 0) {
        gradePrompt("Please enter a valid grade", "grade-error", "red")
        return false
    }
    if(!grade.match(/^100$|^\d{0,2}(\.\d{1,2})? *%?$/)) {
        gradePrompt("Please enter a valid grade", "grade-error", "red");
        return false
    }
    gradePrompt("Grade is valid", "grade-error", "green");
    return true;
}

function gradePrompt(gradeMessage, messageLocation, color) {
    document.getElementById(messageLocation).innerHTML = gradeMessage;
    document.getElementById(messageLocation).style.color = color;
}


function editGradeValidation() {
    var editGrade = $("#editStudentGrade").val();
    if (editGrade.length == 0) {
        editGradePrompt("Please enter a valid grade", "editGrade-error", "red")
        return false
    }
    if(!editGrade.match(/^100$|^\d{0,2}(\.\d{1,2})? *%?$/)) {
        editGradePrompt("Please enter a valid grade", "editGrade-error", "red");
        return false
    }
    editGradePrompt("Grade is valid", "editGrade-error", "green");
    return true;
}

function editGradePrompt(gradeMessage, messageLocation, color) {
    document.getElementById(messageLocation).innerHTML = gradeMessage;
    document.getElementById(messageLocation).style.color = color;
}


function getData() {
    var ajaxOptions = {
        // url: 'http://s-apis.learningfuze.com/sgt/get',
        url: "http://localhost:8888/student_grade_table/server/getstudents.php",
        method: 'post',
        dataType: 'json',
        // data: {
        //     api_key: 'AQ076PX9UZ'
        // }
    };
    $.ajax(ajaxOptions).then(function (response) {
        console.log('response:',response);
        student_array = response.data;
        updateStudentList()
    });
};

/***************************************************************************************************
 * addClickHandlerstoElements
 * @params {undefined}
 * @returns  {undefined}
 *
 */
function addClickHandlersToElements(){
    $('.btn.btn-success').click(handleAddClicked);
    $('.btn.btn-default').click(handleCancelClick);
    $('.btn btn-primary').click(handleGetData);
    // $('.saveEdit').click(editStudent)
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return:
 none
 */
function handleAddClicked(){
    console.log('hi');
    addStudent();
}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
    clearAddStudentFormInputs();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){
    console.log('hey');
    var obj =  {
        name:$('#studentName').val(),
        course:$('#course').val(),
        grade:$('#studentGrade').val()
    };

    var newStudentData = {
        url: 'http://localhost:8888/student_grade_table/server/createstudent.php',
        method: 'post',
        dataType: 'json',
        data: {
            api_key: 'AQ076PX9UZ',
            name:$('#studentName').val(),
            course:$('#course').val(),
            grade:$('#studentGrade').val()
        }
    };
    $.ajax(newStudentData).then(function (response) {
        console.log("check it yo",response);
        student_array.push(obj);
        obj.id = response.new_id;
        clearAddStudentFormInputs();
        updateStudentList();

    });

}
// $('input[name=contactEmail]').val(),
//     subject: $('input[name=subject]').val(),
//     message: $('textarea[name=message]').val(),


console.log('student Array:', student_array);

/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs() {
    $('#studentName').val("");
    //formrounded.val
    $('#course').val("");
    $('#studentGrade').val("");
    $('#editStudentName').val("")
    $('#editCourse').val("")
    $('#editStudentGrade').val("")
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(studentObj) {
    var studentId = studentObj.id;
    console.log("student id", studentId);

    var tr = $("<tr>");
    var name = $("<td>", {
        text: studentObj.name
    });
    var course = $('<td>', {
        text: studentObj.course
    });
    var grade = $('<td>', {
        text: studentObj.grade
    });
    var deleteButton = $('<button>', {
        type: 'button',
        text: 'delete',
        idNumber: studentObj.id,
        class: 'delete btn btn-danger',
        on: {
            click:  () => {
                removeStudent(studentId);
            }

        }
    });
    var editButton = $('<button>', {
        type: 'button',
        text: 'Edit',
        idNumber: studentObj.id,
        class: 'edit btn btn-primary',
        on: {
            click: () => {
                modal(studentObj.id);
            }
        }
    });



    tr.append(name,course,grade,deleteButton,editButton);
    $('#studentContent').append(tr);

}



/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(){
    $('.student-list tbody tr').remove();
    for ( var studentInfo = 0; studentInfo < student_array.length; studentInfo++) {
        var row =  $("<tr>");
        renderStudentOnDom(student_array[studentInfo]);


    }
    // for ( var apiData = 0; apiData < studentObj.data.length; apiData++) {
    //     renderStudentOnDom(studentObj.data[apiData]);
    // }

    calculateGradeAverage();


}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(){
    var totalGrade = 0;
    console.log(totalGrade);
    for (var i = 0; i < student_array.length; i++ ) {
        var integer = parseInt(student_array[i].grade);
        totalGrade += integer;
    }
    var average = totalGrade / student_array.length;
    var roundedAverage = average.toFixed(2);
    // $('.avgGrade').append(totalGrade);


    renderGradeAverage(roundedAverage);
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(number) {
    var grade = number;

    // console.log(number);
    $('.avgGrade').append(grade);
    console.log(number)
    console.log('this is the grade', grade)
}
function handleGetData() {
    getData();

}

// create a function that edits the students.
//create a modal to edit the user info
//


function removeStudent(studentId) {



    var deleteData = {
        url: 'http://localhost:8888/student_grade_table/server/deletestudent.php',
        method: 'post',
        dataType: 'json',
        data: {
            api_key: 'AQ076PX9UZ',
            student_id: studentId
        }

    };
    $.ajax(deleteData).then(function(response) {
        console.log('look here',studentId);
        if(response.success) {
            student_array.splice(studentId,1)
        }
        console.log("herrro",response);
        // updateStudentList();
        // getData()
        // renderStudentOnDom();
        deleteStudentFromDatabse()
    });
}

function deleteStudentFromDatabse() {
    var ajaxOptions = {
        // url: 'http://s-apis.learningfuze.com/sgt/get',
        url: "http://localhost:8888/student_grade_table/server/getstudents.php",
        method: 'post',
        dataType: 'json',
        data: {
            api_key: 'AQ076PX9UZ'
        }
    };
    $.ajax(ajaxOptions).then(function (response) {
        console.log('response:',response);
        student_array = response.data;
        updateStudentList()
    })
}

// function validation () {
//    console.log('testing');
//    console.log("yo i like kate");
//
//
//      var grade = document.getElementById("studentGrade").value;
//      var name = document.getElementById("studentName").value;
//      var course = document.getElementById("course").value;
//
//
//
//     if(isNaN(grade) || grade < 0 || grade > 100 || grade =="" ){
//         document.getElementById("demo").innerHTML = "enter a valid grade ";
//     }
//
//     if( name = "" || name.length < 2 ||  name.length > 100) {
//         document.getElementById("name-error").innerHTML= 'error';
//
//     }
//     if(course = "" || course.length < 2 || course.length > 10) {
//         document.getElementById("course-error").innerHTML= 'error'
//     }
//     return true;
//
//
//
// }




// function validateForm() {
//    debugger;
//    console.log('validation');
//     const tests = [
//         {
//
//             name: $('#studentName').val(),
//             pattern: /^[a-zA-Z0-9 ]{4,}$/,
//             message: 'subject can only be letters or spaces, and must be 4+ characters'
//
//         },
//         {
//
//             course: $('#course').val(),
//             pattern: /^[a-zA-Z0-9 ]{4,}$/,
//             message: 'subject can only be letters or spaces, and must be 4+ characters'
//
//         },
//         {
//
//             grade: $('#studentGrade').val(),
//             pattern: /^([1-9]?\d|100)$/,
//             message: 'subject can only be letters or spaces, and must be 4+ characters'
//
//         }
//
//
//     ];
//     if( tests.length === tests.filter( validateInputAndDisplayError).length){
//         console.log("it worked!");
//         // addStudent();
//     }
// }
//
// function validateInputAndDisplayError( incomingTests ){
//     console.log("testing 69");
//     const element = incomingTests.element, pattern = incomingTests.pattern, errorMessage = incomingTests.message;
//     const value = $( element ).val();
//     const result = pattern.test( value );
//     if( !result ){
//         $( element ).next().text( errorMessage );
//     } else {
//         $( element ).next().text('');
//     }
//     return result;
// }



function modal(ID) {

    console.log('modal');
    $(".editModal").css('display', 'block');
    // editStudent()
    $(".saveEdit").attr("ID", ID);



}
//
// function editStudent(){
//     console.log('edit modal');
//     var obj =  {
//         name:$('#studentName').val(),
//         course:$('#course').val(),
//         grade:$('#studentGrade').val()
//     };
//
//     var editStudentData = {
//         url: 'http://localhost:8888/student_grade_table/server/updatestudent.php',
//         method: 'post',
//         dataType: 'json',
//         data: {
//             api_key: 'AQ076PX9UZ',
//             name:$('#editStudentName').val(),
//             course:$('#editCourse').val(),
//             grade:$('#editStudentGrade').val()
//         }
//
//     };
//     $.ajax(editStudentData).then(function (response) {
//         console.log("edit student response",response);
//         // student_array.push(obj);
//         obj.id = response.new_id;
//         clearAddStudentFormInputs();
//         updateStudentList();
//
//     });
//
// }






