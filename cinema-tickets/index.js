const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");
const btn = document.querySelector(".btn");
getFromLocalStorage();
calculateTotal();

container.addEventListener("click", (e) => {
  //    console.log(e.target.classList.contains("seat"));
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    e.target.classList.toggle("selected");
    calculateTotal();
  }
});

select.addEventListener("change", (e) => {
  calculateTotal();
});

btn.addEventListener("click", (e) => {
  calculateTotal();
  let selectedSeats = container.querySelectorAll(".seat.selected");
  //   console.log(selectedSeats);
  let selectedSeatsArr = [];
  let purchasedSeats = container.querySelectorAll(".seat.reserved");
  //   console.log(purchasedSeats);
  let purchasedSeatsArr = [];
  purchasedSeats.forEach(function (seat) {
    purchasedSeatsArr.push(seat);
  });
  console.log(purchasedSeatsArr);

  selectedSeats.forEach(function (seat) {
    selectedSeatsArr.push(seat);
  });

  if (selectedSeatsArr.length > 1) {
    selectedSeatsArr.map((seat) => {
      seat.classList.add("reserved");
      seat.classList.remove("selected");
      calculateTotal();
    });
  }
});

function calculateTotal() {
  let selectedSeats = container.querySelectorAll(".seat.selected");

  let selectedSeatsArr = [];
  const seatsArr = [];

  selectedSeats.forEach(function (seat) {
    selectedSeatsArr.push(seat);
  });

  seats.forEach((seat) => {
    seatsArr.push(seat);
  });

  let selectedSeatIndexs = selectedSeatsArr.map((seat) => {
    return seatsArr.indexOf(seat);
  });

  let selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;

  //!SAVE to LOCAL STORAGE

  saveToLocalStorage(selectedSeatIndexs);
}

function saveToLocalStorage(indexs) {
  localStorage.setItem("selectedSeats", JSON.stringify(indexs));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);

  // Satın alınan koltukların indekslerini kaydedin
  const reservedSeats = [...document.querySelectorAll(".seat.reserved")].map(
    (seat) => [...seats].indexOf(seat)
  );
  localStorage.setItem("reservedSeats", JSON.stringify(reservedSeats));
}

//? Get Data From LOCAL Storage
function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const reservedSeats = JSON.parse(localStorage.getItem("reservedSeats"));
  if (reservedSeats != null && reservedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (reservedSeats.indexOf(index) > -1) {
        seat.classList.add("reserved");
      }
    });
  }

  const selectedMovieIndex = JSON.parse(
    localStorage.getItem("selectedMovieIndex")
  );
  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}
