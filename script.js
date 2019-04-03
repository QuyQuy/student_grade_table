/* information about jsdocs:
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
*
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);


function editStudent() {
    // 'idNumber'
    var student_id = $(".saveEdit").attr("ID");
    // var student_id = $(this).attr("idNumber");

    var nameValue = $('#editStudentName').val();
    var courseValue = $('#editCourse').val();
    var gradeValue = $('#editStudentGrade').val();

    var editAjax = {
        url: "http://localhost:8888/student_grade_table/server/updatestudent.php",
        method: "POST",
        data: {

            student_id: student_id,
            name: nameValue,
            course: courseValue,
            grade: gradeValue
        },
        success: function (response) {
            console.log("PLeaaaaaaase", response);
            getData();
            closeModal();
        },
        error: function (error) {
            console.log('error', error)
        }
    }
    $.ajax(editAjax)
}



function closeModal(){
    $('#modal').css("display","none");
}
function showEditModal(studentObj){
    console.log("heypooooooooooo")
    var id = $(this).attr('idNumber')
    $('#editStudentName').val(studentObj.name);
    $('#editCourse').val(studentObj.course);
    $('#editStudentGrade').val(studentObj.grade);
    $('#modal').modal();
}





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




function getData() {
    console.log("here is my get data")
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
    // $('.btn.btn-success').click(handleAddClicked);
    $('.btn.btn-default').click(handleCancelClick);
    $('.btn btn-primary').click(handleGetData);
    $('#addButton').click(validateForm);
    $('.saveEdit').click(editValidateForm);
    // $('.saveEdit').click(editStudent)
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return:
 none
 */
// function handleAddClicked(){
//     console.log('hi');
//     addStudent();
// }
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
        // on: {
        //     click: () => {
        //         modal(studentObj.id);
        //     }
        //
        // }
        click: function(){
            showEditModal(studentObj);
            modal(studentObj.id);
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


    calculateGradeAverage();
    renderGradeAverage()


}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(){
    var totalGrade =  0;
    console.log(totalGrade);
    for (var i = 0; i < student_array.length; i++ ) {
        var integer = parseInt(student_array[i].grade);
        totalGrade += integer;
    }
    var average = totalGrade / student_array.length;
    var roundedAverage = average.toFixed(2);
    // $('.avgGrade').append(totalGrade);


     return roundedAverage
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage() {


    // console.log(number);
    // $('.avgGrade').append(grade);
    $('.avgGrade').text(calculateGradeAverage);

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



function editValidateForm() {
    const tests = [
        {

            element: $('#editStudentName'),
            pattern: /^([A-Z][a-z]+)\s([A-Z][a-zA-Z-]+)$/,
            message:  " Please capitalize your first and last name"

        },
        {

            element: $('#editCourse'),
            pattern: /^[a-zA-Z ]{2,30}$/,
            message: "Please enter a valid course"

        },
        {

            element: $('#editStudentGrade'),
            pattern: /^100(\.[0]{1,2})?|([0-9]|[1-9][0-9])(\.[0-9]{1,2})?$/,
            message: "Please enter a valid grade"

        }


    ];
    if( tests.length === tests.filter( editValidateInputAndDisplayError).length){
        console.log("it worked!");
        editStudent();
        // saveEditStudent()
    }
}
function editValidateInputAndDisplayError( incomingTests ){
    console.log("testing 69");
    const element = incomingTests.element, pattern = incomingTests.pattern, errorMessage = incomingTests.message;
    const value = $( element ).val();
    const result = pattern.test( value );
    if( !result ){
        $( element ).next().text( errorMessage );
    } else {
        $( element ).next().text('');
    }
    return result;
}


function validateForm() {

   console.log('validation');
    const tests = [
        {

            element: $('#studentName'),
            pattern: /^([A-Z][a-z]+)\s([A-Z][a-zA-Z-]+)$/,
            message:  " Please capitalize your first and last name"

        },
        {

            element: $('#course'),
            pattern: /^[a-zA-Z ]{2,30}$/,
            message: "Please enter a valid course"

        },
        {

            element: $('#studentGrade'),
            pattern: /^100(\.[0]{1,2})?|([0-9]|[1-9][0-9])(\.[0-9]{1,2})?$/,
            message: "Please enter a valid grade"

        }


    ];
    if( tests.length === tests.filter( validateInputAndDisplayError).length){
        console.log("it worked!");
        addStudent();
    }
}

function validateInputAndDisplayError( incomingTests ){
    console.log("testing 69");
    const element = incomingTests.element, pattern = incomingTests.pattern, errorMessage = incomingTests.message;
    const value = $( element ).val();
    const result = pattern.test( value );
    if( !result ){
        $( element ).next().text( errorMessage );
    } else {
        $( element ).next().text('');
    }
    return result;
}



function modal(ID) {

    console.log('modal');
    $(".editModal").css('display', 'block');
    // editStudent()
    $(".saveEdit").attr("ID", ID);



}







