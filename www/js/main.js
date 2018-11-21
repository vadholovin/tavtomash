/*----------------------------------------------------*/
/*  MENU
/*----------------------------------------------------*/
$(document).ready(function () {

  function toggleMenu() {
    $('.hamburger').toggleClass('open');
    $('.nav-mobile__list').slideToggle();
  }

  function hideMenu() {
    $('.hamburger').removeClass('open');
    $('.nav-mobile__list').slideToggle();
  }

  $('.hamburger').click(function() {
    toggleMenu();
  });

  $('.hamburger').on('keydown', function(e){
    if (e.keyCode == 13) {
      toggleMenu();
    }
  });

  $('.nav-mobile__list a').click(function() {
    toggleMenu();
  });

  $(document).on('keydown', function(e) {
    if ($('.hamburger').hasClass('open') && e.keyCode == 27) {
      toggleMenu();
    }
  });

  $(document).click(function(event) {
    var target = $( event.target );

    if ($('.hamburger').hasClass('open') && !target.hasClass('nav-mobile__list') && !target.hasClass('hamburger') && !target.parent().hasClass('hamburger')) {
      hideMenu();
    }
  });
});


/*----------------------------------------------------*/
/*	SCROLL NAVBAR
/*----------------------------------------------------*/
(function($) {

  $(window).scroll(function(){	

    "use strict";	
  
    var b = $(window).scrollTop();

    if ( b > 100 && window.innerWidth < 992) {
      $(".header").addClass("header--invisible");
    }  else {
      $(".header").removeClass("header--invisible");
      $(".header").removeClass("header--scroll-fixed");
    }
    
    if( b > 200 && window.innerWidth < 992){		
      $(".header").addClass("header--scroll-fixed");
    } else {
      $(".header").removeClass("header--invisible");
      $(".header").removeClass("header--scroll-fixed");
    }
    
  });
  
})( jQuery );


/*----------------------------------------------------*/
/*  SEARCH FORM TOGGLE
/*----------------------------------------------------*/
$(document).ready(function () {

  function toggleSearch() {
    $(".search-form--mobile").slideToggle();
    $(".search-form--mobile").toggleClass('on');
    $(".search-form--mobile input").focus();
  }

  function hideSearch() {
    $(".search-form--mobile").slideToggle();
    $(".search-form--mobile").toggleClass('on');
  }
  
  $(".search-toggle").on("click", function() {
    toggleSearch();
  });

  $('.search-toggle').on('keydown', function(e){
    if (e.keyCode == 13) {
      e.preventDefault();
      toggleSearch();
    }
  });

  $(document).on('keydown', function(e) {
    if ($('.search-form--mobile').hasClass('on') && e.keyCode == 27) {
      hideSearch();
    }
  });

  $(document).click(function(event) {
    var target = $( event.target );

    if ($('.search-form--mobile').hasClass('on') && !target.hasClass('search-form--mobile') && !target.hasClass('search-toggle') && !target.hasClass('search-field') && !target.parent().hasClass('search-form--mobile')) {
      hideSearch();
    }
  });
});


/*----------------------------------------------------*/
/*  SIDEBAR
/*----------------------------------------------------*/
$(document).ready(function () {

	$(".sidebar-categories li.have-children > a").on("click", function(i) {
    i.preventDefault();
    if ( ! $(this).parent().hasClass("active") ) {
      $(this).next().slideToggle();
      $(this).parent().addClass("active");
    } else {
      $(this).next().slideToggle();
      $(this).parent().removeClass("active");
    }
  });

  $(".sidebar-categories a").on("click", function() {
    if ( ! $(this).parent().hasClass("have-children") ) {
      $(".sidebar-categories a").removeClass("active");
      $(this).addClass("active");
    }
  });
});


/*----------------------------------------------------*/
/*  SHOW/HIDE SIMPLE MODAL FORM
/*----------------------------------------------------*/
$(document).ready(function () {

  function hideModalbox() {
    $("#modal_box").addClass("is-hidden-box");
    $('#form-callback').trigger("reset");
    $('#form-callback [id*=error]').remove();
  }

  $(".call-trigger").on("click", function(){
    $("#modal_box").toggleClass("is-hidden-box");
  });

  $(".call-trigger").on("keydown", function(e){
    if (e.keyCode == 13) {
      $("#modal_box").removeClass("is-hidden-box");
    }
  });

  $("#modal_box .modal-close, #modal_box .modal-background").on("click", function() {
    hideModalbox();
  });

  $(document).on("keydown", function(e) {
    if ( !$("#modal_box").hasClass("is-hidden-box") && e.keyCode == 27) {
      hideModalbox();
    }
  });

  $(document).click(function(event) {
    var target = $( event.target );

    if (!target.hasClass('call-trigger') && target.parents().hasClass('header') && !$("#modal_box").hasClass("is-hidden-box")) {
      hideModalbox();
    }
  });
});


/*----------------------------------------------------*/
/*  MASKED INPUT
/*----------------------------------------------------*/
$(document).ready(function () {

  $("#user-phone").mask("+7(999) 999-9999");
});


/*----------------------------------------------------*/
/*  FORM VALIDATION + SUBMIT
/*----------------------------------------------------*/

$(document).ready(function () {

  $("#form-callback").submit(function(e){
    e.preventDefault();

    var form = $('#form-callback');

    form.validate({
      rules: {
        'user-phone': 'required',
        'user-agree': 'required',
        'user-time': {
          required: true,
          minlength: 2
        }
      },
      messages: {
        'user-phone': 'Ошибка',
        'user-agree': 'Ошибка',
        'user-time': {
          required: 'Ошибка',
          minlength: 'Ошибка'
        }
      },
    });


    if(form.valid()) {
      $.ajax({
        url : "feedback-call.php",
        type: "POST",
        data: $(this).serialize(),
      }).done(function(res) {
        answer(res);
      });
    }
  });

  function answer(res) {
    if(res == "error"){
      $(".modal-title").text("Ошибка отправки!");
    }
    if(res == "done"){
      $(".modal-title").text("Отправлено!");

      setTimeout(function() {
        $("#modal_box").addClass("is-hidden-box");
      }, 2000);
    }
  }

  function resetForm($form) {
    $form.find("input:text, input[type=tel]").val("");
  }
});