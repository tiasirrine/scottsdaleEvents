$(document).ready(function(){
	
	"use strict";

	//preloader
    setTimeout(function() {
            $('body').addClass('loaded');
        }, 500);
	
					
	//cbp-fw slider
	$( function() {
				$( '#cbp-fwslider' ).cbpFWSlider();

			} );
			
    //cbp-fw slider2
	$( function() {
				$( '#cbp-fwslider2' ).cbpFWSlider();

			} );
				
			
	//smoothScroll
	smoothScroll.init();
	
	//Sticky_nav 	
			$(".navmenu").sticky({topSpacing:0});
	
	
	//jQuery Counter
    $('.counter').counterUp({
        time : 3000
    });
	
	
	//Typed JS
		$(document).ready(function(){
			$("#typed").typed({
				stringsElement: $('#typed-strings'),
				typeSpeed: 100,
				backDelay: 2500,
				loop: true,
				contentType: 'html',
				loopCount: true
			});
		});
 
	//Text Rotate
		$(".text-rotate").textrotator({
		  animation: "flipUp",
		  separator: ",",
		  speed: 4000
	});
	
	//0wl-caurosel
	 $("#slider1").owlCarousel(
	  {
		loop:true,
		margin:120,
		nav:true,
		dot:false,
		lazyload:true,
		slideSpeed:6000,
		paginationSpeed:2000,
		rewindSpeed:2000,	
		navigation:true,
		pagination:true,
		autoplay:true,
		autoplaySpeed:1500,
		responsive:{
			0:{
				items:1,
				margin:50
			},
			480:{
				items:2,
				margin:80
			},
			1000:{
				items:2
			}
		}
	}	  
	  );   
	
	//slick slider
	$('.item').slick({
	  dots: true,
	  arrows:false,
	  infinite: false,
	  speed: 1000,
	  slidesToShow: 3,
	  slidesToScroll: 2,
	  responsive: [
		{
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 2,
			infinite: true,
			dots: true
		  }
		},
		{
		  breakpoint: 600,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 2
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true
		  }
		}
 	  ]
    });
		
	   
	// Isotope Gallery

    var $grid = $('.grid').isotope({

      itemSelector: '.grid-item',

      percentPosition: true,

      masonry: {

        columnWidth : '.grid-item'

      }

    });

    var filterFns = {

      numberGreaterThan50: function() {

        var number = $(this).find('.number').text();

        return parseInt( number, 10 ) > 50;

      },

      ium: function() {

        var name = $(this).find('.name').text();

        return name.match( /ium$/ );

      }

    };

    $('.filters-button-group').on( 'click', 'button', function() {

      var filterValue = $( this ).attr('data-filter');

      filterValue = filterFns[ filterValue ] || filterValue;

      $grid.isotope({ filter: filterValue });

    });

    $('.button-group').each( function( i, buttonGroup ) {

      var $buttonGroup = $( buttonGroup );

      $buttonGroup.on( 'click', 'button', function() {

        $buttonGroup.find('.is-checked').removeClass('is-checked');

        $( this ).addClass('is-checked');

      });

    });
	
	 //Portfolio Lightbox

	$('.grid-item').magnificPopup({

		delegate: 'a.port-view',

		type: 'image',

		gallery: {

			enabled: true

		},

		removalDelay: 300,

		mainClass: 'mfp-fade'

	});
	
    //Google Map
	google.maps.event.addDomListener(window, 'load', init);
	function init() {
		var mapOptions = {
			zoom: 11,
			center: new google.maps.LatLng(40.6700, -73.9400), // New York
			styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
		};
		var mapElement = document.getElementById('map');
		var map = new google.maps.Map(mapElement, mapOptions);
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(40.6700, -73.9400),
			map: map,
			title: 'Snazzy!'
		});
	}	

	
});
