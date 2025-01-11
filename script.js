const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];
  const selectMovieEl = document.getElementById("selectMovie");
  
  const allSeatCont = document.querySelectorAll("#seatCont .seat");
  console.log(allSeatCont)
  
  const selectedSeatsHolderEl = document.getElementById("selectedSeatsHolder");
  
  const moviePriceEl = document.getElementById("moviePrice");
  
  const cancelBtnEL = document.getElementById("cancelBtn");
  
  const proceedBtnEl = document.getElementById("proceedBtn");
  
  moviesList.forEach((movie) => {
    const optionEl = document.createElement("option");
    optionEl.innerHTML = `${movie.movieName} $${movie.price}`;
    selectMovieEl.appendChild(optionEl);
  });
  
  let moviePrice = 7;
  let currentMovieName = `Tom and Jerry 2021`;
  
  selectMovieEl.addEventListener("input", (e) => {
    let movieName = e.target.value.split("");
    let dollarIndex = movieName.indexOf("$");
    let movie = movieName.splice(0, dollarIndex - 1).join("");
    currentMovieName = movie;
    moviePrice = JSON.parse(movieName.splice(2, dollarIndex).join(""));
  
    updatMovieName(movie, moviePrice);
    updatePrice(moviePrice, takenSeats.length);
  });
  //
  let initialSeatValue = 0;
  allSeatCont.forEach((seat) => {
    const attr = document.createAttribute("data-seatid");
    attr.value = ++initialSeatValue;
    seat.setAttributeNode(attr);
  });
  
  let seatContEl = document.querySelectorAll("#seatCont .seat:not(.occupied)");
  // console.log(seatContEl);
  let takenSeats = [];
  
  seatContEl.forEach((seat) => {
    seat.addEventListener("click", (e) => {
      let isSelected = seat.classList.contains("selected");
  
      let seatId = JSON.parse(seat.dataset.seatid);
  
      if (!isSelected) {
        seat.classList.add("selected");
        takenSeats.push(seatId);
        takenSeats = [...new Set(takenSeats)];
      } else if (isSelected) {
        seat.classList.remove("selected");
  
        takenSeats = takenSeats.filter((seat) => {
          // console.log(seat,seatId)
          if (seat !== seatId) {
            return seat;
          }
        });
      }
      updateSeats();
      updatePrice(moviePrice, takenSeats.length);
    },{ once: true });
  });
  
  function updateSeats() {
    selectedSeatsHolderEl.innerHTML = ``;
  
    takenSeats.forEach((seat) => {
      const seatHolder = document.createElement("div");
      seatHolder.classList.add("selectedSeat");
      selectedSeatsHolderEl.appendChild(seatHolder);
  
      seatHolder.innerHTML = seat;
    });
  
    if (!takenSeats.length) {
      const spanEl = document.createElement("span");
      spanEl.classList.add("noSelected");
      spanEl.innerHTML = `NO SEAT SELECTED`;
      selectedSeatsHolderEl.appendChild(spanEl);
    }
  
    seatCount();
  }
  
  function seatCount() {
    const numberOfSeatEl = document.getElementById("numberOfSeat");
    numberOfSeatEl.innerHTML = takenSeats.length;
  }
  
  function updatMovieName(movieName, price) {
    const movieNameEl = document.getElementById("movieName");
    const moviePriceEl = document.getElementById("moviePrice");
    movieNameEl.innerHTML = movieName;
    moviePriceEl.innerHTML = `$ ${price}`;
    
  }
  
  function updatePrice(price, seats) {
    const totalPriceEl = document.getElementById("totalPrice");
    let total = seats * price;
    totalPriceEl.innerHTML = `$ ${total}`;
  }
  
  cancelBtn.addEventListener("click", (e) => {
    cancelSeats();
  });
  
  function cancelSeats() {
    takenSeats = [];
    seatContEl.forEach((seat) => {
      seat.classList.remove("selected");
    });
    updatePrice(0, 0);
    updateSeats();
  }
  
  proceedBtnEl.addEventListener("click", (e) => {
    if (takenSeats.length) {
      alert("Yayy! Your Seats has been booked");
      uncancelSeats();
    } else {
      alert("Oops no seat Selected");
    }
  });
  
  function uncancelSeats() {
    takenSeats = [];
    console.log(seatContEl);
    seatContEl.forEach((seat) => {
      if(seat.classList.contains("selected")){
        console.log(seat);
      seat.classList.remove("selected");
        seat.classList.add("seat")
      seat.classList.add("occupied");
      }
    });
    updatePrice(0, 0);
    updateSeats();
  }
  

// // Create your project here from scratch
// const moviesList = [
//     { movieName: "Flash", price: 7 },
//     { movieName: "Spiderman", price: 5 },
//     { movieName: "Batman", price: 4 },
// ];

// // Use moviesList array for displaying the Name in the dropdown menu
// const movieSelect = document.getElementById('movieSelect');
// moviesList.forEach(movie => {
//     const option = document.createElement('option');
//     option.value = movie.movieName;
//     option.text = movie.movieName;
//     movieSelect.appendChild(option);
// });

// // Add event listener to each unoccupied seat
// const seatContainer = document.getElementById('seatCont');
// seatContainer.addEventListener('click', function (e) {
//     if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
//         e.target.classList.toggle('selected');
//         updateSelectedSeats();
//         updateTotalPrice();
//     }
// });

// // Add event listener to continue button
// const continueBtn = document.getElementById('continueBtn');
// continueBtn.addEventListener('click', function () {
//     const selectedSeats = document.querySelectorAll('.seat.selected');
//     if (selectedSeats.length === 0) {
//         alert('Oops, no seat selected!');
//     } else {
//         alert('Yayy! Your seats have been booked.');
//         selectedSeats.forEach(seat => {
//             seat.classList.remove('selected');
//             seat.classList.add('occupied');
//         });
//         updateTotalPrice();
//         updateSelectedSeats();
//     }
// });

// // Add event listener to cancel button
// const cancelBtn = document.getElementById('cancelBtn');
// cancelBtn.addEventListener('click', function () {
//     const selectedSeats = document.querySelectorAll('.seat.selected');
//     selectedSeats.forEach(seat => seat.classList.remove('selected'));
//     updateTotalPrice();
//     updateSelectedSeats();
// });

// // Function to update selected seats
// function updateSelectedSeats() {
//     const selectedSeats = document.querySelectorAll('.seat.selected');
//     const selectedSeatsHolder = document.getElementById('selectedSeatsHolder');
//     selectedSeatsHolder.textContent = selectedSeats.length > 0 ? selectedSeats.length + ' seat(s) selected' : 'No seat selected';
// }

// // Function to update total price
// function updateTotalPrice() {
//     const selectedSeats = document.querySelectorAll('.seat.selected');
//     const totalPriceElement = document.getElementById('totalPrice');
//     const selectedMovieName = movieSelect.value;
//     const selectedMovie = moviesList.find(movie => movie.movieName === selectedMovieName);
//     totalPriceElement.textContent = selectedSeats.length * selectedMovie.price;
// }
