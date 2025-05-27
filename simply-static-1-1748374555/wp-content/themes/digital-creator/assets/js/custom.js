let digital_creator_submenu_button = document.getElementsByClassName("wp-block-navigation__submenu-icon wp-block-navigation-submenu__toggle");

if ( digital_creator_submenu_button ) {
    Array.from(digital_creator_submenu_button).forEach(element => {
        element.addEventListener("click", function () {
            this.classList.toggle("icon-up");
            this.nextSibling.classList.toggle("open-submenu");
        });
    });
}

/****************************************************************************/
