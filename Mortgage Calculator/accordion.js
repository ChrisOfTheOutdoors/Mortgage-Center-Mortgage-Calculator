// Get all accordion buttons
var accBtns = document.getElementsByClassName("mAccordionBtn");

// Loop through all accordion buttons
for (var i = 0; i < accBtns.length; i++) {
  // Get the sibling accordion content element
  var content = accBtns[i].nextElementSibling;

  // Hide the content by default
  content.style.display = "none";

  // Add event listener to toggle the active class and display the content
  accBtns[i].addEventListener("click", function() {
    // Toggle the active class to highlight the button
    this.classList.toggle("active");

    // Get the sibling accordion content element
    var content = this.nextElementSibling;

    // If the content is already displayed, hide it. Otherwise, display it.
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
