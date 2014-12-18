/* ================================
 * GLOBAL
 * ================================ */
var animateOpacity = 1000;
var animateCounter = 1000;
var animateAccordion = 0;
var animateOverlay = 150;
var animateSlide = 700;
var animateMessage = 1000;
var animateScroll = 1200;


/*
 * section variables
 */
var $sectionFacts;	




/* ================================
 * DOCUMENT READY
 * ================================ */
(function($){
	$(function(){
		
		// WINDOW RESIZE
		$(window).on("resize", function(){
			
		});
		
		// WINDOW SCROLL
		$(window).scroll(function(){
		 
		 	// active counter
		 	$sectionFacts = $("section.section-facts").offset().top - $(window).scrollTop();
			if(($sectionFacts <= $(window).height()/10) && launchCounter != null)
			{			
				launchCounter();
				launchCounter = null;
			}	
			
			// show-hide scrolltop button
			$navNavigation = $("nav.navbar[role='navigation']").offset().top - $(window).scrollTop();
			if($navNavigation <= $("nav.navbar[role='navigation']").height()*-1)
			{
				$(".scroll-top").css("visibility", "visible");
			}
			else {
				$(".scroll-top").css("visibility", "hidden");
			}
			
						
		});
		
		// Controllo presenza di immagine nella sezione profilo
		if($(".aboutme-profile > img, .hire-profile > img").length){
			$(".aboutme-profile, .hire-profile").css("background", "none");
		}
		
		// Richiamo la funzione di controllo accordion
		$(".panel-title > a").on("click", function(){
			$this = $(this);
			verifyAccordion($this);
		});
		
		// Mostra overlay nella sezione work
		$(".work-element").hover(function(){
			$(this).find(".work-element-overlay").stop().fadeIn(animateOverlay);
		}, function(){
			$(this).find(".work-element-overlay").stop().fadeOut(animateOverlay);
		});
				
		// Richiamo il plugin stackslider section slider
		$(".slide-container").owlCarousel({
 
  			navigation 			: true,
  			pagination			: false,
  			rewindNav			: true,
  			responsiveBaseWidth	: $(".section-slide"),
  			navigationText		: false, //["<", ">"],
  			theme				: "slide-container",
  			slideSpeed 			: animateSlide,
  			paginationSpeed		: animateSlide,
  			rewindSpeed			: animateSlide,
  			addClassActive		: true,
  			singleItem			: true
 
  		});
  		
  		// Dimensioni progress bar
  		$(".progress-bar").each(function(){
  			var progressValue = $(this).attr("aria-valuenow")+"%";
  			$(this).css({"width": progressValue});
  			$(this).parent().parent().find(".progress-value").text(progressValue);
  		});
  		
  		// Richiamo il plugin stackslider section featured
		$(".featured-slider").owlCarousel({
 
  			navigation 			: false,
  			pagination			: true,
  			rewindNav			: true,
  			responsiveBaseWidth	: $(".section-featured"),
  			navigationText		: false, //["<", ">"],
  			theme				: "featured-slider",
  			slideSpeed 			: animateSlide,
  			paginationSpeed		: animateSlide,
  			rewindSpeed			: animateSlide,
  			addClassActive		: true,
  			singleItem			: true
 
  		});
  		
  		// Richiamo il plugin validate form
  		$(".contact-form").validate({
  			debug:true,
			highlight: function(element, errorClass) {
		    	$(element).parent().addClass("has-error");
		    	$(element).parent().find(".form-control-feedback").css("visibility", "visible");
		  	},
		  	unhighlight: function(element, errorClass, validClass) {
		  		$(element).parent().removeClass("has-error");
		  		$(element).parent().find(".form-control-feedback").css("visibility", "hidden");
		  	},
		  	submitHandler: function(form) {
				var name 		= $("[name='name']").val();
				var email 		= $("[name='email']").val();
				var tel 		= $("[name='tel']").val();
				var subject		= $("[name='subject']").val();
				var message		= $("[name='message']").val();
				
				$(".message-result").stop(true, true).fadeOut(0);

				$.ajax({
					type: "POST",
				  	url: "sendmail.php",
				  	data: { name:name, email:email, tel:tel, subject:subject, message:message }
				}).done(function( data ) {
					// DONE				
				    $(".message-result").stop(true, true).fadeIn(animateMessage);
				    $(".message-result").empty().append(data);
				    if($(".message-result > span").hasClass("success")){
				    	$(".contact-form input, .contact-form textarea").val("");
				    }				    			    
				}).fail(function( data ) {
					//FAIL
					$(".message-result").stop(true, true).fadeIn(animateMessage);
					$(".message-result").empty().append(data);				
				});
			}
		});
		
		// Create voice menu
		$("#pagination-menu > ul").empty();
		$("body > section").each(function(){
			var menuTarget = $(this).attr("class");
			var menuName = $(this).attr("data-name");
			$("#pagination-menu > ul").append('<li><a href="'+menuTarget+'">'+menuName+'</a></li>');
		});
		var middleElement = Math.ceil($("#pagination-menu > ul > li").length / 2);
		$("#pagination-menu > ul > li:nth-child("+middleElement+")").after('<li class="logo-container"><div class="logo"><img alt="logo" src="img/global/thefox-logo.png"></div></li>');
		
		// Funzionalità menu
		$("#pagination-menu > ul > li > a").click(function(e) { 
		    e.preventDefault(); 
		    scrollToElement($(this).attr("href"));           
		});
		
		// Scroll top
		$(".scroll-top").on("click", function(){
			$('html,body').stop().animate({
		        scrollTop: 0
			}, animateScroll);
		});
		
		// At document ready, LOAD IMAGES
		loadImg();
	
	
	});
})(jQuery);



/* ================================
 * FUNCTIONS
 * ================================ */

// LOAD IMAGES
function loadImg()
{
	$("img").load(function(){
  		$(this).stop().animate({
  			"opacity":1
  		}, animateOpacity);
  	}).each(function(){
  		if(this.complete){
  			// controlla che le immagini non siano in cache
  			$(this).trigger("load");
  		}
  	});
}

// COUNTER SKILL
var launchCounter =  function()
{	
	$('.count').each(function () {
	  var $this = $(this);
	  // Apply Counter
	  $({ Counter: 0 }).stop().animate({ Counter: parseInt($this.attr("data-count")) }, {
	    duration: animateCounter,
	    easing: 'swing',
	    step: function(){
	    	$this.text(Math.ceil(this.Counter).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	    },
	    done: function(){
	    	$this.text(Math.ceil(this.Counter).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	    }
	  });
	});
};

// ACCORDION CONTROL
function verifyAccordion($this)
{
	
	$(".panel-title > a").removeClass("actived");
	var $target = $($this.attr("href"));
	$(".panel-heading a span.fa-minus").fadeOut(animateAccordion);
	$(".panel-heading a span.fa-plus").fadeIn(animateAccordion);
	if(!$target.hasClass("in"))
	{
		$this.addClass("actived");
		$this.parent().find(".fa-minus").fadeIn(animateAccordion);
		$this.parent().find(".fa-plus").fadeOut(animateAccordion);
	}
}

// CLICK MENU SCROLL
function scrollToElement(target){
    $('html,body').stop().animate({
        scrollTop: $("."+target).offset().top
	}, animateScroll);
}

