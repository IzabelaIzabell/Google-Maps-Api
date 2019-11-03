// Tworze zmienna mapy
    var mapurl = 'https://maps.googleapis.com/maps/api/js';
    var apiKey = 'AIzaSyDTMr97qDzL7NIDcafHbA8ijDW3elYl6QI';
    function initMap() {
       var options = {
           zoom:3,
           center: {lat:-33,lng:-71.0589}
       }
    // //   nowa mapa
       var map = new google.maps.Map(document.getElementById('map'), options);
      $.ajax({
          url: "http://localhost:3000/places"
         
        }).done(function (places) {
          console.log(places)
        //   places.forEach(function (place) {
        //     console.log(place);
        //     new google.maps.Marker({
        //       position: {LatLng:place.lat,LatLngLiteral:place.lon},
        //       map: map,
        //       icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
           
        //   });
        
        // })
       
        for (i = 0; i < places.length; i++) {
         var marker = new google.maps.Marker({
            position: new google.maps.LatLng(places[i].lat, places[i].lot),
            map: map,
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
          });

         var infowindow = new google.maps.InfoWindow();
         var content = (`${places[i].name} <br> ${places[i].priority}`);
         console.log(places[i].description);
         google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
            return function() {
                infowindow.setContent(content);
                infowindow.open(map,marker);
            };
        })(marker,content,infowindow));  
       
        }
  });
}
$(function () {
var $nameP = $('#name');
console.log($nameP);
var $latP = $("#lat");
var $list = $("#list")
var $lotP = $('#lot')
var $descP = $('#description');
var $priorP = $("#priority");
var $form= $('.form');
var $btn = $(".form-button");
var apiUrl =  "http://localhost:3000/places";
   $(document).ready(function(){
    // $("#myBtn").click(function(){
    //   $("#myModal").modal({backdrop: true});
    // });
    // $("#myBtn2").click(function(){
    //   $("#myModal2").modal({backdrop: false});
    // });
    $("#myBtn3").click(function(){
      $("#myModal3").modal({backdrop: "static"});
    });
  });
 function load() {
		$.ajax({
			url: apiUrl
		}).done(function (places) {
			insert(places)
		}).fail(function (error) {
			console.log(error)
		})
	}
	function insert(places) {
       $list.empty()
		places.forEach(function (places) {
			var $li =
                $(`<li class ='addedPlaces' data-id="${places.id}">
               <div> <p id="name"> ${places.name}</p></div>
                <p> ${places.description}</p>
                <p>Priotity  ${places.priority}</p>
		  		   
		        </li>`);

			$list.append($li);
		})
	}
  //  Dodawanie lokalizacji 
  function addPlace(name,lat,lot,description,priority) {
		$.ajax({
			url: apiUrl,
			method: 'POST',
			data: {
        name: name,
        lat: lat,
        lot: lot,
        description: description, 
        priority: priority
			}
		}).done(function (result) {
			console.log( result)
			load();
		}).fail(function (error) {
			console.log(error)
		})
    }

    $btn.on('click', function (event) {
    // event.preventDefault();
    console.log("Dziala");
    console.log($nameP);
        var valName = $nameP.val();
     
        var  valLat = $latP.val();
        var valLot = $lotP.val();
        var valDesc = $descP.val();
        var valPrio = $priorP.val();
        console.log(valLat );
    console.log(valPrio);
		addPlace(valName, valLat, valLot, valDesc, valPrio)
  })
  let $btnShow = $("button#toggle");
  let $section = $("section .first-part")
  $btnShow.on("click", function(){
    
    if ($section.hasClass("show")) {
      $section.removeClass("show")
      $section.addClass("hide")

      $btnShow.text("Show left panel");

    } else{
    $section.removeClass("hide")
    $section.addClass("show")
    $btnShow.text("Hide left panel");
    }
  });
  let $showList = $("btn");
  let $listAddedPlaces= $("ul#list");
  $showList.on('click',function(){
    $listAddedPlaces.toggleClass("hide");
  })
	load();
});




   
















