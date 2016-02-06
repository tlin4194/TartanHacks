// $(document).ready( function (){
//   $.get("/data",
//         function (res){
//           console.log(JSON.parse(res));
//         });
// });

function tiffany() {
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
}

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
        //$('#top-photo').attr('src', topImgLinks[0]);
    }, 'json');
}


$(document).ready( function (){
    // // get preliminary data
    for (var i = 1; i < 11; i++) {
        getTopRequest('coats', i);
        getBotRequest('jeans', i);
    }

    tiffany();

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
    $('.topSwipeContainer #no_pic').click( function (){
        if (!(topIndex >= topLinks.length)){
            $('#top-photo').attr('src', topLinks[topIndex].url);
            console.log(topLinks[topIndex].price);
            console.log(topLinks[topIndex].title);
            topIndex ++;
        }
    });

    $('.botSwipeContainer #no_pic').click( function (){
        if (!(botIndex >= botLinks.length)){
            $('#bot-photo').attr('src', botLinks[botIndex].url);
            botIndex ++;
        }
    });

    $('.topSwipeContainer #yes_pic').click( function (){
        selectedTop = topLinks[topIndex-1];
        $('.topSwipeContainer #yes_pic, .topSwipeContainer #no_pic')
            .addClass('hidden');
        $('.topSwipeContainer').animate({
            'width': '280px',
            'height': '180px',
            'margin-left': '-140px',
            'margin-top': '-360px'
        }, 600);

        $('.topSwipeContainer .squareContainer').animate({
            'width': '180px',
            'height': '180px',
            'margin-left': '50px'
        }, 600, function() {
            $('.topSwipeContainer #gradient').addClass('hidden');
            $('.botSwipeContainer').removeClass('hidden');
            $('.botSwipeContainer').fadeTo('slow', 1, function (){
                $('#bot-photo').attr('src', botLinks[0].url);
            });
        });

        $('.botSwipeContainer').css('margin-top', '-120px');
    });

    $('.botSwipeContainer #yes_pic').click( function (){
        if (!(botIndex >= botLinks.length)){
            $('#bot-photo').attr('src', botLinks[botIndex].url);
            botIndex ++;
        }
    });
});























