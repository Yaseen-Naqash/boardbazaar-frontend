// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript start Loading...');
    
});






// image uploader
document.addEventListener("DOMContentLoaded", function() {
    const uploadBox = document.getElementById("upload-box");
    const fileInput = document.getElementById("file-input");
    const imagePreview = document.getElementById("image-preview");
    const form = document.getElementById("image-upload-form");

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadBox.addEventListener(eventName, preventDefaults, false)
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight upload box on drag
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadBox.addEventListener(eventName, () => uploadBox.classList.add('highlight'), false)
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadBox.addEventListener(eventName, () => uploadBox.classList.remove('highlight'), false)
    });

    // Handle dropped files
    uploadBox.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        let files = e.dataTransfer.files;
        handleFiles(files);
    }

    // Handle files when selected via browse button
    fileInput.addEventListener('change', (e) => {
        let files = e.target.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        [...files].forEach(file => previewFile(file));
    }

    function previewFile(file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                const img = document.createElement('img');
                img.src = reader.result;
                imagePreview.appendChild(img);
            }
        }
    }

    
    
});




// category selection dropdown
// Event delegation for dropdown header clicks
document.addEventListener('click', function(event) {
    let dropdownHeader = event.target.closest('.dropdown-header');
    if (dropdownHeader) {
        dropdownHeader.parentElement.classList.toggle('open');
    }
});

// Event delegation for checkbox changes
document.addEventListener('change', function(event) {
    if (event.target.matches('.dropdown-options input[type="checkbox"]')) {
        let checkbox = event.target;
        let selectedOptionsContainer = checkbox.closest('.multi-select-dropdown').querySelector('.selected-options');
        selectedOptionsContainer.innerHTML = ''; // Clear previous options
        
        let checkedCheckboxes = checkbox.closest('.dropdown-options').querySelectorAll('input[type="checkbox"]:checked');
        
        if (checkedCheckboxes.length > 3) {
            checkbox.checked = false;  // Uncheck the current checkbox if more than 3 are selected
            return;
        }

        checkedCheckboxes.forEach(function(checkedBox) {
            let optionDiv = document.createElement('div');
            optionDiv.classList.add('select-option');
            optionDiv.textContent = checkedBox.parentElement.textContent.trim();
            selectedOptionsContainer.appendChild(optionDiv);
        });
    }
});



// custopm validity of a text input 
document.querySelectorAll('.validate-number').forEach(function(input) {
    input.addEventListener('input', function() {
        let value = input.value.replace(/,/g, ''); // Remove commas from the input value
        let numericValue = parseInt(value, 10);

        let min = 10000; // Minimum allowed value
        let max = 50000000; // Maximum allowed value

        // Validate the number
        if (isNaN(numericValue) || numericValue < min || numericValue > max) {
            input.setCustomValidity('قیمت مورد تایید نیست');
        } else {
            input.setCustomValidity('');
        }
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
      this.submit();
  });
});



// add new game 
let boardgameCount = 1;
const MAX_BOARDGAMES = 10;

function addBoardGame() {
    if (boardgameCount >= MAX_BOARDGAMES) {
        alert('امکان ثبت بیش از 10 بازی در یک آگهی نیست');
        return;
    }

    boardgameCount++; 
    const boardgamesDiv = document.getElementById('create-games-wrapper');
    const newDiv = document.createElement('div');
    newDiv.classList.add('middle-align');
    newDiv.innerHTML = `
    <div class="create-game">

    <h2>بازی ${boardgameCount}</h2>
    <div class="input-field" style="width: 100%;"> 
        <input class="button-74" type="text" spellcheck="false" placeholder=" "id="game_name${boardgameCount}" name="game_name${boardgameCount}" required autocomplete="off" style="width: 100%; max-width: 280px;">
        <label>نام بازی</label>
    </div>
    <div class="input-field" style="width: 100%;"> 
        <input class="button-74 comma-add validate-number" type="text" spellcheck="false" placeholder=" " id="game_price${boardgameCount}" name="game_price${boardgameCount}" required autocomplete="off" style="width: 100%; max-width: 280px;">
        <label>قیمت بازی</label>
    </div>
    <div class="multi-select-dropdown">
        <div class="dropdown-header button-74">
          <span>دسته بندی</span>
          <div class="selected-options"></div>
        </div>
        <div class="dropdown-options">
          <label><input type="checkbox" name="game_category${boardgameCount}" value="war"> جنگی</label>
          <label><input type="checkbox" name="game_category${boardgameCount}" value="farming"> فارمینگ</label>
          <label><input type="checkbox" name="game_category${boardgameCount}" value="card"> کارتی</label>
        </div>
    </div>
    <fieldset>
      <div class="qbox" style="display: flex; flex-direction: column; align-items: center; margin-top: 0px;">
        <h3>وضعیت</h3>
        <div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 0px; margin: 15px 0;">
          <div class="checkbox-container">
              <label class="custom-checkbox button-74">
                  <input type="radio" id="deal-foreign" name="game-status${boardgameCount}" value="instock" checked>
                  <span>موجود</span>
              </label>
          </div>
          <div class="checkbox-container">
              <label class="custom-checkbox button-74">
                  <input type="radio" id="deal-domestic" name="game-status${boardgameCount}" value="outstock">
                  <span>ناموجود</span>
              </label>
          </div>
        </div>
      </div>
    </fieldset>
    </div>
    `;
    boardgamesDiv.appendChild(newDiv);

    // Reapply the comma format event listener to all inputs
    reapplyCommaAddListeners();
    addInputListeners();
    updateCard();
}

