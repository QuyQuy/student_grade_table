
$(document).ready(initializeApp);


function editStudent() {
    debugger;
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
        error: function (errorResponse) {
            console.log('error', error)
            $('.errorModal').css('display','block')
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





var student_array = [];






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
    }).fail(function(errorResponse) {

    })
};

function addClickHandlersToElements(){
    // $('.btn.btn-success').click(handleAddClicked);
    $('.btn.btn-default').click(handleCancelClick);
    $('.btn btn-primary').click(handleGetData);
    $('#addButton').click(validateForm);
    $('.saveEdit').click(editValidateForm);
    // $('.deleteTest').click(removeStudent(studentId))
    // $('.saveEdit').click(editStudent)
}


function handleCancelClick(){
    clearAddStudentFormInputs();
    clearErros()
}

function clearErros(){
    $('.error').empty()
}

function addStudent(){
    debugger;
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

        // error: function (errorResponse) {
        //     console.log('error', error)
        //     $('.errorModal').css('display','block')
        // }

    }).fail(function() {
        $('.errorModal').css('display','block')
    })

}
// $('input[name=contactEmail]').val(),
//     subject: $('input[name=subject]').val(),
//     message: $('textarea[name=message]').val(),


console.log('student Array:', student_array);

function clearAddStudentFormInputs() {
    $('#studentName').val("");
    //formrounded.val
    $('#course').val("");
    $('#studentGrade').val("");
    // $('#editStudentName').val("")
    // $('#editCourse').val("")
    // $('#editStudentGrade').val("")
}

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
        text: 'Delete',
        idNumber: studentObj.id,
        class: 'delete btn btn-danger',
        // click: function(){
        //     deleteModal(studentId)
        // }
        on: {
            click: function() {
                deleteModal(studentObj)
                // deleteFunction(studentObj.id);
            }
            // click:  () => {
            //     removeStudent(studentId);
            // }

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


function updateStudentList(){
    $('.student-list tbody tr').remove();
    for ( var studentInfo = 0; studentInfo < student_array.length; studentInfo++) {
        var row =  $("<tr>");
        renderStudentOnDom(student_array[studentInfo]);


    }


    calculateGradeAverage();
    renderGradeAverage()


}
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
function renderGradeAverage() {
    if(student_array.length > 0) {
        $('.avgGrade').text(calculateGradeAverage);
    } else {
        $('.avgGrade').text(0);
    }



}
function handleGetData() {
    getData();

}

// create a function that edits the students.
//create a modal to edit the user info
//


function removeStudent(studentId) {
    //
    // var studentId = $('.deleteTest').data("ID");
    // debugger;


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
        closeConfirmModal()
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

function deleteModal(studentObj) {
    $('.deleteConfirmation').css('display','block');
    var removeId = studentObj.id;
    // var id = $(this).attr('idNumber')
    var footerContainer  = $('<div>', {
        class: 'text-center'
    });

    var confirmButton = $('<button>', {
        class: 'btn btn-success text-center',
        text: 'Confirm',
        'studentId': studentObj.id,
        on: {
            click: () => removeStudent(removeId)
        }
    })
    var cancelConfirm = $('<button>', {
        class: "btn btn-danger",
        text: 'Cancel',
        on: {
            click: () => closeConfirmModal()
        }
    })


    footerContainer.append(confirmButton,cancelConfirm)
    $('.modal-footer').append(footerContainer);

    // removeStudent(studentId);

}
function closeConfirmModal() {
    $('.modal-footer').empty()
    $('.deleteConfirmation').modal().hide()
}

// function deleteFunction() {
//     debugger;
//
//     var yup = $('.deleteTest').attr("ID");
//     var nameValue = $('#studentName').val();
//     var courseValue = $('#course').val();
//     var gradeValue = $('#studentGrade').val();
//
//
//     console.log("Right here");
//     // removeStudent(studentId);
//     removeStudent(yup);
// }







