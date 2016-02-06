$(document).ready( function (){
  $.get("/data",
        function (res){
          console.log(res);
        });
});