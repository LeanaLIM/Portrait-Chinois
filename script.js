// DOM Générateur d'analogies + animation sur img + triangles + liens pour idSuivant //

document.addEventListener("DOMContentLoaded", function () {
	initAnim();
	AOS.init();
	var container = document.getElementById("analogies");

	for (var i = 0; i < data.length; i++) {
		var idSuivant="formulaire"
		if (i<data.length-1) {
			idSuivant=data[i+1].id;
		}
		container.innerHTML += `<section data-aos="fade-in data-aos-duration="1000"  id="`
		+ data[i].id 
		+ `" ${i%2===0?'class="left"':''}><article class="bloc"><h2>Si j\'étais ` 
		+ data[i].analogies 
		+ ', je serai... ' + '<br>' + data[i].valeurAnalogies 
		+ '</h2><p>' 
		+ data[i].text + '</p><div class="triangle_container"><a href="#' 
		+ idSuivant 
		+ '"><img class="triangle" src="img/triangle.png" alt=""></a></div></article><div data-aos="fade-down" class="img-desc" style="background-image:url(' 
		+ data[i].url + ')"></div>';
	}

	for (numCase = 0; numCase < analogies.length; numCase++) {}

// POPUP //
	console.log(numCase)
	var openpyoupi = document.querySelector('.pacman');
	openpyoupi.addEventListener('click', function visible(event){
		document.querySelector('.popup').classList.toggle('popupinvisible');
		document.querySelector('.popup').classList.toggle('popupvisible');
})
});

// RESIZE POUR LE FOND //

window.addEventListener("resize", function() {
	initAnim();
});

// ANIMATED BACKGROUND //

function initAnim() {
	var canvas = document.getElementById('fond');

	// init
	var maxx = window.innerWidth;
	var maxy = window.innerHeight;

	var halfx = maxx / 2;
	var halfy = maxy / 2;

	canvas.width = maxx;
	canvas.height = maxy;

	var context = canvas.getContext("2d");
	var dotCount = 200;
	var dots = [];

	// create dots
	for (var i = 0; i < dotCount; i++) {
		dots.push(new dot());
	}

	// dots animation
	function render() {
		context.fillStyle = "#000000";
		context.fillRect(0, 0, maxx, maxy);
		for (var i = 0; i < dotCount; i++) {
			dots[i].draw();
			dots[i].move();
		}
		requestAnimationFrame(render);
	}

	// dots class
	// @constructor
	function dot() {

		this.rad_x = 2 * Math.random() * halfx + 1;
		this.rad_y = 1.2 * Math.random() * halfy + 1;
		this.alpha = Math.random() * 360 + 1;
		this.speed = Math.random() * 100 < 50 ? 1 : -1;
		this.speed *= 0.1;
		this.size = Math.random() * 5 + 1;
		this.color = Math.floor(Math.random() * 256);

	}

	// drawing dot
	dot.prototype.draw = function () {

		// calc polar coord to decart
		var dx = halfx + this.rad_x * Math.cos(this.alpha / 180 * Math.PI);
		var dy = halfy + this.rad_y * Math.sin(this.alpha / 180 * Math.PI);
		// set color
		context.fillStyle = "rgb(" + this.color + "," + this.color + "," + this.color + ")";
		// draw dot
		context.fillRect(dx, dy, this.size, this.size);

	};

	// calc new position in polar coord
	dot.prototype.move = function () {

		this.alpha += this.speed;
		// change color
		if (Math.random() * 100 < 50) {
			this.color += 1;
		} else {
			this.color -= 1;
		}

	};

	// start animation
	render();

	// API //

	document.querySelector("#valider").addEventListener("click", function (e) {
		e.preventDefault();
		document.querySelector("#customAnalogie").innerHTML += `<section data-aos="fade-in data-aos-duration="1000"  id="`
		+ `" ${i%2===0?'class="left"':''}><article class="bloc"><h2>Si j\'étais ` 
		+ document.querySelector("#analogie").value
		+ ', je serai... ' + '<br>' + document.querySelector("#valeur").value
		+ '</h2><p>' 
		+ document.querySelector("#desc").value + '</p><div class="triangle_container"><a href="#' 
		+ '"><img class="triangle" src="img/triangle.png" alt=""></a></div></article><div data-aos="fade-down" class="img-desc" style="background-image:url(' 
		+ document.querySelector("#URL").value + ')"></div>';
	
		  fetch("https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=leana.lim&courriel=" + document.querySelector("#mail").value + "&message=Si j'étais " + document.querySelector("#analogie").value + ", je serais " + document.querySelector("#valeur").value + document.querySelector("#desc").value).then(function (response) {
			response.json().then(function (data) {
			  if (data.status == "success") {
				document.querySelector("#message").innerHTML = "Bien reçu! :)";
				// console.log('succès');
			  } else {
				document.querySelector("#message").innerHTML = "Oops, erreur :(";
				// console.log('error');
			  }
			})
		  })
	  });

}






