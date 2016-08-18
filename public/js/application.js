$(document).ready(function() {

    $('#pages').hide();
    $('[data-toggle="tooltip"]').tooltip();
    var template = $('#tmp').html();

    // Searching..
    $('#button1').click(function() {
    	$('#tbdy').empty();
       // var template = $('#tmp').html();
        var val = $('#text1').val();

        alert("Do You want to search for: " + val);

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/people?name=' + val,
            success: function(data) {
                console.log("success");

                $.each(data, function(i, item) {

                    $('#tbdy').append(Mustache.render(template, item));
                    console.log("appended");
                });
            },
            error: function() {
                console.log("Error finding the value.");
            }
        });
    });

    //Deleting...    	
    $('#tab01').delegate('.remove', 'click', function() {
        console.log("removed");
        var $tr = $(this).closest('tr');

        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/people/' + $(this).attr('data-id'),
            success: function() {
                $tr.fadeOut(1000, function() {
                    $(this).remove();
                });
            }
        });

    });
    //View All..	
  
    $('#viewbutton').on('click', function() {
        $('#tbdy').empty();
        alert("all?");

        //var tem = $('#tmp').html();

	     $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/people/?&_limit=20',
            success: function(data) {
                $.each(data, function(i, item) {
                    $('#tbdy').append(Mustache.render(template, item));
                    console.log("viewed");
                });
            }
        });

        $('#pages').show();
    });

    //Adding..
    $('#added').click(function() {

        var $name = $('#inputName').val();
        var $email = $('#inputEmail').val();
        var $phno = $('#inputphno').val();
        var $acctype = $('#inputaccounttype').val();

        if (nameFunction($name)) {
            if (emailFunction($email)) {
                if (phoneFunction($phno)) {
                    if (accountFunction($acctype)) {


                        var obj = {
                            name: $name,
                            email: $email,
                            phonenumber: $phno,
                            accountname: $acctype
                        };

                       // var tp = $('#tmp').html();

                        $.ajax({

                            type: 'POST',
                            url: 'http://localhost:8080/people/',
                            data: obj,
                            success: function(newdata) {

                                $('#tab01').append(Mustache.render(template, newdata));
                            },
                            error: function() {
                                alert("Error Saving the data!");
                            }
                        });

                    }
                }
            }
        } else {
            alert("Please enter valid details.")
        }


    });


    $('#tab01').delegate('.editorder', 'click', function() {
        //alert("Do you want to edit ?");
        var $tr = $(this).closest('tr');

        $tr.find('input.name').val($tr.find('span.name').html());
        $tr.find('input.email').val($tr.find('span.email').html());
        $tr.find('input.phonenumber').val($tr.find('span.phonenumber').html());
        $tr.find('input.accountname').val($tr.find('span.accountname').html());
        $tr.addClass('edit');
    });


    $('#tab01').delegate('.canceledit', 'click', function() {
        $(this).closest('tr').removeClass('edit');
    });


    // Updating
    $('#tab01').delegate('.saveedit', 'click', function() {
    	 var $tr = $(this).closest('tr');

    	var $n1 =  $tr.find('input.name').val();
        var $e1 =  $tr.find('input.email').val();
        var $p1 =  $tr.find('input.phonenumber').val();
        var $a1 =  $tr.find('select.accountname').val();

        if(nameFunction($n1)){
        	if(emailFunction($e1)){
        		if(phoneFunction($p1)){
        			if(accountFunction($a1)){

        					 var ogb = {
            name: $n1,
            email: $e1,
            phonenumber: $p1,
            accountname: $a1
        };
        //var tp = $('#tmp').html();

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/people/' + $tr.attr('data-id'),
            data: ogb,
            success: function(newd) {
                //$('#tab01').append(Mustache.render(tp,newd));
                $tr.find('span.name').html(ogb.name);
                $tr.find('span.email').html(ogb.email);
                $tr.find('span.phonenumber').html(ogb.phonenumber);
                $tr.find('span.accountname').html(ogb.accountname);
                $tr.removeClass('edit');

            },
            error: function() {
                alert("error updating");
            }
        });

        			}
        		}
        	}
        }
        else{

        	alert("Invalid Fields");

        }

       
       
    });


    //Infinite Scrolling
    var page = 3;
    $(window).scroll(function() {


        var $wrap = $('#wrap');
      //  var tt = $('#tmp').html();
        var contentHeight = wrap.offsetHeight;

        var yOffset = window.pageYOffset;

        var y = yOffset + window.innerHeight;


        if (y >= contentHeight) {

            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/people/?&_page=' + page,
                success: function(d) {
                    $.each(d, function(i, itm) {
                        $('#tbdy').append(Mustache.render(template, itm));
                        console.log("appended");

                    });
                    page = page + 1;
                    console.log(page);
                },
                error: function() {
                    console.log("error loading");
                }
            });
        }
    });




});

function nameFunction(str) {
    //var n = $('#inputName').val();
    if (/^[A-z ]+$/.test(str)) {
        return true;
    } else {
        alert("Please enter a valid name");
        return false;
    }
}

function emailFunction(er) {
    var e = er;
    console.log(e);
    //var e = $('#inputEmail').val();
    if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)) {

        return true;
    } else {
        alert("please enter a valid email");
        return false;
    }
}

function phoneFunction(p) {
    //var p = $('#inputphno').val();
    if (isNaN(p)||(p.length<10)) {
        alert("Enter a valid Phone Number");
        return false;
    } else
        return true;
}

function accountFunction(acc) {
    //var acc = $('#inputaccounttype').val();
    if (acc == "Please Choose") {
        alert("Please select valid Account Type");
        return false;
    } else {
        return true;
    }
}
