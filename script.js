
$(document).ready(initializeApp);


function editStudent() {
    debugger
    // 'idNumber'
    var student_id = $(".saveEdit").attr("ID");

    var nameValue = $('#editStudentName').val();
    var courseValue = $('#editCourse').val();
    var gradeValue = $('#editStudentGrade').val();

    var editAjax = {
        url: "server/updatestudent.php",
        method: "POST",
        data: {

            student_id: student_id,
            name: nameValue,
            course: courseValue,
            grade: gradeValue
        }
    }
    $.ajax(editAjax).then(function () {
        getData();
        closeModal();
    }).fail(function() {
        $('.error-modal').css('display','block')

    })

}



function closeModal(){
    $('#modal').css("display","none");
}
function showEditModal(studentObj){
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

}




function getData() {
    var ajaxOptions = {
        url: "server/getstudents.php",
        method: 'post',
        dataType: 'json',
    };
    $.ajax(ajaxOptions).then(function (response) {
        student_array = response.data;
        updateStudentList()
    }).fail(function(errorResponse) {

    })


    
};

function emptyData(){
    if(student_array > -1) {
        $('.emptyData').css('display', 'block')
    } else {
        $('.emptyData').css('display', 'none')
    }
}

function addClickHandlersToElements(){
    $('.btn.btn-default').click(handleCancelClick);
    $('.btn btn-primary').click(handleGetData);
    $('#addButton').click(validateForm);
    $('.saveEdit').click(editValidateForm);
}


function handleCancelClick(){
    clearAddStudentFormInputs();
    clearErros()
}

function clearErros(){
    $('.error').empty()
}

function addStudent(){
    var obj =  {
        name:$('#studentName').val(),
        course:$('#course').val(),
        grade:$('#studentGrade').val()
    };

    var newStudentData = {
        url: 'server/createstudent.php',
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
        student_array.push(obj);
        obj.id = response.new_id;
        clearAddStudentFormInputs();
        updateStudentList();


    }).fail(function(errorResponse) {
        if(errorResponse.status === 500) {

            $("#error-text").text('error right now')
        }

        $('.error-modal').css('display', 'block')
    })



}


function clearAddStudentFormInputs() {
    $('#studentName').val("");
    $('#course').val("");
    $('#studentGrade').val("");

}

function renderStudentOnDom(studentObj) {
    var studentId = studentObj.id;

    var tr = $("<tr>")
    var name = $("<td>", {
        text: studentObj.name,
    });
    var course = $('<td>', {
        text: studentObj.course,
        class: ' course-info'
    });
    var grade = $('<span>', {
        text: studentObj.grade,
        id: 'grade-info '
    });
    var tableContainer = $('<td>', {

    });

    tableContainer.append(grade);
    tr.append(name,course,grade, tableContainer );


    var deleteContainer = $('<td>', {
        class: 'col-xs-3',
        id: 'deleteContainer'
    })
    var deleteButton = $('<button>', {
        type: 'button',
        text: 'Delete',
        idNumber: studentObj.id,
        id: 'deleteButton',
        class: 'delete btn btn-danger',
        on: {
            click: function() {
                deleteModal(studentObj)
                // deleteFunction(studentObj.id);
            }

        }
    });
    var editButton = $('<button>', {
        type: 'button',
        text: 'Edit',
        idNumber: studentObj.id,
        class: 'edit btn btn-primary',
        click: function(){
            showEditModal(studentObj);
            modal(studentObj.id);
        }
    });
    tableContainer.append(grade);
    deleteContainer.append(deleteButton,editButton);
    tr.append(deleteContainer);
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
    emptyData()


}
function calculateGradeAverage(){
    var totalGrade =  0;
    for (var i = 0; i < student_array.length; i++ ) {
        var integer = parseInt(student_array[i].grade);
        totalGrade += integer;
    }
    var average = totalGrade / student_array.length;
        var roundedAverage = average.toFixed(2);




     return roundedAverage
}
function renderGradeAverage() {
    if(student_array.length > 0) {
        $('.avgGrade').text(calculateGradeAverage);
    } else {
        $('.avgGrade').text('-');
    }



}
function handleGetData() {
    getData();

}



function removeStudent(studentId) {

    var deleteData = {
        url: 'server/deletestudent.php',
        method: 'post',
        dataType: 'json',
        data: {
            api_key: 'AQ076PX9UZ',
            student_id: studentId
        }

    };
    $.ajax(deleteData).then(function(response) {
        if(response.success) {
            student_array.splice(studentId,1)
        }
        deleteStudentFromDatabse()
        closeConfirmModal()
    }).fail(function(errorResponse) {
        if(errorResponse.status === 500) {

            $("#error-text").text('error right now')
        }

        $('.error-modal').css('display', 'block')
    })
}

function deleteStudentFromDatabse() {
    var ajaxOptions = {
        url: "server/getstudents.php",
        method: 'post',
        dataType: 'json',
        data: {
            api_key: 'AQ076PX9UZ'
        }
    };
    $.ajax(ajaxOptions).then(function (response) {
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
        editStudent();
        // saveEditStudent()
    }
}
function editValidateInputAndDisplayError( incomingTests ){
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
        addStudent();
    }
}

function validateInputAndDisplayError( incomingTests ){
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

    $(".editModal").css('display', 'block');
    $(".saveEdit").attr("ID", ID);




}

function closeEditModal() {
    $(".editModal").css('display', 'none');
}

function deleteModal(studentObj) {
    $('.deleteConfirmation').css('display','block');
    var removeId = studentObj.id;
    var name = studentObj.name;
    var course = studentObj.course;
    var grade =studentObj.grade;

    $('#deleteName').val(name);
    $('#deleteCourse').val(course);
    $('#deleteStudentGrade').val(grade);
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


}
function closeConfirmModal() {
    $('.modal-footer').empty()
    $('.deleteConfirmation').modal().hide()
}




function closeErrorModal() {
    $('.error-modal').css('display', 'none')
    closeConfirmModal();
    closeEditModal();

}




