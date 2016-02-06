$(document).ready( function (){

  // $.get("/data", function (res){
  //   console.log(JSON.parse(res));

  // });
  $( "#right" ).click(function() {
    $( "#block" ).animate({ "left": "+=50px" }, "slow");
  });
  
  $( "#left" ).click(function(){
    $( "#block" ).animate({ "left": "-=50px" }, "slow" );
  });
  $(".clothing").click(function(){
    $("#clothes").animate({"left":"30%"},"slow");
    $(".clothing").css("text-align", "right");
    if($(".clothing").hasClass("active")||!($(".sub").hasClass("hidden")) ){
        $(".clothing").removeClass("active");
        $(".sub").addClass("hidden");
    }
    $(this).addClass("active");
    $(this).children().removeClass("hidden");
  });



});


