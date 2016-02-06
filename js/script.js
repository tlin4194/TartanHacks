// $(document).ready( function (){
//   $.get("/data",
//         function (res){
//           console.log(JSON.parse(res));
//         });
// });


$(document).ready( function (){
    $('#begin-btn').hover(function (){
        $('#begin-btn .overlay').removeClass('hidden');
    }, function (){
        $('#begin-btn .overlay').addClass('hidden');
    });
})