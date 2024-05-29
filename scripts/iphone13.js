document.addEventListener('DOMContentLoaded', function () {
    const iphoneNav = document.querySelector('.iphone-nav');
    const subHover = document.querySelector('.sub-hover');
    const bannerArea = document.querySelector('.banner-area');
    const body = document.body;
    
    iphoneNav.addEventListener('mouseenter', function () {
        subHover.style.display = 'block';
        // bannerArea.style.display = 'none';
        body.classList.add('no-scroll'); // Disable body scroll
    });

    iphoneNav.addEventListener('mouseleave', function () {
        // Use a timeout to check if the mouse enters the submenu
        setTimeout(function () {
            if (!subHover.matches(':hover')) {
                subHover.style.display = 'none';
                // bannerArea.style.display = 'block';
                body.classList.remove('no-scroll'); // Enable body scroll
            }
        }, 100);
    });

    subHover.addEventListener('mouseleave', function () {
        subHover.style.display = 'none';
        bannerArea.style.display = 'block';
        body.classList.remove('no-scroll'); // Enable body scroll
    });

    subHover.addEventListener('mouseenter', function () {
        subHover.style.display = 'block';
        bannerArea.style.display = 'none';
        body.classList.add('no-scroll'); // Disable body scroll
    });
});

// product dispaly
document.addEventListener('DOMContentLoaded', () => {
    const imagePaths = {
        'product-image-1': {
            blue: './images/iPhone13/iphone13pro_blue.webp',
            green: './images/iPhone13/iphone13pro_green.webp',
            white: './images/iPhone13/iphone13pro_white.webp',
            black: './images/iPhone13/iphone13pro_black.webp',
            
        },
        'product-image-2': {
            pink: '/images/iPhone13/iphone13_pink.webp',
            red: './images/iPhone13/iphone13_red.webp',
            green: './images/iPhone13/iphone13_green.webp',
            white: './images/iPhone13/iphone13_white.webp',
            black: './images/iPhone13/iphone13_black.webp',
        },

        'product-image-3': {
            blue: './images/iPhone13/iphone13pro_blue.webp',
            green: './images/iPhone13/iphone13pro_green.webp',
            white: './images/iPhone13/iphone13pro_white.webp',
            black: './images/iPhone13/iphone13pro_black.webp',
            
        },
        'product-image-4': {
            pink: '/images/iPhone13/iphone13_pink.webp',
            red: './images/iPhone13/iphone13_red.webp',
            green: './images/iPhone13/iphone13_green.webp',
            beige: './images/iPhone13/iphone13_white.webp',
            black: './images/iPhone13/iphone13_black.webp',
        },
    };

    document.querySelectorAll('.color').forEach(color => {
        color.addEventListener('click', function() {
            const imageId = this.getAttribute('data-image');
            const colorName = this.getAttribute('data-color');
            const productItem = this.closest('.product-item');

            // Remove 'selected' class from all colors within the same product item
            productItem.querySelectorAll('.color').forEach(c => c.classList.remove('selected'));

            // Add 'selected' class to the clicked color
            this.classList.add('selected');

            // Change the image source based on the clicked color
            const productImage = document.getElementById(imageId);
            if (productImage) {
                productImage.src = imagePaths[imageId][colorName];
            }
        });
    });
});

