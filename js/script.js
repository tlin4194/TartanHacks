// $(document).ready( function (){
//   $.get("/data",
//         function (res){
//           console.log(JSON.parse(res));
//         });
// });

function reload() {
    location.reload();
}

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

function linkContainers() {
    $('#gender-select-btn-man, #gender-select-btn-woman').click( function (){
        if (this.id.includes('woman')) searchIndex = 'FashionWomen';
        else searchIndex = 'FashionMen';
        $('#gender-select').fadeTo('slow', 0, function (){
            $('#gender-select').addClass('hidden');
        });
        $('#clothes-select').removeClass('hidden');
        $('#clothes-select').fadeTo('slow', 1);
    });
}

function getData(i) {
    getTopRequest(firstKeyword, searchIndex, i);
    getBotRequest(secondKeyword, searchIndex, i);
}

function clothesSelect() {
    $('.category').click( function (){
        if (clickCount === 0) {
            firstKeyword = $(this).text();
            clickCount ++;
        }
        else if (clickCount === 1) {
            secondKeyword = $(this).text();
            clickCount ++;

            $('#clothes-select').fadeTo('slow', 0, function (){
                $('#clothes-select').addClass('hidden');
                getData(1);
            });

            $('#tinder').removeClass('hidden');
            $('#tinder').fadeTo('slow', 1);
        }
    });
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
    clothesSelect();
}

function getTopRequest(keywords, searchIndex, page) {
    var url = '/data?Keywords=' + keywords + '&SearchIndex=' + searchIndex + 
              '&ItemPage=' + page.toString();
    $.get(url, function (res){
        console.log(res);
        dataFromRequest = res;
        allTopData.push(dataFromRequest);
        for (item of dataFromRequest.Items.Item) {
            var trimData;
            try {
                trimData = {
                    url: item.LargeImage.URL,
                    title: item.ItemAttributes.Title,
                    price: item.OfferSummary.LowestNewPrice.FormattedPrice,
                    details: item.DetailPageURL
                };
            } catch(e) {
                setTimeout( function(){
                    trimData = {
                        url: item.LargeImage.URL,
                        title: item.ItemAttributes.Title,
                        price: item.OfferSummary.LowestNewPrice.FormattedPrice,
                        details: item.DetailPageURL
                    };
                }, 1000);
            }
            topLinks.push(trimData);
        }

        requestCompleted = true;
        // set image
        $('#top-photo').attr('src', topLinks[0].url);
        $(".topSwipeContainer #product_name").text(topLinks[0].title);
        $(".topSwipeContainer #price").text(topLinks[0].price);
    }, 'json');
}

function getBotRequest(keywords, searchIndex, page) {
    var url = '/data?Keywords=' + keywords + '&SearchIndex=' + searchIndex + 
              '&ItemPage=' + page.toString();
    $.get(url, function (res){
        console.log(res);
        dataFromRequest = res;
        allBotData.push(dataFromRequest);
        for (item of dataFromRequest.Items.Item) {
            var trimData;
            try {
                trimData = {
                    url: item.LargeImage.URL,
                    title: item.ItemAttributes.Title,
                    price: item.OfferSummary.LowestNewPrice.FormattedPrice,
                    details: item.DetailPageURL
                };
            } catch(e) {
                setTimeout( function(){
                    trimData = {
                        url: item.LargeImage.URL,
                        title: item.ItemAttributes.Title,
                        price: item.OfferSummary.LowestNewPrice.FormattedPrice,
                        details: item.DetailPageURL
                    };
                }, 1000);
            }
            botLinks.push(trimData);
        }

        // set image
        //$('#top-photo').attr('src', topImgLinks[0]);
    }, 'json');
}

function bindCheckBoxes() {
    // bind checkmarks 
    $('.topSwipeContainer #no_pic').click( function (){
        if (!(topIndex >= topLinks.length) && requestCompleted){
            $('#top-photo').attr('src', topLinks[topIndex].url);
            $(".topSwipeContainer #product_name").text(
                topLinks[topIndex].title.substring(0, 35)
            );
            $(".topSwipeContainer #price").text(topLinks[topIndex].price);
            topIndex ++;
        }
        $(".topSwipeContainer #add_screen").addClass("hidden");
        $('#gradient').removeClass('hidden');
    });

    $('.topSwipeContainer #yes_pic').click( function (){
        console.log('wat');
        $(".topSwipeContainer #add_screen").removeClass("hidden");
        $('.topSwipeContainer #gradient').addClass('hidden');
    });

    $(".topSwipeContainer #add_screen").click( function (){
        console.log("clicked");
        $(".topSwipeContainer #add_screen").addClass('hidden');
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
                $(".botSwipeContainer #product_name").text(
                    botLinks[0].title.substring(0, 35)
                );
                $(".botSwipeContainer #price").text(botLinks[0].price);
            });
        });
        $('.botSwipeContainer').css('margin-top', '-120px');
    });

    $('.botSwipeContainer #no_pic').click( function (){
        if (!(botIndex >= botLinks.length) && requestCompleted){
            $('#bot-photo').attr('src', botLinks[botIndex].url);
            $(".botSwipeContainer #product_name").text(
                botLinks[botIndex].title.substring(0, 35)
            );
            $(".botSwipeContainer #price").text(botLinks[botIndex].price);
            botIndex ++;
        }

        $(".botSwipeContainer #add_screen").addClass("hidden");
        $('#gradient').removeClass('hidden');
    });

    $('.botSwipeContainer #yes_pic').click( function (){
        $("#gradient").addClass("hidden");
        $(".botSwipeContainer #add_screen").removeClass("hidden");
        console.log(topLinks[topIndex-1].details);
        document.getElementById("buy-top-link").href = 
            topLinks[topIndex-1].details;

        document.getElementById("buy-bot-link").href =
            botLinks[botIndex-1].details;
    });
}

function openLink(url) {
    window.open(url, '_blank');
}


$(document).ready( function (){
    // // get preliminary data
    // for (var i = 1; i < 11; i++) {
    //     getTopRequest('coats', i);
    //     getBotRequest('jeans', i);
    // }

    tiffany();
    linkContainers();

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
    bindCheckBoxes();

    // $('#home').click( function (){
    //     console.log("home");
    //     $('.container').addClass('hidden');
    //     $('#gender-select').removeClass('hidden');
    //     $('#gender-select').css('opacity', '1');
    // });

});























