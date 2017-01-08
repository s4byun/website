let media_width = 800;

$(document).ready(function() {
	configure_intro();
	configure_navbar();
	configure_buttons();
});

function configure_intro() {
	handle_resize();
	set_wave();
	set_down_arrow_scroll();
}

function handle_resize() {
	$('.whole-screen').css('height', $(window).height());
	$('.popover').css('max-width', $(window).width()/2);
	$(window).resize(function() {
		$('.whole-screen').css('height', $(window).height());
		$('.popover').css('max-width', $(window).width()/2);
	});
}

function set_wave() {
	let intro_text = $('.wave').text();
	var intro_html = "";

	for(var i=0; i < intro_text.length; i++) {
		var c = intro_text.charAt(i);
		if(c == " ") {
			intro_html += c;
		}
		else {
			intro_html += "<span>" + c + "</span>";
		}
	}

	var animTime = 1, hueChange = 3, prefixes = ["", "-webkit-", "-moz-", "-o-"];

	$('.wave').html(intro_html);
	$('.wave').children('span').each(function (i) {
		for(var j=0; j < prefixes.length; j++) {
			$(this).css(prefixes[j] + 'animation-delay', (animTime * ((i*hueChange)%80)/80) - animTime + 's');
		}
	});
}

function set_down_arrow_scroll() {
	$('.bottom-footer').click(function() {
		$('html, body').animate({ scrollTop: $('.whole-screen').height() }, 500);
	});
}

function configure_navbar() {
	set_navbar_display();
	set_navbar_url_adapter();
	set_navbar_active_adapter();
	set_navbar_scrollspy();
}

function set_navbar_display() {
	$('body').attr('data-offset', $(window).height()/5);
	$('.navbar li a').click(function () {
		$('.navbar-collapse').collapse('hide');
    });
}

function set_navbar_url_adapter() {
	$('#myNavbar').on('activate.bs.scrollspy', function() 
	{
		window.location.hash = $('.nav .active a').attr('href').replace('#', '#/');
	});
}

function set_navbar_active_adapter() {
	$('#myNavbar').on('activate.bs.scrollspy', function() 
	{
		$('.nav li a').css("background", "transparent");
		$('.nav .active a').css("background-color", "#262626");
		var section = $('.nav .active').text();
		if(section == "Top") section = "";
		$('.navbar-header .current-nav').text(section);
	});
}

var didScroll = false;
var fadeOutTimer = 0;
var fadeOutThreshold = 8; // * 250ms
function set_navbar_scrollspy() {				
	window.onscroll = function() {
		didScroll = true;
	};

	$('.navbar').hover(function() { 
		fadeOutTimer = 0; 
		$('.navbar').show();
	});

	window.setInterval(function() {
		// desktop
		if($(window).width() > media_width) {
			if(didScroll) {
				didScroll = false;
				if($(document).scrollTop() <= $('.whole-screen').height()*3/4) {
					$('.navbar').hide();
				}
				else {
					fadeOutTimer = 0;
					$('.navbar').show();
				}
			}
			else {
				fadeOutTimer++;
				if(fadeOutTimer >= fadeOutThreshold) {
					$('.navbar').hide();
				}
			}	
		}
		else {
			$('.navbar').show();
		}
	}, 250);
}

function configure_buttons() {
	set_feedback_button_toggle();
	set_popover_button();
}

function set_feedback_button_toggle() {
	$('.my-btn-toggle').click(function() {
		if($(this).attr('data-toggle') == "true") {
			$(this).text($(this).attr('hide'));
			$(this).attr('data-toggle', "false");
			$(this).siblings('img').removeClass('hidden');
		}
		else {
			$(this).text($(this).attr('show'));
			$(this).attr('data-toggle', "true");
			$(this).siblings('img').addClass('hidden');
		}
	});
}

function set_popover_button() {
	$('.my-popover-100').popover({
			placement: 'auto bottom',
			html: 'true',
			content:
			'<ul> \
				<li><a href="https://sites.google.com/a/eng.ucsd.edu/cse-100-fall-2016/syllabus" style="font-weight: 600;">Example course website</a></li> \
				<li>Balanced Trees (AVL, Red-black, B/B+)</li> \
				<li>Multi-way Trie</li> \
				<li>Ternary Search Trie</li> \
				<li>Hash Table</li> \
				<li>Skip List</li> \
				<li>Graphs</li> \
			</ul>',
			trigger: 'hover'
	});
}