function reapplyCommaAddListeners() {
    var textInputs = document.querySelectorAll('input[type="text"].comma-add'); 
    textInputs.forEach(function(input) {
        input.removeEventListener('input', formatInput); // Remove previous listener if any
        input.addEventListener('input', formatInput);    // Add the listener again

        // I RE COPY HERE AGAIN TO APPLY LISTENERS TO NEW CREATED INPUTS
        document.querySelectorAll('.validate-number').forEach(function(input) {
            input.addEventListener('input', function() {
                let value = input.value.replace(/,/g, ''); // Remove commas from the input value
                let numericValue = parseInt(value, 10);
        
                let min = 10000; // Minimum allowed value
                let max = 50000000; // Maximum allowed value
        
                // Validate the number
                if (isNaN(numericValue) || numericValue < min || numericValue > max) {
                    input.setCustomValidity('قیمت مورد تایید نیست');
                } else {
                    input.setCustomValidity('');
                }
            });
        });
    });
}

// Initial call to apply the listener when the page loads
reapplyCommaAddListeners();

// form submission correction before submit for comma-add fields
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



// CHANGE COLOR OF DEAL
// Track the current color and image state
let isRedColor = true;

// Function to toggle colors and update image source
function toggleColors() {
    let createForm = document.querySelector('.create-form');
    let imageHolder = document.querySelector('.image-holder');
    let selectedValue = document.querySelector('input[name="deal-type"]:checked').value;

    if (createForm) {
        // Update colors based on selected radio button
        if (selectedValue === 'sell') {
            createForm.style.setProperty('--red-color', '#e73656');
            createForm.style.setProperty('--blue-color', '#00adb2');
        } else if (selectedValue === 'buy') {
            createForm.style.setProperty('--red-color', '#00adb2');
            createForm.style.setProperty('--blue-color', '#e73656');
        }

        // Apply transition for color change
        createForm.classList.add('toggle-color');
        
        // Remove the class after transition ends to allow re-adding it
        setTimeout(() => createForm.classList.remove('toggle-color'), 1000);
    }

    if (imageHolder) {
        let images = imageHolder.querySelectorAll('img');

        images.forEach(img => {
            if (img.src.includes('no-image.jpg')) {
                // Toggle image source based on current color state
                if (isRedColor) {
                    img.src = 'images/blue-no-image.jpg';
                } else {
                    img.src = 'images/no-image.jpg';
                }
            }
        });
    }

    // Update the current color state
    isRedColor = !isRedColor;
}

// Add event listener to radio buttons
document.querySelectorAll('input[name="deal-type"]').forEach(function(radio) {
    radio.addEventListener('change', toggleColors);
});



