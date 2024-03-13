

// save and load cockies that contain the language
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  const expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}





// Function to load and translate content
function loadTranslation(lang) {
  fetch(`lang/content_${lang}.json`,  { crossorigin: 'anonymous' })
    .then(response => response.json())
    .then(data => {
      // Update elements with translated text
      document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.dataset.key;
        if(data[key] != null) {
          // if element is an input or textarea then update the placeholder

          if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = data[key];
            if (el.type === 'submit') {
              el.value = data[key];
            }
            // if type is submit then update the value
          } else {
            el.innerHTML = data[key];
          }
        }
      });
    });
}


// Define available languages
function initializeLanguage() {
  const languages = ['en', 'he'];

  // Choose default language
  // Get the language from the cookie
  var language = getCookie('lang') || navigator.language.substring(0, 2).toLowerCase() || 'en';
 

  // Check if the language is supported
  if (!languages.includes(language)) {
    language = 'en';
  }

  // log the language 
  console.log("Language: ", language)



  
  // customize the page based on the language
  if (language === 'en') {
    // set flag to israel
    document.querySelector('.navbar-lang').setAttribute('src', 'https://fontawesomeicons.com/lib/svg/israel-flag.svg')

  }

  if(language === 'he') {
    document.dir = 'rtl'

    // define and inject custom CSS for RTL languages
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.textContent = `
      *{
        font-family: 'Alef', 'Poppins', sans-serif;
      }
      .footer {
        text-align: right;
      }
      .header .navbar {
        direction: rtl;
      }
      .faq .row .accordion-container {
        text-align: right;
      }
      .contact-form-phone {
        direction: rtl;
      }

      .ion-ios-arrow-forward:before {
        transform: scaleX(-1);
      }
    `;
    document.head.appendChild(styleElement);
    
    // set flag to english
    document.querySelector('.navbar-lang').setAttribute('src', 'https://fontawesomeicons.com/lib/svg/liberia-flag.svg')

    // load the translation
    loadTranslation(language)
  }

 
}



initializeLanguage();


// Function to change language
function changeLanguage(lang) {
  // Save the language in a cookie
  setCookie('lang', lang, 365);

  // Reload the page
  location.reload();
}

// tuggleLanguage
function tuggleLanguage() {
  var language = getCookie('lang');
  if(language === 'he') {
    changeLanguage('en')
  } else {
    changeLanguage('he')
  }
}


// Add language switcher logic (optional)
// ...

// Update language based on selection (optional)
// ...


$(document).ready(function(){

     $('.fa-bars').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('load scroll',function(){
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if($(window).scrollTop()>35)
        {
            $('.header').css({'background':'#002e5f','box-shadow':'0 .2rem .5rem rgba(0,0,0,.4)'});
        }
        else
        {
            $('.header').css({'background':'none','box-shadow':'none'});
        }
    });

    const counters = document.querySelectorAll('.counter');
    const speed = 120;
    counters.forEach(counter => {
	const updateCount = () => {
		const target = +counter.getAttribute('data-target');
		const count = +counter.innerText;
		const inc = target / speed;
		if (count < target) {
			counter.innerText = count + inc;
			setTimeout(updateCount, 1);
		} else {
			counter.innerText = target;
		}
	};
	  updateCount();
   });

   (function ($) {
    "use strict";
    
    $(".general-crousel-div").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: { 0: {items: 2}, 768: {items: 4}, 900: {items: 6} }
    });

    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: { 0: {items: 1}, 576: {items: 2}, 768: {items: 3}, 992: {items: 4} }
    });
    
})(jQuery);

$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
});
$('.back-to-top').click(function () {
    $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
    return false;
});

$('.accordion-header').click(function(){
    $('.accordion .accordion-body').slideUp(500);
    $(this).next('.accordion-body').slideDown(500);
    $('.accordion .accordion-header span').text('+');
    $(this).children('span').text('-');
});

});


// function createWhatsAppLink1() {
//   console.log("Hello")
// }

function createWhatsAppLink1() {
    // Get form values
    const name = document.getElementsByClassName('contact-form-name').value;
    const phone = document.getElementsByClassName('contact-form-phone').phone.value
    const email = document.getElementsByClassName('contact-form-email').value;
    const message = document.getElementsByClassName('contact-form-txtarea').value;
  
    // Clean phone number by removing non-numeric characters
    const cleanPhone = phone.replace(/\D/g, '');
  
    // Replace placeholder characters in format string
    const formatString = "Hi %s!\n\nPhone: %s\nEmail: %s\n\nMessage:\n%s";
    const formattedMessage = formatString.replace('%s', name).replace('%s', cleanPhone).replace('%s', email).replace('%s', message);
  
    // Ensure phone number starts with '+' and uses correct country code
    let whatsappPhone = cleanPhone;
    if (whatsappPhone.charAt(0) !== '+') {
      whatsappPhone = '+' + whatsappPhone; // Assuming country code is 972 for Israel
    }
  
    // Construct WhatsApp link with pre-filled message
    const whatsappLink = 'https://api.whatsapp.com/send?phone=' + whatsappPhone + '&text=' + encodeURIComponent(formattedMessage);
    
    // console log the result 
    console.log(whatsappLink)
    setTimeout(9000)
  
    // Check if there's a WhatsApp chat history with the number (for iOS compatibility)
    const hasChatHistory = false; // Replace with your logic to check chat history
  
    // Open WhatsApp in different ways based on browser and presence of chat history
    if (navigator.userAgent.match(/Android/i)) { // Android devices
      if (hasChatHistory) {
        // window.location.href = whatsappLink; // No history: redirect to new chat
      } else {
        // window.open(whatsappLink, '_blank'); // Open in new tab or window
      }
    } else if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) { // iOS devices
      if (hasChatHistory) {
        // window.location.href = whatsappLink; // Open existing chat
      } else {
        console.log("WhatsApp Web is not available on your device. Please ask the user to open WhatsApp manually.");
      }
    } else { // Desktop browsers
      console.log("WhatsApp Web is not available on your device. Please ask the user to open WhatsApp manually.");
    }
  }
  
  8

$('#contact-form').submit(function(e) {
   e.preventDefault();
});


