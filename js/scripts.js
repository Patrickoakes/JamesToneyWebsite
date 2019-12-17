$(document).ready(function(e) {
	
$(window).on("load",function(){

$(".preloader").hide();
	
/*----------------- Nav --------------------*/
var t = 1000;
var $li = $(".nav li:not('.social_icons')");
$li.click(function(){
	if($(".content > div").is(":animated")) {
		return false;
	}else {
	  $(this).addClass("active").siblings().removeClass("active");	
	  var $id = $(this).attr("id");
	  $(".content > div").not($("."+$id)).animate({"top":"100%"},t,function(){$(this).css({"left":"-100%","top":"0%"});});
	  switch($id) {
		 case "home":
			 $(".home").delay(t).animate({"left":"0%"},t);
			 break;
		 case "gallery":
			 $(".gallery").delay(t).animate({"left":"0%"},t);
			 break;
		 case "about":
			 $(".about").delay(t).animate({"left":"0%"},t);
			 break;
		 case "contact":
			 $(".contact").delay(t).animate({"left":"0%"},t);
			 break;
	  }
	}//animated
});

$(".social_icons i,.social_icons_mobile i").click(function(){
	var $id = $(this).attr("id");
	switch($id) {
		case "facebook":
			window.open("https://www.facebook.com","_blank");
			break;
		case "google":
			window.open("https://www.plus.google.com","_blank");
			break;
		case "twitter":
			window.open("https://www.twitter.com","_blank");
			break;	
	}
});	
/*---------------- End Nav ----------------*/	


/*------------------ Form -----------------*/
$("#submit").on({
	mousedown: function(){
		$(this).css({"background":"#333333","color":"black"});
	},
	mouseup: function(){
		$(this).css({"background":"black","color":"#333333"});
	}
});



$("#phone").mask("999-999-9999");



$("#submit").click(function(){
	if($("#name").val() && $("#email").val() && $("#phone").val() && $("#message").val()) {
		$(".form input,.form textarea").not("#email").removeClass("error");
		email_validation($("#email"),"error");
	}else {
		$(".form input,.form textarea").each(function(){
			if($.trim($(this).val()) === ""){
				$(this).addClass("error");
			}else {
				$(this).removeClass("error");
			}	
		});
	}	
});


function email_validation(check_email,error_class){
	check_email.filter(function(){
		var emailTrim = $.trim(check_email.val());
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if(!emailReg.test(emailTrim)) {
			check_email.addClass(error_class);
		}else {
			if(emailTrim.length > 0) {
				var rejectList = ["mailinator.com","guerrillamail.com","10minutemail.com"];
				var emailValue = check_email.val();
				var splitArray = emailValue.split("@");
				if(rejectList.indexOf(splitArray[1]) >= 0) {
					check_email.addClass(error_class);
				}else {
					check_email.removeClass(error_class);
					$("#submit").val("Sending").attr("disabled",true);
					$.ajax({
						url:"php/sendmail.php",
						data:{name:$("#name").val(),email:$("#email").val(),phone:$("#phone").val(),message:$("#message").val()},
						type:"POST",
						success: function(data) {
							switch($.trim(data)) {
								case "Sent":
									$("#submit").val("Sent").attr("disabled",false);
									setTimeout(function(){$("#submit").val("SEND");},5000);
									$(".form input,.form textarea").not("#submit").val("");
									break;
								case "Wrong":
									$("#submit").val("Wrong Email").attr("disabled",false);
									setTimeout(function(){$("#submit").val("SEND");},5000);
									break;
								case "Failed":
									$("#submit").val("Try Again").attr("disabled",false);
									setTimeout(function(){$("#submit").val("SEND");},5000);
									break;
								default:
									setTimeout(function(){$("#submit").val("SEND");},5000);
									break;								
							}
						}//success
					});//ajax
				}
			}else {
				check_email.removeClass(error_class);
			}
		}	
	});
}//email validation
/*-------------- End Form ----------------*/


/*------------ Footer Gallery ------------*/
$(".footer > i").click(function(){
	if($(".thumbnails").is(":animated")) {
		return false;
	}else {
		var extraThumb = $(".thumbnails > div").length - 5;
		var maxPixelToMoveLeft = extraThumb * -120;
		var left = parseInt($(".thumbnails").css("left"));
		var $id = $(this).attr("id");
		switch($id) {
			case "right_arrow":
				  if(left > maxPixelToMoveLeft) {
					   $(".thumbnails").animate({"left":left+(-120)},200,"linear");
					}
				break;
			case "left_arrow":
				  if(left !== 0) {
					   $(".thumbnails").animate({"left":left+(120)},200,"linear");
					}
				break;	
		}
	}//animated
});
/*---------- End Footer Gallery ----------*/


/*-------------- Change BG ---------------*/
$(".thumbnails > div").click(function(){
	$(this).addClass("border").siblings().removeClass("border");
	var src = $(this).children("img").attr("src");	
			  $("body").css("background-image","url(./"+src+")");
});
/*------------ End Change BG -------------*/


/*---------- Full Screen Gallery ---------*/
var imageName;
$(".gallery > div > img").click(function(){
	imageName = $(this).attr("src").split("/").pop().slice(0,-4);
	$(".full_screen_gall img").attr("src","images/gallery/"+imageName+".jpg");
	$(".full_screen_gall").show();	
});

var q = 15; //Image Quantity In The Gallery Folder
$("#right_arrow_big,#left_arrow_big,#close").click(function(){
	var $id = $(this).attr("id");
	switch($id) {
		case "right_arrow_big":
			  if(imageName < q) {
				 imageName++;
				 $(".full_screen_gall img").attr("src","images/gallery/"+imageName+".jpg"); 
			  }else {
				 $(".full_screen_gall img").attr("src","images/gallery/1.jpg");
				 imageName = 1;
			  }
			break;
		case "left_arrow_big":
			  if(imageName > 1) {
				 imageName--;
				 $(".full_screen_gall img").attr("src","images/gallery/"+imageName+".jpg"); 
			  }else {
				 $(".full_screen_gall img").attr("src","images/gallery/"+q+".jpg");
				 imageName = q;
			  }
			break;
		case "close":
			  $(".full_screen_gall").hide();
			break;
	}
});
/*---------- End Full Screen Gallery ---------*/


/*--------------------Mobile---------------------*/  
$("#mobile_menu").click(function(){
	if($(".content > div").is(':animated')) {
		return false;
	}else{
		$('.header').toggleClass("show");
	}//animated
});

$('.nav li').click(function(){
	if($(window).width() <= '480'){
		$('.header').toggleClass("show");
	}
});
/*------------------End Mobile------------------*/

		
});//load
	
});