
// Funciton to make the navbar transition when it gets past a certain threshold
window.onscroll = function () {
    const navBar = document.querySelector(".navbar-transition");


    // Set the scroll threshold at which the navbar changes color
    const scrollThreshold = 500; 

    // Check if the vertical scroll position is greater than the threshold
    if (window.scrollY > scrollThreshold) {
        // Add the 'bg-dark' class to make the navbar dark
        navBar.classList.add("bg-dark");
    } else {
        // Remove the 'bg-dark' class to revert the navbar color
        navBar.classList.remove("bg-dark");
    }
};
