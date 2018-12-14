$(function() {
	var $activeMasker = $('.active-masker');
	var d1 = $.Deferred();
	if(is_first_index){
		$.get("/base/findCityList", {}, function(data) {
			if(data.status) {
				$('.area-list').html(data.info);
				$('.area-tap span').removeClass('active');
				$('.aw_city_title_' + data.url).addClass('active');
			}
		});
		$('.aw_index_address').removeClass('aw_hide');
		
	}
	else{
		if(!$.getSession('isMasker')){
			var timer = setTimeout(function(){
				$.setSession('isMasker',1);
				$activeMasker.show();
				clearTimeout(timer);
			},1000);
		}
	}
	$('.guess button').on('click', function () {
		$('.aw_index_address').addClass('aw_hide');
		$.setSession('isMasker',1);
		var timer = setTimeout(function(){
			$activeMasker.show();
			clearTimeout(timer);
		},3000);
	});
	$("body").on('click',".select-area-box table i",function(){
		$.when( d1).done(function () {
	    	$.setSession('isMasker',1);
			var timer = setTimeout(function(){
				$activeMasker.show();
				clearTimeout(timer);
			},3000);
		});
	});
	/*城市切换 重新请求数据--开始*/
	var city_id;
	//选择城市ssss
	init_select_city({
		aw_top_city_select_before:function () {
			$('.aw_make_spinner').removeClass('aw_hide');
		},
		aw_top_city_select_after: function(id) {
			city_id = id;
			section_city(city_id);
		},
		aw_first_city_select_after:function () {
			$('.aw_index_address').addClass('aw_hide');
			$('.aw_make_spinner').addClass('aw_hide');
			d1.resolve();
		}
	});


	section_city(cityId);

	function section_city(city_id){

		/*院校轮播图初始化--开始*/
		$('#flexslider2').flexslider({
			itemWidth:372,
			controlNav:false,
			itemMargin:12,
			animation: "slide",
			animationLoop:true,
			directionNav: true,
			pauseOnAction: false,
			slideshowSpeed:3000
		});
		/*院校轮播图初始化--结束*/

	}
	
	/*城市切换 重新请求数据--结束*/
	/*轮播图banner初始化 开始*/
	$('#flexslider1').flexslider({
		animation: "slide",
		directionNav: true,
		pauseOnAction: false,
		slideshowSpeed: 7000,
		smoothHeight:true,
		manualControlEvent:"hover"
	});
	/*轮播图banner初始化--结束*/
	/*图片懒加载--开始*/
	lazyImg('lazy-one');
	/*图片懒加载--结束*/

	var $schoolListEle = $(".school-select");
	var $leftNavEle = $(".leftnav");
	/*二级菜单--鼠标悬停--开始*/
	$('body').on('mousemove', '.over-class', function(event) {
		$schoolListEle.hide();
		var num = $(this).attr("data-num");
		$leftNavEle.addClass('show-sel-list');
		$($schoolListEle[num]).show();
	})

	/*二级菜单--鼠标悬停--结束*/

	/*二级菜单--鼠标离开 --开始*/
	$('body').on('mouseleave', '.leftnav', function(e) {
		$leftNavEle.removeClass('show-sel-list');
		$schoolListEle.hide();

	})
	/*二级菜单--鼠标离开--结束*/

	$('body').on('mouseenter', '.leave-class', function(e) {
		$leftNavEle.removeClass('show-sel-list');
		$schoolListEle.hide();

	})
	var $videoBox = $(".video-img");
	/*视频播放切换--开始*/
	$('body').on('click','.video-list li',function(){
		var link = $(this).attr('data-type');
		var str = '';
		str+= '<video preload="meta" class="videoCon" src="'+ link +'" controls style="height: 100%;width: 100%;">';
		str+= '<embed class="videoCon"  autostart=false  src="'+ link +'" allowFullScreen="true" quality="high" wmode="transparent" width="498" height="290" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
		str+='</video>';
		$videoBox.empty();
		$videoBox.append(str);
		
	})
	/*视频播放切换--结束*/
	$("body").on('click','.closeActive',function(){
		$(this).parents('.avtiveParent').slideUp();
	});
})