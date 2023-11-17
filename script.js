function toggleClasses() {
    // Get all buttons and items
    const buttons = document.querySelectorAll('#show-or-hide-1, #show-or-hide-2, #show-or-hide-3, #show-or-hide-4');
    const items = document.querySelectorAll('.item-1, .item-2, .item-3, .item-4');

    // Event listener for each button
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove .active and .visible from all buttons and items
            buttons.forEach(b => b.classList.remove('active'));
            items.forEach(item => item.classList.remove('visible', 'visible-mobile'));

            // Add .active to the clicked button and .visible or .visible-mobile to the corresponding item
            button.classList.add('active');
            
            // Check screen size and apply the appropriate class to the corresponding item
            if (window.matchMedia('(max-width: 520px)').matches) {
                items[index].classList.add('visible-mobile');
            } else {
                items[index].classList.add('visible');
            }
        });
    });
}

// Initial execution
toggleClasses();

// Add a listener for screen size changes
window.addEventListener('resize', toggleClasses);




// memu mobile

// $(document).ready(function () {
//     $("#menuIcon").click(function () {
//         $(".menu-mobile-janela").css("display", "block").css("transform", "translateX(0)");
//     });

//     $("#closeIcon").click(function () {
//         $(".menu-mobile-janela").css("transform", "translateX(100%)");
//         setTimeout(function () {
//             $(".menu-mobile-janela").css("display", "none");
//         }, 300);
//     });
// });



$(document).ready(function () {
    $("#menuIcon").click(function () {
        $(".menu-mobile-janela").css("display", "block").css("transform", "translateX(0)");
    });

    $("#closeIcon, .menu-mobile-janela a").click(function () {
        $(".menu-mobile-janela").css("transform", "translateX(100%)");
        setTimeout(function () {
            $(".menu-mobile-janela").css("display", "none");
        }, 300);
    });
});
