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
  const textElement = document.querySelector('.card .titlebox p');
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


// price range
document.addEventListener('DOMContentLoaded', () => {
  const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");
let priceGap = 100000;

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minPrice = parseInt(priceInput[0].value.replace(/,/g, '')),
        maxPrice = parseInt(priceInput[1].value.replace(/,/g, ''));
        
        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min button-74"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});
rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);
        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = formatNumberWithCommas(minVal);
            priceInput[1].value = formatNumberWithCommas(maxVal);
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});
});


// comma insert 
// NOTE :: add "comma-add" class to whatever inputfield with type "text" to make it comma inserted and digit safe
// NOTE :: you should parse these field to integer later.
var textInputs = document.querySelectorAll('input[type="text"].comma-add'); 

function formatInput(event) {
    var input = event.target; 
    var value = input.value;
    
    var removeChar = value.replace(/[^0-9.]/g, '');
    
    var parts = removeChar.split('.');
    if (parts.length > 2) {
        removeChar = parts[0] + '.' + parts.slice(1).join('');
    }
    
    var parts = removeChar.split('.');
    var integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var decimalPart = parts[1] ? '.' + parts[1] : '';
    
    input.value = integerPart + decimalPart;
}

textInputs.forEach(function(input) {
    input.addEventListener('input', formatInput);
});

//form summission correction before submit for commad-add fields

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default submit behavior

      // Target all elements with class "comma-add" within this form
      form.querySelectorAll('.comma-add').forEach(input => {
          let value = input.value.replace(/,/g, ''); // Remove commas
          input.value = parseInt(value, 10); // Convert to integer
      });

      // Optionally log the form values for debugging
      console.log('Form values:', new FormData(form));

      form.submit(); // Trigger the submit event
  });
});


document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default submit behavior
      
      // Log the method of submission
      console.log('Form submission method:', this.method);
      
      // Log the form data from input fields
      const formData = new FormData(this);
      const dataEntries = [...formData.entries()].filter(([key]) => {
          // Filter to include only input fields
          return this.querySelector(`[name="${key}"]`);
      });
      
      console.log('Input field data:');
      dataEntries.forEach(([key, value]) => {
          console.log(`${key}: ${value}`);
      });
      
      // Uncomment to submit the form after logging
      // this.submit();
  });
});


// open filter box
document.addEventListener('DOMContentLoaded', () => {
  const filterBox = document.querySelector('.filter-box');
  const button = document.querySelector('.filter-box .welcome-title');
  button.addEventListener('click', () => {
      filterBox.classList.toggle('expanded');
  });
});

// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded');
});