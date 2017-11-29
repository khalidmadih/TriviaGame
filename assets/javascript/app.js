$(document).ready(function() {

    //Declaring my global variables
    var timer = 35;
    var intervalId;
    var gcount = 0;
    var wcount = 0;
    var unanswered = 0;

    //function to run the countdown
    function run() {
        intervalId = setInterval(decrement, 1000);
        console.log(intervalId);
    }

    //function to decrement the countdown
    function decrement() {
        //  Decrease timer by one.
        timer--;

        //  Show the timer in the #show-timer tag.
        $("#timer").html(" " + timer + " seconds");

        //  Once timer hits one second
        if (timer === 1) {
            $("#timer").html(" " + timer + " second");
        }
        //  Once timer hits zero seconds
        else if (timer === 0) {
            //run the summary functions
            hide();
            rSummary();
            stop();
        }
    }

    //Hiding the questions on the page
    $(window).on("load", hide);

    //Adding a function to hide elements not needed 
    function hide() {
        $('.form-group').hide();
        $('#time').hide();
        $('#done').hide();
    }

    //Adding a function to hide elements not needed 
    function show() {
        $('.form-group').show();
        $('#time').show();
        $('#done').show();
    }


    //On click #start button: hide button, show questions and run counter
    $('#start').on('click', function() {
        $(this).hide();
        show();
        run();
    });

    //On click #done button: hide button, show summary and stop counter
    $('#done').on('click', function() {
        hide();
        rSummary();
        stop();
    });

    //Create the elements for the summary page
    function rSummary() {
        var alldone = $('<h2>').html('These are your results: <br><br>');
        var canswers = $('<p>').html('Correct answers: ' + gcount);
        var wanswers = $('<p>').html('Incorrect answers: ' + wcount);
        var cunanswered = $('<p>').html('Unanswered: ' + unanswered);
        //adding a play again button
        var pagain = $('<button type="button" class="btn btn-success btn-lg btn-block" id="pagain">');
        pagain.text('Play again?');
        var newDiv = $('<div class="col-lg-4 col-lg-offset-4 text-center" id="summary">');
        newDiv.append(alldone);
        newDiv.append(canswers);
        newDiv.append(wanswers);
        newDiv.append(cunanswered);
        newDiv.append(pagain);
        $('.row:nth(2)').append(newDiv);

        // Reload page if player cliques on pagain button
        $('#pagain').on('click', function() {
            location.reload();
        });
    }

    //function to clear the interval
    function stop() {
        clearInterval(intervalId);
    }

    //calculating answer scores when radio buttons change
    $('input[type=radio]').on("change", function() {
        gcount = $('input[value=goodanswer]:checked').length;
        wcount = $('input[value=wrong]:checked').length;
        qcount = $('.question').length;
        unanswered = (qcount - (gcount + wcount));
    });


});