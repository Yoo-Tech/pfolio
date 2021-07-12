let i = 0; 			// Start Point
let images = []
//     {id = 0, img: "assets/images/left-image.jpg", text: "CSS"},
//     {id = 1, img: "assets/images/portfolio-01.jpg", text: "AF"},
//     {id = 2, img: "assets/images/portfolio-02.jpg", text: "JS"},
//     {id = 3, img: "assets/images/right-image.jpg", text: "HTML"}];	// Images Array
let time = 3000;	// Time Between Switch
// let ourText = document.querySelector(".ourText")
	 

// images[3] = "http://lorempixel.com/400/200/people";
images[0] = "assets/images/left-image.jpg";
images[1] = "assets/images/portfolio-03.jpg";
images[2] = "assets/images/portfolio-01.jpg";
images[3] = "assets/images/left-image.jpg";
// Change Image
function changeImg(){
    const item = images[i]
    document.slide.src = item;
   
    
	// slide.src = images.img[i];
    // ourText.textContent = images.text[i]

	// Check If Index Is Under Max
	if(i < images.length - 1){
	  // Add 1 to Index
	  i++; 
	} else { 
		// Reset Back To O
		i = 0;
	}

	// Run function every x seconds
	setTimeout("changeImg()", time);
}

// Run function when page loads
window.onload=changeImg;


// contactform 

let submit = document.getElementById("submit") 
let fullName = document.getElementById("name")
let email = document.getElementById("email")
let subject = document.getElementById("subject")
let message = document.getElementById("message")
let contactForm = document.querySelector(".contact-form")


contactForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let formData ={
        fullName: fullName.value,
        email: email.value,
        subject: subject.value,
        message: message.value

    }
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert("Email Sent")
            fullName.value ="";
            email.value ="";
            subject.value ="";
            message.value ="";
        } else{
            alert("Email not sent")
        }
    }
    xhr.send(JSON.stringify(formData))
    
})