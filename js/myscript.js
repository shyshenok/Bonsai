$(document).ready(function() {
    $('button').on('click', sendMess);
    $('#email1').on('keyup', checkInputs);
    // $('iframe').each(function() {
    //     // apply the logic only to the current iframe only
    //     if (this.contentDocument == window.document) {
    //         // if the href of the iframe is not same as
    //         // the value of src attribute then reload it
    //         if (this.src != location.href) {
    //             this.src = this.src;
    //         }
    //     }
    // });


    $('input[type=radio]').change(function(event) {
        var tabId = $(this).attr('id'); 
        loadPages(tabId); 
    });

    loadPages($('input[name=tabs]:checked').attr('id')); 

});


function loadPages(typeName) {
    $.ajax({
        type: "GET",
        url: "http://lookaround.getsandbox.com/bonsais?type=" + typeName, 
        dataType: "json",
        success: function(data) {
            var tmpl = $.templates('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><div class="thumbnail"><div class="img-container" id="img-hover"><img src="{{:pictureUrl}}" alt="goods picture"><span class="quick-view">Quick view</span></div><div class="caption"><h3 class="goods-name">{{:name}}</h3><p class="price">{{:price}}$</p><select class="rating" bonsai-rating="{{:rating}}"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select><div class="btn-group" role="group" aria-label="..."><button type="button" class="btn btn-default add-cart"><i class="glyphicon glyphicon-shopping-cart"></i></button><button type="button" class="btn btn-default"><i class="glyphicon glyphicon-retweet"></i></button><button type="button" class="btn btn-default"><i class="glyphicon glyphicon-heart"></i></button></div></div></div></div></div>');

            $('#shop-body').empty();

            data.forEach(function(bonsai) {
                
                var bonsaiHtml = tmpl.render(bonsai);

                $('#shop-body').append(bonsaiHtml);
            });

            $(".rating").each(function() {
                var ratingElement = $(this);

                ratingElement.barrating({
                    theme: 'bootstrap-stars',
                    initialRating: $(this).attr('bonsai-rating')
                });
            });
        }
    })
}


function sendMess(e) {
    e.preventDefault();
    $('.ok-icon').css({
        'visibility': 'visible'
    });
    setTimeout(function() {
        $('.ok-icon').css({
            'visibility': 'hidden'
        });
    }, 3000);
}


function checkInputs() {
    var mail = $('#email1').val();
    mail = $.trim(mail);
    if (mail != '') {
        $('form button[type="submit"]').removeAttr('disabled');
    } else {
        $('form button[type="submit"]').attr('disabled', 'disabled');
    }
}

/**
 *
 * name
 * price
 * percent
 * pictureUrl
 * rating
 *
 */
