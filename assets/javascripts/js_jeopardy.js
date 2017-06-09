(function(){

  // REQUIREMENTS:

  // Retrieve a question when the page loads and display it on the screen.
  // Each question should display the category, point value, and the question text.
  // You should also have a text box that people can type their answer into,
  // and a button they can click to submit their answer.
  // Keep track of the user's score. When the user clicks the 'guess' button,
  // you should check to see if they got the answer right:
  // If they did, increase their score by the value of the question (provided in the AJAX response).
  // If they didn't, no points are awarded or lost.
  // After users guess, load a new question.

  //jQuery equivelent to window.onload = function{}
  $(function(){

    // These initialize the screen and launch the first question
    // TODO: Move styles into a CSS file.
    $("#body").css("background-color","lightgray");
    $("#body").css("font-size", "34");
    $("#page-heading").html("Jeopardy Lite...the Game!");
    $("#guess").css("font-size", "20px");
    $("#guess").css("background-color", "black");
    $("#guess").css("color", "white");
    let category = " ";
    let question = " ";
    let answer = " ";
    let points = 0;
    let player_score = 0;
    let quest = nextQuestion();
    quest.done(function(data){
       populateDom(data);
    });

    // Retrieve a question when the page loads and display it on the screen.
    function nextQuestion() {
      return $.get( "http://jservice.io/api/random", function( data ) {} ); // end get
    } // end nextQuestion

    // Executes only when the ajax call is done
    // Each question should display the category, point value, and the question text.
    function populateDom(data) {
      $.each(data, function(index, value){
        question = value.question;
        points = value.value;
        answer = value.answer;
        category = value.category.title;
        $( "#category" ).html( "<p> Category: <b>" + value.category.title + "</b></p>" );
        $( "#question" ).html( "<p> Question: <b>" + value.question + "</b></p>" );
        $( "#points" ).html( "<p> For: <b>" + value.value + "</b> Points</p>" );
        // debug only!!!
        //$( "#hide" ).html( "<p> Answer: <b>" + value.answer + "</b></p>" );
        console.log("index: " + index + " Question: " + value.question + " Answer: " + value.answer + " Value: " + value.value + " Category: " + value.category.title);
      }) // end outter each
    }

    // Button event when they click to submit their answer
    // After users guess, load a new question.
    $("#guess").click(function(){
        console.log("Answer=" + answer.toLowerCase());
        if ( $( "#whatis" ).val().toLowerCase() == answer.toLowerCase() ) {
            player_score = player_score + points;
            $( "#result" ).html( "<p> Result: <b>That is correct!</b></p>" );
            $( "#yourscore" ).html( "<p> Your Score: <b>" + player_score + "</b></p>" );
        } else {
            $( "#result" ).html( "<p> Result: <b>Sorry, that is not correct</b></p>" );
        }
      // reinit textarea for next answer...
      $("#whatis").val("");
      // obtain the next question & wait for a button click...
      quest = nextQuestion();
      quest.done(function(data){
         populateDom(data);
      }); // end done()

    }) // end click event



  }) // end page load
})(); // end