//Price range slider in product page
$(function() {
    $("#price-range").slider({
      range: true,
      min: 0,
      max: 10000, // Increased max to cover example prices
      values: [0, 10000],
      slide: function(event, ui) {
        $("#min-price").val("QAR " + ui.values[0]);
        $("#max-price").val("QAR " + ui.values[1]);

        filterProducts(ui.values[0], ui.values[1]);
      }
    });

    $("#min-price").val("QAR " + $("#price-range").slider("values", 0));
    $("#max-price").val("QAR " + $("#price-range").slider("values", 1));

    function filterPrice(minPrice, maxPrice) {
      $(".product-item").each(function() {
        var priceText = $(this).find("p").text();
        var price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
        if (price >= minPrice && price <= maxPrice) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }

    // Initial filter
    filterPrice($("#price-range").slider("values", 0), $("#price-range").slider("values", 1));
  });


//   + - icon for filter show/hide
document.addEventListener('DOMContentLoaded', function() {
    // Get all filter heads
    var filterHeads = document.querySelectorAll('.filter-head');

    // Add click event listener to each filter head
    filterHeads.forEach(function(filterHead) {
        filterHead.addEventListener('click', function() {
            // Toggle the visibility of the next sibling element
            var content = this.nextElementSibling;
            content.classList.toggle('hidden');

            // Toggle the icon
            var icon = this.querySelector('.toggle-icon');
            icon.textContent = (icon.textContent === '+') ? '-' : '+';
        });
    });
});




// Product type and color filter in product page

document.addEventListener('DOMContentLoaded', () => {
    const productTypeCheckboxes = document.querySelectorAll('.product-filter');
    const colorCheckboxes = document.querySelectorAll('.color-filter');
    const productItems = document.querySelectorAll('.product-item');

    productTypeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            filterProducts();
        });
    });

    colorCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            filterProducts();
        });
    });

    function filterProducts() {
        const selectedProductTypes = Array.from(productTypeCheckboxes)
                                          .filter(checkbox => checkbox.checked)
                                          .map(checkbox => checkbox.value);

        const selectedColors = Array.from(colorCheckboxes)
                                    .filter(checkbox => checkbox.checked)
                                    .map(checkbox => checkbox.nextSibling.textContent.trim().toLowerCase());

        productItems.forEach(item => {
            const productType = item.getAttribute('data-type');
            const colorElements = item.querySelectorAll('.color');
            let matchesColor = false;

            colorElements.forEach(colorElement => {
                const colorClass = colorElement.classList[1];
                const colorName = colorClass.split(' ')[0]; // Get the color name
                if (selectedColors.includes(colorName)) {
                    matchesColor = true;
                }
            });

            const matchesType = selectedProductTypes.length === 0 || selectedProductTypes.includes(productType);
            const matchesColorFilter = selectedColors.length === 0 || matchesColor;

            if (matchesType && matchesColorFilter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        if (selectedProductTypes.length === 0 && selectedColors.length === 0) {
            productItems.forEach(item => item.classList.remove('hidden'));
        }
    }

    filterProducts(); // Initial call to set the initial state
});

document.addEventListener('DOMContentLoaded', function() {
    var sortDropdown = document.getElementById('sort-dropdown');
    var productList = document.querySelector('.product');
    var originalOrder = Array.from(productList.querySelectorAll('.product-item'));

    // Add event listener for dropdown change
    sortDropdown.addEventListener('change', function() {
        var selectedValue = this.value;
        if (selectedValue === 'position') {
            // Reset the order to the original position
            originalOrder.forEach(function(item) {
                productList.appendChild(item);
            });
            return;
        }

        // Get all product items
        var productItems = Array.from(productList.querySelectorAll('.product-item'));

        // Sort the product items based on the selected value
        productItems.sort(function(a, b) {
            var aValue, bValue;

            if (selectedValue === 'name') {
                aValue = a.querySelector('h5').textContent.toLowerCase();
                bValue = b.querySelector('h5').textContent.toLowerCase();
            } else if (selectedValue === 'price') {
                // Extract the price values and convert them to numbers for comparison
                aValue = parseFloat(a.querySelector('p').textContent.replace(/[^0-9.-]+/g,""));
                bValue = parseFloat(b.querySelector('p').textContent.replace(/[^0-9.-]+/g,""));
            }

            // Compare the values
            if (selectedValue === 'name') {
                return aValue.localeCompare(bValue);
            } else if (selectedValue === 'price') {
                return aValue - bValue;
            }
        });

        // Re-append sorted product items to the product container
        productItems.forEach(function(item) {
            productList.appendChild(item);
        });
    });
});
