const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");
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

  const selectedMovieIndex = JSON.parse(
    localStorage.getItem("selectedMovieIndex")
  );
  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}
