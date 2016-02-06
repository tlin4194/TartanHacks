// $(document).ready( function (){
//   $.get("/data",
//         function (res){
//           console.log(JSON.parse(res));
//         });
// });

function pickClothes(gender) {
    // waiting on tiff
}

function start() {
    $('#first-logo').fadeTo(600, 0, function() {
        $('#first-logo').addClass('hidden');
    });

    // animate shit
    $('.swag-pic.woman').animate({"left": "19%"}, 600);
    $('#swag-pic-overlay-woman').animate({"left": "19%"}, 600);
    $('.swag-pic.man').animate({"right": "15.5%"}, 600);
    $('#swag-pic-overlay-man').animate({"right": "15.5%"}, 600);

    // bind pretty shit
    $('#swag-pic-overlay-man').hover(function (){
        $("#gender-select-btn-man").removeClass("hidden");
    }, function (){
        $("#gender-select-btn-man").addClass("hidden");
    });

    $('#swag-pic-overlay-woman').hover(function (){
        $("#gender-select-btn-woman").removeClass("hidden");
    }, function (){
        $("#gender-select-btn-woman").addClass("hidden");
    });

    $('#begin').attr('id', 'gender-select');

    // bind functional shit
    $("#gender-select-btn-woman").click(function (){
        pickClothes("woman");
    });
    $("#gender-select-btn-man").click(function (){
        pickClothes("man");
    });
}


$(document).ready( function (){
    $(window).resize(function (){
        $('#swag-pic-overlay-man, #swag-pic-overlay-woman')
            .css('width', $('.swag-pic').width())
            .css('height', $('.swag-pic').height());
    });
    $('#begin-btn').click(start);
    $('#swag-pic-overlay-man, #swag-pic-overlay-woman')
        .css('width', $('.swag-pic').width())
        .css('height', $('.swag-pic').height());
});