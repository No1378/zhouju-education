$(function () {
      // $.get("{:U('hotStudentNews')}",{id:2},function (data) {
  //   if(data.status){
  //     $('.aw_hot_student_mien').html(data.info);

  //     /*图片懒加载初始化--开始*/
  //     lazyImg('lazy-two');
  //     /*图片懒加载初始化--结束*/
  //   }
  // });
            var city_id;
            //选择城市
            init_select_city({
                aw_top_city_select_after: function(id) {
                    console.log(id);
                    city_id = id;
                }
            });
          //   $.get("/Home/Help/helpHotSchool", {
          //       section_id: 4,
          //       city_code: city_id
          //   }, function(data) {
          //       if(data.status) {
          //           $('.hot_school').html(data.info);
          //           $("img." + "lazy-two").lazyload({
										// 	placeholder: "../assets/img/logoBd2.svg",
										// 	effect: "fadeIn",
										// 	threshold:200,
										// 	event:'mouseover',
										// 	skip_invisible : false,
										// 	failurelimit : 10
										// });
          //          $("#timeLine").flexslider({
										// 	animation: "slide",
										// 	directionNav: true,
										// 	pauseOnAction: false,
										// 	slideshowSpeed: 3000,
										// 	smoothHeight:true,
										// 	controlNav:false,
										// 	directionNav:true,
										// 	prevText:'<span id="btnLeft">&lt;</span>',
										// 	nextText:'<span id="btnRight">&gt;</span>',
										// 	manualControlEvent:"hover",
										// 	after:function(slider){
										// 		$($("img.lazy-two")[slider.animatingTo + 1]).trigger('mouseover');
										// 	}
          //           });
          //       }
          //   });

            $("#timeLine").flexslider({
                animation: "slide",
                directionNav: true,
                pauseOnAction: false,
                slideshowSpeed: 3000,
                smoothHeight:true,
                controlNav:false,
                directionNav:true,
                prevText:'<span id="btnLeft">&lt;</span>',
                nextText:'<span id="btnRight">&gt;</span>',
                manualControlEvent:"hover",
                after:function(slider){
                  $($("img.lazy-two")[slider.animatingTo + 1]).trigger('mouseover');
                }
            });
            // $.get("/Home/Help/helpHotProduct", {
            //     city_id : 110000
            // }, function (data) {
            //     if (data.status) {
            //         $('.aw_hot_product').html(data.info);
            //         lazyImg("lazy-one");
            //     } else {
            //         $('.aw_hot_product').html(data.info);
            //         lazyImg("lazy-one");
            //     }
            // });

        lazyImg("lazy-one");


});