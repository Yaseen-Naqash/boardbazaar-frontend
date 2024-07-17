
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
// scrolling text
document.addEventListener('DOMContentLoaded', function() {
  const textElement = document.querySelector('.card .titlebox h3');
  if (textElement.scrollWidth > textElement.clientWidth) {
    textElement.classList.add('scrolling');
  } else {
    textElement.classList.remove('scrolling');
  }
});
// image swichter for deals
document.addEventListener("DOMContentLoaded", function() {
  const imageHolders = document.querySelectorAll(".image-holder");

  imageHolders.forEach(function(imageHolder) {
    const images = imageHolder.querySelectorAll("img");
    let hoverInterval;

    function switchImage(index) {
      images.forEach(img => img.classList.remove("active"));
      images[index].classList.add("active");
    }

    imageHolder.addEventListener("mouseenter", function() {
      let currentIndex = 0;
      hoverInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        switchImage(currentIndex);
      }, 1000); // Switch every 2 seconds
    });

    imageHolder.addEventListener("mouseleave", function() {
      clearInterval(hoverInterval);
      switchImage(0); // Reset to first image
    });
  });
});

// deal banner pairs
let currentIndex = 0;
const dealBanners = document.querySelectorAll('.deal-banner');
const totalImages = dealBanners[0].querySelectorAll('img').length;

function showNextImage() {
    dealBanners.forEach(banner => {
        const images = banner.querySelectorAll('img');
        images[currentIndex].classList.remove('active');
    });

    currentIndex = (currentIndex + 1) % totalImages;

    dealBanners.forEach(banner => {
        const images = banner.querySelectorAll('img');
        images[currentIndex].classList.add('active');
    });
}

setInterval(showNextImage, 6000); 


// hero animation
// Function to rotate the arrow boxes counterclockwise by 180 degrees
function rotateArrowBoxes() {
  const arrowBoxes = document.querySelectorAll('.arrow-box');
  
  arrowBoxes.forEach(box => {
    // Get the current rotation angle or set it to 0
    let currentRotation = parseInt(box.dataset.rotation) || 0;
    
    // Calculate the new rotation angle (decrement by 180 degrees)
    let newRotation = currentRotation - 180;
    
    // Apply the new rotation using inline style
    box.style.transform = `rotate(${newRotation}deg)`;
    
    // Store the new rotation angle in a data attribute
    box.dataset.rotation = newRotation;
  });
}

// Initial call to rotate arrow boxes counterclockwise
rotateArrowBoxes();

// Rotate the arrow boxes every 4 seconds
setInterval(rotateArrowBoxes, 6000);


document.addEventListener('DOMContentLoaded', () => {
  const sellOlds = document.querySelector('.sell-olds');
  const buyNew = document.querySelector('.buy-new');
  let flag = true;

  function toggleStyles() {
      if (flag) {
          // Apply new CSS
          sellOlds.style.top = '28%';
          sellOlds.style.left = '70%';
          buyNew.style.top = '80%';
          buyNew.style.left = '30%';
      } else {
          // Revert to original CSS
          sellOlds.style.top = '80%';
          sellOlds.style.left = '30%';
          buyNew.style.top = '28%';
          buyNew.style.left = '75%';
      }
      flag = !flag;
  }

  // Initial style application
  toggleStyles();

  // Repeat the toggle every 4 seconds
  setInterval(toggleStyles, 6000);
});


// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded');
});