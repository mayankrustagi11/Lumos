function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setCoordinates);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function setCoordinates(position) {
  document.getElementById('longitude').innerHTML = parseFloat(position.coords.longitude.toFixed(5));
  document.getElementById('latitude').innerHTML = parseFloat(position.coords.latitude.toFixed(5));

  let search_btn =document.getElementById('search-btn');
  search_btn.innerHTML = `Search<i class="fa fa-search right"></i>`;
  search_btn.disabled = false;
}

$(document).ready(function(){
  
  $('.sidenav').sidenav();
  $(".dropdown-trigger").dropdown();
  getLocation();
      
  const form = document.getElementById('search-form');

  // Form Submit Event
  form.addEventListener('submit', e => {

    const query = document.getElementById('search-query').value;
    const longitude = document.getElementById('longitude').innerHTML;
    const latitude = document.getElementById('latitude').innerHTML;

    const data = {
      lat: latitude,
      lng: longitude,
      query: query
    };

    fetch('http://localhost:5000/explore', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(data => {
          places = data.places;

          let output = '';
          var i = 0;
          //console.log(places);

          $.each(places, (index, place) => {
            //console.log(place);

            if(i % 4 == 0) {
              output += `<div class="row">`;
            }

            output += `
              <div class="col l3 m6 s12">
                <div class="card">
                    <div class="card-content">
                        <h5 class="center">${place.venue.name ? place.venue.name : 'Unavailable'}</h5>
                        <h6><i class="fa fa-address-book left"></i>${place.venue.location.address ? place.venue.location.address : 'Unavailable'}</h6>
                        <h6><i class="fa fa-building left"></i>${place.venue.location.crossStreet ? place.venue.location.crossStreet : 'Unavailable'}</h6>
                        <h6><i class="fa fa-star left"></i>${place.venue.rating ? place.venue.rating : 'Unavailable'}</h6>
                        <h6><i class="fa fa-road left"></i>${place.venue.location.distance ? parseFloat((place.venue.location.distance / 1000).toFixed(2)) : 'Unavailable'}KMs</h6>
                        <h6><i class="fa fa-phone left"></i>${place.venue.contact.phone ? place.venue.contact.phone : 'Unavailable'}</h6>
                        <a href="/explore/from=${latitude}&${longitude}&to=${place.venue.location.lat}&${place.venue.location.lng}" class="btn btn-small indigo darken-2">Get Directions</a>
                    </div>
                </div>
              </div>  
            `;

            if((i+1) % 4 == 0) {
              output += `</div>`;
            }

            i = i + 1;

          });
          $('#results').html(output);
          //console.log(places);
        })
        .catch(err => console.log(err));

    e.preventDefault();
  });
});