//  card live update
let totalGamePrice = 0;
    const dealTitrInput = document.getElementById('deal-titr');
    const dealDescriptionInput = document.getElementById('deal-description');
    const dealTypeSell = document.getElementById('deal-type-sell');
    const dealTypeBuy = document.getElementById('deal-type-buy');
    const dealForeign = document.getElementById('deal-foreign');
    const dealDomestic = document.getElementById('deal-domestic');
    const fileInput = document.getElementById('file-input');
    const imageHolder = document.querySelector('.image-holder');
    const dealPriceCheck = document.getElementById('deal-agreement');
    const dealQuantity = document.getElementById('deal-quantity-set')



    function updateCard() {
        // Update text fields
        document.getElementById('deal-titr-set').textContent = dealTitrInput.value || 'بدون تیتر';
        document.getElementById('deal-description-set').textContent = dealDescriptionInput.value || 'بدون توضیحات';
        
        // Update type and manufacturing
        const dealTypeSet = document.getElementById('deal-type-set');
        const dealManufacturingSet = document.getElementById('deal-manufacturing-set');
        
        const dealPrice = document.getElementById('deal-price-set');
        const toman = document.getElementById('toman')
        dealQuantity.textContent = boardgameCount;
        if (dealTypeSell.checked) {
            dealTypeSet.textContent = 'فروش';
        } else if (dealTypeBuy.checked) {
            dealTypeSet.textContent = 'خرید';
        }

        if (dealPriceCheck.checked) {
            toman.textContent = ' توافقی'
            dealPrice.textContent = ''
        }else{
            toman.textContent = ' تومان '
            var temp = totalGamePrice;
            temp = temp.toString();
            
            temp = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            dealPrice.textContent = temp
        }

        if (dealForeign.checked) {
            dealManufacturingSet.textContent = 'خارجی';
        } else if (dealDomestic.checked) {
            dealManufacturingSet.textContent = 'داخلی';
        }
    }

    function updateImages() {
        // Clear existing images
        const existingImages = imageHolder.querySelectorAll('img:not(.active)');
        existingImages.forEach(img => img.remove());

        const files = fileInput.files;
        if (files.length > 0) {
            Array.from(files).forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    if (index === 0) {
                        img.classList.add('active');
                    }
                    imageHolder.appendChild(img);
                };
                reader.readAsDataURL(file);
            });
        } else {
            // Reset to default image if no files are uploaded
            imageHolder.innerHTML = `
                <img src="images/no-image.jpg" alt="" class="active">
                <img src="images/deals/1.webp" alt="">
            `;
        }
    }

    // Attach event listeners
    dealTitrInput.addEventListener('input', updateCard);
    dealDescriptionInput.addEventListener('input', updateCard);
    fileInput.addEventListener('change', updateImages);
    document.querySelectorAll('input[name="deal-type"]').forEach(input => input.addEventListener('change', updateCard));
    document.querySelectorAll('input[name="deal-manufacturing"]').forEach(input => input.addEventListener('change', updateCard));
    document.querySelectorAll('input[name="deal-price-method"]').forEach(input => input.addEventListener('change', updateCard));
    document.querySelectorAll('input[class="validate-number"]').forEach(input => input.addEventListener('change', updateCard));


    // Initial call to populate card with existing values
    updateCard();



// h2 tag hide for image preview container 
document.addEventListener("DOMContentLoaded", function() {
    const imagePreviewDiv = document.getElementById("image-preview");
    const h2Tag = imagePreviewDiv.querySelector("h2");

    function updateImagePreview() {
        if (imagePreviewDiv.querySelector("img")) {
            h2Tag.style.display = "none";
        } else {
            h2Tag.style.display = "block";
        }
    }

    // Initial check
    updateImagePreview();

    // Set up a MutationObserver to watch for changes in the imagePreviewDiv
    const observer = new MutationObserver(updateImagePreview);

    // Configure the observer to watch for child list changes
    observer.observe(imagePreviewDiv, { childList: true, subtree: true });
});

// scrolling text
document.addEventListener('DOMContentLoaded', function() {
    const textElements = document.querySelectorAll('.card .titlebox p');
    textElements.forEach(textElement => {
      if (textElement.scrollWidth > textElement.clientWidth) {
        textElement.classList.add('scrolling');
      } else {
        textElement.classList.remove('scrolling');
      }
    });
  });


  // comma-add-string
  document.addEventListener("DOMContentLoaded", function() {
    var elements = document.querySelectorAll('.comma-add-string');
    
    elements.forEach(function(element) {
        var number = element.textContent.trim();
        var formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        element.textContent = formattedNumber;
    });
});

// add price sum


function sumGamePrices() {
    totalGamePrice = 0; // Reset the total price
    let boardgameCount = 1; // Start with the first game price

    while (document.getElementById(`game_price${boardgameCount}`)) {
        let priceValue = document.getElementById(`game_price${boardgameCount}`).value;
        priceValue = priceValue.replace(/,/g, ''); // Remove commas
        totalGamePrice += parseFloat(priceValue) || 0; // Add to total, handling NaN cases
        boardgameCount++;
    }
    console.log(boardgameCount-1)
    updateCard()
}

function addInputListeners() {
    let boardgameCount = 1; // Start with the first game price

    while (document.getElementById(`game_price${boardgameCount}`)) {
        let inputElement = document.getElementById(`game_price${boardgameCount}`);
        inputElement.addEventListener('input', sumGamePrices);
        boardgameCount++;
    }
}

// Initially call the function to set up the event listeners
addInputListeners();



// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded');
});