document.getElementById('scrollButton').addEventListener('click', () => {
    const targetSection = document.getElementById('sect');
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });

// Vanilla JS Carousel Logic
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevButton = document.querySelector('.carousel-arrow.left');
  const nextButton = document.querySelector('.carousel-arrow.right');
  const slideWidth = slides[0].getBoundingClientRect().width;

  // Arrange slides side by side
  slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
  });

  let currentIndex = 0;

  const moveToSlide = (track, currentIndex) => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  // Event listeners
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      moveToSlide(track, currentIndex);
    } else {
      currentIndex = slides.length - 1; // Loop back to last slide
      moveToSlide(track, currentIndex);
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex += 1;
      moveToSlide(track, currentIndex);
    } else {
      currentIndex = 0; // Loop back to first slide
      moveToSlide(track, currentIndex);
    }
  });
(function ($) {
    'use strict';

    // Sticky Menu
    $(window).scroll(function () {
        if ($('.navigation').offset().top > 100) {
            $('.navigation').addClass('nav-bg');
        } else {
            $('.navigation').removeClass('nav-bg');
        }
    });

    // Background-images
    $('[data-background]').each(function () {
        $(this).css({
            'background-image': 'url(' + $(this).data('background') + ')'
        });
    });

    // background color
    $('[data-color]').each(function () {
        $(this).css({
            'background-color': $(this).data('color')
        });
    });

    // progress bar
    $('[data-progress]').each(function () {
        $(this).css({
            'bottom': $(this).data('progress')
        });
    });


    /* ########################################### hero parallax ############################################## */
    window.onload = function () {

        var parallaxBox = document.getElementById('parallax');
        var
            /* c1left = document.getElementById('l1').offsetLeft,
                       c1top = document.getElementById('l1').offsetTop, */
            c2left = document.getElementById('l2').offsetLeft,
            c2top = document.getElementById('l2').offsetTop,
            c3left = document.getElementById('l3').offsetLeft,
            c3top = document.getElementById('l3').offsetTop,
            c4left = document.getElementById('l4').offsetLeft,
            c4top = document.getElementById('l4').offsetTop,
            c5left = document.getElementById('l5').offsetLeft,
            c5top = document.getElementById('l5').offsetTop,
            c6left = document.getElementById('l6').offsetLeft,
            c6top = document.getElementById('l6').offsetTop,
            c7left = document.getElementById('l7').offsetLeft,
            c7top = document.getElementById('l7').offsetTop,
            c8left = document.getElementById('l8').offsetLeft,
            c8top = document.getElementById('l8').offsetTop,
            c9left = document.getElementById('l9').offsetLeft,
            c9top = document.getElementById('l9').offsetTop;

        parallaxBox.onmousemove = function (event) {
            event = event || window.event;
            var x = event.clientX - parallaxBox.offsetLeft,
                y = event.clientY - parallaxBox.offsetTop;

            /*  mouseParallax('l1', c1left, c1top, x, y, 5); */
            mouseParallax('l2', c2left, c2top, x, y, 25);
            mouseParallax('l3', c3left, c3top, x, y, 20);
            mouseParallax('l4', c4left, c4top, x, y, 35);
            mouseParallax('l5', c5left, c5top, x, y, 30);
            mouseParallax('l6', c6left, c6top, x, y, 45);
            mouseParallax('l7', c7left, c7top, x, y, 30);
            mouseParallax('l8', c8left, c8top, x, y, 25);
            mouseParallax('l9', c9left, c9top, x, y, 40);
        };

    };

    function mouseParallax(id, left, top, mouseX, mouseY, speed) {
        var obj = document.getElementById(id);
        var parentObj = obj.parentNode,
            containerWidth = parseInt(parentObj.offsetWidth),
            containerHeight = parseInt(parentObj.offsetHeight);
        obj.style.left = left - (((mouseX - (parseInt(obj.offsetWidth) / 2 + left)) / containerWidth) * speed) + 'px';
        obj.style.top = top - (((mouseY - (parseInt(obj.offsetHeight) / 2 + top)) / containerHeight) * speed) + 'px';
    }
    /* ########################################### /hero parallax ############################################## */

    // Shuffle js filter and masonry
    var Shuffle = window.Shuffle;
    var jQuery = window.jQuery;

    var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
        itemSelector: '.shuffle-item',
        buffer: 1
    });

    jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
        var input = evt.currentTarget;
        if (input.checked) {
            myShuffle.filter(input.value);
        }
    });

})(jQuery);


document.querySelectorAll('#sectionTabs .nav-link').forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-bs-target');
        const targetElement = document.querySelector(targetId);
        
        // Smooth scroll to section
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Update active tab
        document.querySelectorAll('#sectionTabs .nav-link').forEach(t => {
            t.classList.remove('active');
        });
        this.classList.add('active');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('projectCarousel');
    const projects = document.querySelectorAll('.featured-project');
    const carouselItems = document.querySelectorAll('.carousel-item');

    // Function to update active project
    function updateActiveProject(projectId) {
        // Hide all projects
        projects.forEach(project => {
            project.classList.remove('active');
        });
        
        // Show selected project
        const activeProject = document.querySelector(`.featured-project[data-project="${projectId}"]`);
        if (activeProject) {
            activeProject.classList.add('active');
        }
    }

    // Handle carousel slide event
    carousel.addEventListener('slide.bs.carousel', function(event) {
        const projectId = event.relatedTarget.dataset.project;
        updateActiveProject(projectId);
    });

    // Make carousel items clickable
    carouselItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectId = this.dataset.project;
            updateActiveProject(projectId);
            
            // Update carousel to show clicked item
            const carousel = bootstrap.Carousel.getInstance(document.getElementById('projectCarousel'));
            carousel.to(Array.from(carouselItems).indexOf(this));
        });
    });

    // Handle image loading
    document.querySelectorAll('.carousel-image').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loading-image');
        });
    });
});
