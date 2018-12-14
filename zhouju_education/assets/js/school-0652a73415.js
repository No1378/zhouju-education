$(function() {
	var active_field = $('.aw_school_dl').find('.active');
	if(active_field.length == 0) {
		$('.aw_province_all a').addClass('active');
	};
	
	var field = $('.aw_type').find('.active');
	if(field.length == 0) {
		$('.aw_type_all a').addClass('active');
	};

	var tag_field = $('.aw_tag').find('.active');
	if(tag_field.length == 0) {
		$('.aw_tag_all a').addClass('active');
	};

	var city_id;
	//选择城市
	init_select_city({
		aw_top_city_select_after: function(id) {
			city_id = id;
             console.log(city_id);
		}
	});

// 	$.get("data/helpHotSchool.json", {
//         section_id: 4,
//         city_code: city_id
//     }, function(data) {
//         console.log(data);
//         if(data.status) {
//             $('.hot_school').html(data.info);
//             lazyImg("lazy-two");
//            $("#timeLine").flexslider({
// //                          itemWidth:290,
//                 animation: "slide",
//                 directionNav: true,
//                 pauseOnAction: false,
//                 slideshowSpeed: 3000,
//                 smoothHeight:true,
//                 controlNav:false,
//                 directionNav:true,
//                 prevText:'<span id="btnLeft">&lt;</span>',
//                 nextText:'<span id="btnRight">&gt;</span>'
//                 // manualControlEvent:"hover"
//             });
//         }
//     });


   //lazyImg("lazy-two");
   $("#timeLine").flexslider({
        //itemWidth:290,
        animation: "slide",
        directionNav: true,
        pauseOnAction: false,
        slideshowSpeed: 3000,
        smoothHeight:true,
        controlNav:false,
        directionNav:true,
        prevText:'<span id="btnLeft">&lt;</span>',
        nextText:'<span id="btnRight">&gt;</span>'
        // manualControlEvent:"hover"
    });
            
	$('.aw_page_input').on('keyup', function () {
        check_page_input();
    });

    $('.goPage').on('click', function () {
        var url_page = check_page_input();
        if (url_page) {
            window.location.href = url_page;
        }
    });

	function check_page_input() {
        var page_input_obj = $('.aw_page_input');
        var val            = page_input_obj.val();
        if (!val || val<=0) {
            page_input_obj.css('border', '#f00 solid 1px');
            return false;
        }
        if (!(/^[0-9]{0,}$/.test(val))) {
            page_input_obj.css('border', '#f00 solid 1px');
            return false;
        } else {
            var max = page_input_obj.attr('data-max');
            if ((val - 0) > (max - 0)) {
                page_input_obj.css('border', '#f00 solid 1px');
                return false;
            } else {
                page_input_obj.css('border', '1px solid #e5e5e5');
                var url = $('.goPage').attr('data-url');
                return url + '&page=' + val;
            }
        }

	}
	/*列表筛选条件--开始*/
	$("body").on("click",".load-more",function(){
		$(this).hide();
		$(this).siblings().show();
		$(this).parents("tr").find("p").css("height","auto");
	});
	$("body").on("click",".load-less",function(){
		$(this).hide();
		$(this).siblings().show();
		$(this).parents("tr").find("p").css("height","25px");
	});
	/*列表筛选条件--结束*/
	/*图片懒加载--开始*/
	lazyImg("lazy-one");
	/*图片懒加载--结束*/
});