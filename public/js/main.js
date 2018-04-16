function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setCoordinates);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function setCoordinates(position) {
  document.getElementById('longitude').innerHTML = position.coords.longitude;
  document.getElementById('latitude').innerHTML = position.coords.latitude;
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
          .then(places => {
            let output = '';
            //console.log(places);

            $.each(places, (index, place) => {
              //console.log(place);


              output += `
              <div class="col s3">
                <div class="card">
                    <div class="card-content">
                        <h4>location-name</h4>
                        <h4></h4>
                        <p>location-city location-state</p>
                        <h5>location-distance</h5>
                    </div>
                </div>
              </div>
              `;

            });
            $('#results').html(output);
            //console.log(places);
          })
          .catch(err => console.log(err));

      e.preventDefault();
  });
});