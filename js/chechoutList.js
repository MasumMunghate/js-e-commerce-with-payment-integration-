const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const mobileNumber = document.querySelector("#mobileNumber");
const address = document.querySelector("#address");
const country = document.querySelector("#country");
const state = document.querySelector("#state");
const zip = document.querySelector("#zip");
firstName.addEventListener("input",()=>{
  const errormsg = document.querySelector('#firstNameerror');
  errormsg.innerHTML = ""
})
lastName.addEventListener("input",()=>{
  const errormsg = document.querySelector('#lastNameError');
  errormsg.innerHTML = ""
})
email.addEventListener("input",()=>{
  const errormsg = document.querySelector('#emailError');
  errormsg.innerHTML = "invalid email"
})
mobileNumber.addEventListener("input",()=>{
  const errormsg = document.querySelector('#mobileError');
  errormsg.innerHTML = "Invalid mobile number !"
})

address.addEventListener("input",()=>{
  const errormsg = document.querySelector('#adressError');
  errormsg.innerHTML = ""
})
country.addEventListener("input",()=>{
  const errormsg = document.querySelector('#countryError');
  errormsg.innerHTML = ""
})
state.addEventListener("input",()=>{
  const errormsg = document.querySelector('#stateError');
  errormsg.innerHTML = ""
})
zip.addEventListener("input",()=>{
  const errormsg = document.querySelector('#ZipError');
  errormsg.innerHTML = ""
})
let totalPriceResult = 0;
let discountedPrice = 0;
function validateForm() {
  let isValid = true;
  if (firstName.value.trim() === "") {
    firstName.classList.add("is-invalid");
    isValid = false;
  } else {
    firstName.classList.remove("is-invalid");
  }
  if (lastName.value.trim() === "") {
    lastName.classList.add("is-invalid");
    isValid = false;
  } else {
    lastName.classList.remove("is-invalid");
  }
  if (email.value.trim() === "" || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
    email.classList.add("is-invalid");
    isValid = false;
  } else {
    email.classList.remove("is-invalid");
  }
  if (!/^\+91\d{10}$/.test(mobileNumber.value.trim())) {
    mobileNumber.classList.add("is-invalid");
    isValid = false;
  } else {
    mobileNumber.classList.remove("is-invalid");
  }
  if (address.value.trim() === "") {
    address.classList.add("is-invalid");
    isValid = false;
  } else {
    address.classList.remove("is-invalid");
  }
  if (country.value.trim() === "") {
    country.classList.add("is-invalid");
    isValid = false;
  } else {
    country.classList.remove("is-invalid");
  }
  if (state.value.trim() === "") {
    state.classList.add("is-invalid");
    isValid = false;
  } else {
    state.classList.remove("is-invalid");
  }
  if (zip.value.trim() === "" || !/^\d{5,10}$/.test(zip.value)) {
    zip.classList.add("is-invalid");
    isValid = false;
  } else {
    zip.classList.remove("is-invalid");
  }
  return isValid;
}
document.querySelector("#continue-to-checkout").addEventListener("click", function() {
  if (validateForm()) {
    console.log("Form is valid!");
  } else {
    console.log("Form is invalid. Please correct the errors.");
  }
});
function showTable() {
  let cardsInfo = localStorage.getItem("cardInfo")
    ? JSON.parse(localStorage.getItem("cardInfo"))
    : [];
  totalPriceResult = cardsInfo.reduce((accumulator, item) => {
    return accumulator + parseInt(item.totalPrice);
  }, 0);
  discountedPrice = totalPriceResult;
  const CheckOutLists = document.querySelector(".check-out-list");
  CheckOutLists.innerHTML = ""; 
  const table = document.createElement("table");
  table.classList.add("table-style");
  table.innerHTML = `
      <thead class="thead-dark">
        <tr>
          <th scope="col">Sr. No.</th>
          <th scope="col">Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Actual Price</th>
          <th scope="col">Total Price</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
  const tbody = table.querySelector("tbody");
  cardsInfo.forEach((item, index) => {
    const { totalPrice, text, price, currentQty } = item;
    const row = document.createElement("tr");
    row.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${text}</td>
          <td>${currentQty}</td>
          <td>$${price}</td>
          <td>$${totalPrice}</td>
          <td><i class="fa-solid fa-trash" onclick="deleteFun(${index})"></i></td>
        `;
    tbody.appendChild(row);
  });
  CheckOutLists.appendChild(table);
  const heading = document.createElement("h5");
  heading.style.textAlign = "end";
  heading.classList.add("heading");
  heading.innerHTML = `Total Price: $${totalPriceResult.toFixed(2)}`;
  CheckOutLists.appendChild(heading);
  const coupon = document.createElement("button");
  coupon.classList.add("coupon");
  coupon.style.float = "right";
  coupon.innerHTML = "Get 20% Discount";
  coupon.addEventListener("click", function () {
    discountedPrice = totalPriceResult * 0.8;
    heading.innerHTML = `Total Price (with 20% discount): $${discountedPrice.toFixed(2)}`;
  });
  CheckOutLists.append(coupon);
}
document
  .getElementById("continue-to-checkout")
  .addEventListener("click", (event) => {
    event.preventDefault();
    if (validateForm()) {
      const stripe = Stripe("pk_test_51Q7C2AGHErYJbrBti1Qj2c2llr8IwDrOoxpnCk7ftejgBs8CVIhiRvkUaPnhGRLf1OIjwgoMOYEXfQYSeky7QAHK00wFnAWxvD"); // Add your Stripe public key here
      const cardInfo = JSON.parse(localStorage.getItem("cardInfo")) || [];

      const lineItems = cardInfo.map((item) => ({
        price: item.stripeProductId,
        quantity: item.currentQty,
      }));
      console.log(lineItems,"lineItemn");
      
      const totalAmount = discountedPrice ? discountedPrice : totalPriceResult;
      stripe
        .redirectToCheckout({
          lineItems: lineItems,
          mode: "payment",
          successUrl: "http://127.0.0.1:5501/checkout.html",
          cancelUrl: "http://127.0.0.1:5501/contact.html",
        })
        .then(function (result) {
          if (result.error) {
            console.error(result.error.message);
          }
        });
    } else {
      console.log("Validation failed");
    }
  });
  function deleteFun(id) {
    let cardsInfo = localStorage.getItem("cardInfo") ? JSON.parse(localStorage.getItem("cardInfo")) : [];
    const result = cardsInfo.filter((item, index) => index !== id);
    localStorage.setItem("cardInfo", JSON.stringify(result));
    showTable();
  }
  showTable(); 