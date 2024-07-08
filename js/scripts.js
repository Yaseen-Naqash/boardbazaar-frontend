
// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript start Loading...');
});

// search animation
$(document).ready(function(){
    $("#search").focus(function() {
      $(".search-box").addClass("border-searching");
      $(".search-icon").addClass("si-rotate");
    });
    $("#search").blur(function() {
      $(".search-box").removeClass("border-searching");
      $(".search-icon").removeClass("si-rotate");
    });
    $("#search").keyup(function() {
        if($(this).val().length > 0) {
          $(".go-icon").addClass("go-in");
        }
        else {
          $(".go-icon").removeClass("go-in");
        }
    });
    $(".go-icon").click(function(){
      $(".search-form").submit();
    });
});

// userbox dropdown menu
document.addEventListener('DOMContentLoaded', function() {
    var userBox = document.querySelector('.button-74.user-box');
    var dropdownMenu = document.querySelector('.dropdown-menu');

    userBox.addEventListener('click', function() {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close the dropdown if the user clicks outside of it
    document.addEventListener('click', function(event) {
        if (!userBox.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
});


// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded');
});