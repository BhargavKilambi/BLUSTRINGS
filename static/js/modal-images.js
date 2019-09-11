// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var images = ["myImg","myImg1","myImg2","myImg3","myImg4","myImg5","myImg6","myImg7"]
images.forEach(myFunction);

function myFunction(item){
	var img = document.getElementById(item);
	var modalImg = document.getElementById("img01");
	img.onclick = function(){
	  modal.style.display = "block";
	  modalImg.src = this.src;
	  captionText.innerHTML = this.alt;
	}

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	  modal.style.display = "none";
	}
}