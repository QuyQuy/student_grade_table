/* information about jsdocs:
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
*
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

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
}

function getData() {
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
    $('.btn btn-primary').click(handleGetData)
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


console.log('student Array:', student_array);

/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs() {
    $('#studentName').val("");
    //formrounded.val
    $('#course').val("");
    $('#studentGrade').val("");
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



    tr.append(name,course,grade,deleteButton);
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
    var totalGrade = null;
    console.log(totalGrade);
    for (var i = 0; i < student_array.length; i++ ) {
        var integer = parseInt(student_array[i].grade);
        totalGrade += integer;
    }
    var average = totalGrade / student_array.length;
    // $('.avgGrade').append(totalGrade);


    renderGradeAverage(average);
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

    // var row =$(event.delegateTarget);
    // var id = row.attr('studentId');
    //
    // $.ajax({
    //     url: 'http://localhost:8888/student_grade_table/server/deletestudent.php',
    //     method: 'post',
    //     dataType: 'json',
    //     data: {student_id: id },
    //     success: result => {
    //         if (result.success) {
    //             student_array.splice(studentId, 1);
    //             updateStudentList(student_array);
    //         }
    //         return result.success;
    //     }
    // })


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
        updateStudentList();
    });
}

function validation () {
   console.log('testing');;

     var grade = document.getElementById("studentGrade").value;
     var name = document.getElementById("studentName").value;
     var course = document.getElementById("course").value;



    if(isNaN(grade) || grade < 0 || grade > 100 || grade =="" ){
        document.getElementById("demo").innerHTML = "enter a valid grade "
    }

    if( name = "" || name.length < 2 ||  name.length > 100) {
        document.getElementById("name-error").innerHTML= 'error'

    }
    if(course = "" || course.length < 2 || course.length > 10) {
        document.getElementById("course-error").innerHTML= 'error'
    }
    return true;


}




