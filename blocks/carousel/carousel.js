export default function decorate(block) {

    var sliderDiv = document.querySelector('.slider-left-container');
    var carouselDiv = document.querySelector('.carousel-container');

    // Create a new parent div
    var parentDiv = document.createElement('div');
    parentDiv.classList.add('parent-container'); // Optional: add a class to the parent div

    // Append the selected divs to the parent div
    if (sliderDiv && carouselDiv) {
        parentDiv.appendChild(sliderDiv.cloneNode(true));
        parentDiv.appendChild(carouselDiv.cloneNode(true));

        // Replace the existing divs with the parent div
        sliderDiv.parentNode.replaceChild(parentDiv, sliderDiv);
        carouselDiv.parentNode.removeChild(carouselDiv); // Remove the carousel div from its original location
    } else {
        console.error("One or both of the divs not found.");
    }



    $('.slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow:'<button type="button" class="slick-prev"></button>',
        nextArrow:'<button type="button" class="slick-next"></button>',
    });

    var filtered = false;

    $('.js-filter').on('click', function () {
        if (filtered === false) {
            $('.filtering').slick('slickFilter', ':even');
            $(this).text('Unfilter Slides');
            filtered = true;
        } else {
            $('.filtering').slick('slickUnfilter');
            $(this).text('Filter Slides');
            filtered = false;
        }
    });







}