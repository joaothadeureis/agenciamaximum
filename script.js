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

$(document).ready(function () {
    var menuMobile = $(".menu-mobile-janela");
    var menuIcon = $("#menuIcon");

    menuIcon.click(function (event) {
        event.stopPropagation(); // Evita que o clique se propague para o documento
        menuMobile.css("display", "block").css("transform", "translateX(0)");
    });

    $(document).click(function (event) {
        if (!$(event.target).closest(menuMobile).length && !$(event.target).is(menuIcon)) {
            // Fecha o menu se o clique ocorrer fora do menu ou além dos 80vw
            menuMobile.css("transform", "translateX(100%)");
            setTimeout(function () {
                menuMobile.css("display", "none");
            }, 300);
        }
    });

    $("#closeIcon, .menu-mobile-janela a").click(function () {
        menuMobile.css("transform", "translateX(100%)");
        setTimeout(function () {
            menuMobile.css("display", "none");
        }, 300);
    });
});


// brands carrossel


