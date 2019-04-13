//$sliderCon:DOM对象 需要换背景时可用
//$sliderLi:DOM对象 选择轮播图img的父元素li 例：<ul><li><img/></li></ul> ---> $('ul>li')
//showClassName:当前可见的img的className
//$dots:DOM对象 选择导航点li 格式为<ul><li></li></ul>
//onClassName:当前高亮的导航点的className
//autoSlide: 自动轮播，数组[bool isAutoSlide，time interval]
//autoBgc:自动换背景色 数组[#color1, #color2, #color3]
function slider($sliderCon,$sliderLi,showClassName,$dots,onClassName,autoSlide,isAutoBgc,autoBgc){
	var imgNum = $sliderLi.length;
	var currentImgIndex = $sliderLi.index($('.'+showClassName));
	var isAutoSlide = autoSlide ? autoSlide[0] : false;
	var	autoSlideInterval = autoSlide ? autoSlide[1] : 3000;
	var interval = {
			interval : null,
			setInterval : function(autoSlideInterval){
				this.interval = setInterval(next,autoSlideInterval);
			},
			clearInterval : function(){
				clearInterval(this.interval);
			}
		};

	function next(){
		currentImgIndex = $sliderLi.index($('.'+showClassName));
		$sliderLi.eq(currentImgIndex).removeClass(showClassName);
		$sliderLi.eq((currentImgIndex+1)%imgNum).addClass(showClassName);
		$dots.eq(currentImgIndex).removeClass(onClassName);
		$dots.eq((currentImgIndex+1)%imgNum).addClass(onClassName);
		if(isAutoBgc){
			$sliderCon.css('opacity',0.3);
			$sliderCon.css('background-color', autoBgc[(currentImgIndex+1)%imgNum]);
			$sliderCon.animate({opacity: 1}, 500);
		}
	}

	if(isAutoSlide) {
		interval.setInterval(autoSlideInterval);
		$sliderLi.hover(function(){
			interval.clearInterval();
		},function(){
			interval.setInterval(autoSlideInterval);
		});
	}

	$dots.on('click',function(){
		interval.clearInterval();
		interval.setInterval(autoSlideInterval);
		currentImgIndex = $sliderLi.index($('.'+showClassName));
		$sliderLi.eq(currentImgIndex).removeClass(showClassName);
		$dots.eq(currentImgIndex).removeClass(onClassName);
		currentImgIndex = $(this).index();
		$sliderLi.eq(currentImgIndex).addClass(showClassName);
		$dots.eq(currentImgIndex).addClass(onClassName);
		if(isAutoBgc){
			$sliderCon.css('opacity',0.3);
			$sliderCon.css('background-color', autoBgc[currentImgIndex]);
			$sliderCon.animate({opacity: 1}, 500);
		}
	});
};
