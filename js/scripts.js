
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
  var userBoxes = document.querySelectorAll('.user-box');
  var dropdownMenus = document.querySelectorAll('.dropdown-menu');
  var otherLinks = document.querySelector('.other-links');

  userBoxes.forEach(function(userBox, index) {
      var dropdownMenu = dropdownMenus[index];

      userBox.addEventListener('click', function(event) {
          event.stopPropagation(); // Prevent the event from bubbling up

          // Toggle the display of the dropdown menu
          var isDropdownVisible = dropdownMenu.style.display === 'block';
          dropdownMenu.style.display = isDropdownVisible ? 'none' : 'block';

          // Toggle the display of the other-links element
          if (otherLinks) {
              otherLinks.style.display = isDropdownVisible ? 'flex' : 'none';
          }

          // Change the background color of the user box
          if (!isDropdownVisible) {
              userBox.style.backgroundColor = 'white';
          } else {
              userBox.style.backgroundColor = '';
          }
      });

      // Close the dropdown if the user clicks outside of it
      document.addEventListener('click', function(event) {
          if (!userBox.contains(event.target) && !dropdownMenu.contains(event.target)) {
              dropdownMenu.style.display = 'none';

              // Show the other-links element when clicking outside
              if (otherLinks) {
                  otherLinks.style.display = 'flex';
              }

              // Remove the background color of the user box
              userBox.style.backgroundColor = '';
          }
      });
  });
});

// JavaScript (or jQuery) for sidebar toggle functionality
$(document).ready(function() {
  $('.sidebar-toggle').click(function() {
      $('.sidebar').toggleClass('sidebar-open');
  });
});


// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded');
});