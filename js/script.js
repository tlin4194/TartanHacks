// $(document).ready( function (){
//   $.get("/data",
//         function (res){
//           console.log(JSON.parse(res));
//         });
// });

function pickClothes(gender) {
    // waiting on tiff
    console.log(gender);
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

function getTopRequest(keywords, page) {
    var url = '/data?Keywords=' + keywords + "&ItemPage=" + page.toString();
    $.get(url, function (res){
        console.log(res);
        dataFromRequest = res;
        allTopData.push(dataFromRequest);
        for (item of dataFromRequest.Items.Item) {
            var trimData = {
                url: item.LargeImage.URL,
                title: item.ItemAttributes.Title,
                price: item.OfferSummary.LowestNewPrice.FormattedPrice
            };
            topLinks.push(trimData);
        }

        // set image
        $('#top-photo').attr('src', topLinks[0].url);
    }, 'json');
}

function getBotRequest(keywords, page) {
    var url = '/data?Keywords=' + keywords + "&ItemPage=" + page.toString();
    $.get(url, function (res){
        console.log(res);
        dataFromRequest = res;
        allBotData.push(dataFromRequest);
        for (item of dataFromRequest.Items.Item) {
            var trimData = {
                url: item.LargeImage.URL,
                title: item.ItemAttributes.Title,
                price: item.OfferSummary.LowestNewPrice.FormattedPrice
            };
            botLinks.push(trimData);
        }

        // set image
        //$('#top-photo').attr('src', topLinks[0]);
    }, 'json');
}


$(document).ready( function (){
    // // get preliminary data
    getTopRequest('coats', 1);
    getBotRequest('jeans', 1);

    // bind UI elements
    $(window).resize(function (){
        $('#swag-pic-overlay-man, #swag-pic-overlay-woman')
            .css('width', $('.swag-pic').width())
            .css('height', $('.swag-pic').height());
    });
    $('#begin-btn').click(start);
    $('#swag-pic-overlay-man, #swag-pic-overlay-woman')
        .css('width', $('.swag-pic').width())
        .css('height', $('.swag-pic').height());

    // bind checkmarks 
    // bind checkmarks 
    $('#no_pic').click( function (){
        if (!(topIndex >= topLinks.length)){
            $('#top-photo').attr('src', topLinks[topIndex].url);
            topIndex ++;
        }
        $("#add_screen").addClass("hidden");
        console.log("hi")
    });

    $('#yes_pic').click( function (){
        $("#add_screen").removeClass("hidden");
    });

    $('#tinder').keydown(function(e) {
    switch(e.which) {
        case 37: // left
            if (!(topIndex >= topLinks.length)){
            $('#top-photo').attr('src', topLinks[topIndex].url);
            topIndex ++;
            }
            console.log("hi")
        break;

        case 39: // right
            if (!(topIndex >= topLinks.length)){
            $('#top-photo').attr('src', topLinks[topIndex].url);
            topIndex ++;
            }
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
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























