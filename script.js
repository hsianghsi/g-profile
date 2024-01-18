mapboxgl.accessToken = 'pk.eyJ1IjoiYm9zc2Jvc3NsZXUiLCJhIjoiY2trcHU5N2EyMGJwdDJvbnRvc2g2djNubSJ9.MH9jCElgj_r1kHN305ijZw';

var bounds = [
  [-74.54, 40.40], // southwest coordinates
  [-73.39, 41.08] // northeast coordinates
];

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/bossbossleu/ckoiwcrjy19b717o4avyd2e17', // style URL
  center: [-73.949, 40.738], // starting position [lng, lat]
  zoom: 10.2,
  maxZoom: 14.1,
  minZoom: 10.2,
  maxBounds: bounds,
});

map.on('mousemove', function (e) {
  if (!map.loaded()) return;
  map.getCanvas().style.cursor = ''
  var features = map.queryRenderedFeatures(e.point, { layers: ['g-profiles-master', 'g-profiles-master-2', 'g-profiles-master-3', 'g-profiles-brooklyn', 'g-profiles-queens'] })
  if (!features.length) return;
  map.getCanvas().style.cursor = 'pointer'
});

map.on('click', function (e) {
  map.flyTo({
    center: [e.lngLat.lng, e.lngLat.lat]
  });
  // If the user clicked on one of your markers, get its information.
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['g-profiles-master', 'g-profiles-master-2', 'g-profiles-master-3', 'g-profiles-brooklyn', 'g-profiles-queens'] // replace with your layer name
  });
  if (!features.length) {
    return;
  }
  var feature = features[0];
  var imgarr = JSON.parse(feature.properties.images);
  var popup = new mapboxgl.Popup({ center: [0, 0] })
    .setMaxWidth("100%")
    .setLngLat(e.lngLat)
    .setHTML(
      `<div class="popup-main">
  <div class="popup-left">
    <style>
* {box-sizing: border-box}

/* Slideshow container */
.slideshow-container {
width: 900px;
height: 601px;
position: absolute;
margin: 0px;
body {font-family: Arial, sans-serif; margin:0}
}
.mySlides {display: none}
.img {vertical-align: middle;}

/* Next & previous buttons */
.prev, .next {
cursor: pointer;
position: absolute;
top: 50%;
width: auto;
padding: 16px;
margin-top: -22px;
color: white;
opacity: 0.6;
font-weight: bold;
font-size: 18px;
transition: 0.5s ease;
border-radius: 0 0px 0px 0;
user-select: none;
}

/* Position the "next button" to the right */
.next {
right: 0;
border-radius: 0px 0 0 0px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
background-color: rgba(0,0,0,0.2);

}

.numbertext {
color: white;
font-size: 11px;
padding: 8px 10px;
position: absolute;
top: 0;
}

/* Fading animation */
.fade {
-webkit-animation-name: fade;
-webkit-animation-duration: 1s;
animation-name: fade;
animation-duration: 1s;
}

@-webkit-keyframes fade {
from {opacity: .4} 
to {opacity: 1}
}

@keyframes fade {
from {opacity: .4} 
to {opacity: 1}
}

    </style>
  </head>

<body>
<div class="slideshow-container">

<div class="mySlides fade" style="display: block;">
<div class="numbertext">1 / 2</div>
<img src="${imgarr[0]}" style="width:100%">
</div>

<div class="mySlides fade">
<div class="numbertext">2 / 2</div>
<img src="${imgarr[1]}" style="width:100%">
</div>

<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
<a class="next" onclick="plusSlides(1)">&#10095;</a>

</div>
</body>
  </div>

  <div class="popup-right">
    <h3>${feature.properties.title}</h3>
    <p>
      ${feature.properties.description}
    </p>
  </div>
  
</div>
                    `
    )
    .addTo(map);
});

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";

};
