function getIndividualValue(button) {
  const cardsInfo = localStorage.getItem("cardInfo") ? JSON.parse(localStorage.getItem("cardInfo")) : [];
  const closeParent = button.closest(".best_shoes");
  const heading = closeParent.querySelector(".best_text").innerHTML;
  const shoesPrice = closeParent.querySelector(".offer-price").innerText;
  const stripeIds = closeParent.querySelector(".stripeProductId").innerHTML;

  const img = closeParent.querySelector("#img").src;
  const itemExists = cardsInfo.some((item) => item.text === heading);
  if (!itemExists) {
    const cardDetails = {
      img: img,
      text: heading,
      price: shoesPrice,
      currentQty: 1,
      totalPrice: shoesPrice,
      stripeProductId: stripeIds,
    };
    cardsInfo.push(cardDetails);
    console.log(cardDetails, "itemExists");
    localStorage.setItem("cardInfo", JSON.stringify(cardsInfo));
    Toastify({
      text: `${heading} Added successful`,
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    Toastify({
      text: "Item already exists in the cart",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }
}
function jogingSaleShoes(button) {
  const cardsInfo = localStorage.getItem("cardInfo") ? JSON.parse(localStorage.getItem("cardInfo")) : [];
  const closestParent = button.closest(".racing_shoes");
  const saleShoesPrice = closestParent.querySelector(
    ".sale-price-with-discount"
  ).innerText;
  const img = closestParent.querySelector("#img").src;
  const shoesPriceObj = {
    text: "Joging Shoes",
    img: img,
    price: saleShoesPrice,
    currentQty: 1,
    totalPrice: saleShoesPrice,
    stripeProductId: "price_1Q7wRPGHErYJbrBtc47yfIq2",
  };
  cardsInfo.push(shoesPriceObj);
  localStorage.setItem("cardInfo", JSON.stringify(cardsInfo));
  Toastify({
    text: `${shoesPriceObj.text} Added successful`,
    className: "info",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
}
function trendingShoes(button) {
  const cardsInfo = localStorage.getItem("cardInfo") ? JSON.parse(localStorage.getItem("cardInfo")) : [];
  const closestParent = button.closest(".carousel-item");
  const shoesText = closestParent.querySelector(".mens_taital").innerHTML;
  const img = closestParent.querySelector("#img").src;
  const shoesPriceObj = {
    img: img,
    text: shoesText,
    price: 500,
    currentQty: 1,
    totalPrice: 500,
    stripeProductId: "price_1Q7wQLGHErYJbrBtLat35X3S", 
  };
  cardsInfo.push(shoesPriceObj);
  localStorage.setItem("cardInfo", JSON.stringify(cardsInfo));
  Toastify({
    text: `${shoesText} Added successful`,
    className: "info",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
}
function newCollectionfun(button) {
  const cardInfo = localStorage.getItem("cardInfo") ? JSON.parse(localStorage.getItem("cardInfo")) : [];
  const closeParent = button.closest(".new-collection");
  const cardText = closeParent.querySelector(".sport_text").innerHTML;
  const cardPrice = closeParent.querySelector(".price").innerText;
  const image = closeParent.querySelector(".new-collection-img").src;
  const stripeIds = closeParent.querySelector(".newStripId").innerHTML;
  const itemExists = cardInfo.some((item) => item.text === cardText);
  if (!itemExists) {
    const shoesPriceObj = {
      img: image,
      text: cardText,
      price: cardPrice,
      currentQty: 1,
      totalPrice: cardPrice,
      stripeProductId: stripeIds,
    };
    cardInfo.push(shoesPriceObj);
    localStorage.setItem("cardInfo", JSON.stringify(cardInfo));
    Toastify({
      text: `${cardText} Added SuSuccessful`,
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    Toastify({
      text: "Item already exists in the cart",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }
}
function decreaseQuantity(index) {
  let cardInfo = JSON.parse(localStorage.getItem("cardInfo"));
  const qtyInput = document.getElementById(`qty-input-${index}`);
  let currentQty = parseInt(qtyInput.value);
  if (currentQty > 1) {
    currentQty -= 1;
    qtyInput.value = currentQty;
    let itemPrice = parseInt(cardInfo[index].price);
    let totalItemPrice = itemPrice * currentQty;
    cardInfo[index].currentQty = currentQty;
    cardInfo[index].totalPrice = totalItemPrice;
    localStorage.setItem("cardInfo", JSON.stringify(cardInfo));
    document.querySelector(`#price-${index}`).innerHTML = totalItemPrice;
    refreshTotlePrice();
  } else {
    Toastify({
      text: "Quantity cannot be less than 1",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #e00b13, #e66469)",
      },
      onClick: function () {},
    }).showToast();
  }
}
function increaseQuantity(index) {
  let cardInfo = JSON.parse(localStorage.getItem("cardInfo")) || [];
  const qtyInput = document.getElementById(`qty-input-${index}`);
  let currentQty = parseInt(qtyInput.value);
  if (currentQty < 5) {
    currentQty += 1;
    qtyInput.value = currentQty;
    let itemPrice = parseInt(cardInfo[index].price);
    let totalItemPrice = itemPrice * currentQty;
    cardInfo[index].currentQty = currentQty;
    cardInfo[index].totalPrice = totalItemPrice;
    localStorage.setItem("cardInfo", JSON.stringify(cardInfo));
    document.querySelector(`#price-${index}`).innerHTML = `$${totalItemPrice}`;
    refreshTotlePrice();
  } else {
    Toastify({
      text: "Quantity cannot be More than 5",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #e00b13, #e66469)",
      },
      onClick: function () {},
    }).showToast();
  }
}




function offcanvasDiv() {
  let cardsInfo = JSON.parse(localStorage.getItem("cardInfo")) || [];
  let totalPriceResult = cardsInfo?.reduce((accumulator, item) => {
    return accumulator + parseInt(item.totalPrice);
  }, 0);
  const canvasDiv = document.getElementById("offcanvasRight");
  
  if (canvasDiv) {
    canvasDiv.innerHTML = `
        <div class="offcanvas-header" style="background:#c14e59; color:white;">
          <h5 class="offcanvas-title fw-bold text-white" id="offcanvasRightLabel">Shopping Cart</h5>
          <button type="button" class="btn-close fw-bold" style="color:white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body" style="background:#fd4d5a"></div>
        <div class="d-flex justify-content-around align-items-center my-2">
          <h4 class="my-auto">Total</h4>
          <h4 class="my-auto" id="total-price">$${totalPriceResult}</h4>
        </div>
        <a href="http://127.0.0.1:5501/contact.html" class="btn btn-danger mx-5 my-2 redirect-to-checkout" id="total-price-checkout">Checkout</a>
    `;
    const offcanvasBody = canvasDiv.querySelector(".offcanvas-body");
    cardsInfo?.map((item, index) => {
      const itemHTML = `
        <div class="container mt-2 rounded-3 py-3" id="items-card-${index}" style="background:white; height:auto;">
          <div class="d-flex justify-content-between align-items-center">
            <div class="p-2 w-25">
              <img src=${item.img} class="img-fluid" alt="Shoes Image" style="max-height: 80px; object-fit: cover;" />
            </div>
            <div class="px-3">
              <div class="d-flex flex-column">
                <h6 class="mb-2">${item.text}</h6>
                <div class="increment-decrement d-flex align-items-center">
                  <button class="minus-button btn btn-sm btn-outline-secondary fw-bold px-2" id="minus-button-${index}" onclick="decreaseQuantity(${index})">-</button>
                  <input type="number" id="qty-input-${index}" class="qty-input form-control mx-2 text-center" step="1" min="1" max="5" value="${item.currentQty}" style="width: 60px;" readonly>
                  <button class="plus-button btn btn-sm btn-outline-secondary fw-bold px-2" id="plus-button-${index}" onclick="increaseQuantity(${index})">+</button>
                </div>
              </div>
            </div>
            <div class="text-end">
              <div class="mb-2" onclick="sweetAlartFun(${index})">
                <i class="material-icons" style="cursor: pointer; font-size: 24px; color: red;">delete</i>
              </div>
              <div class="fs-5 fw-bold" id="price-${index}">
                $${item.totalPrice}
              </div>
            </div>
          </div>
        </div>
      `;
      offcanvasBody.innerHTML += itemHTML;
    });
  } else {
    console.error("Canvas div not found.");
  }
}

function deleteFunction(id) {
  const cardInfo = JSON.parse(localStorage.getItem("cardInfo")) || [];
  const filteredArray = cardInfo.filter((items, index) => {
    return id !== index;
  });
  localStorage.setItem("cardInfo", JSON.stringify(filteredArray));
  refreshTotlePrice();
  offcanvasDiv();
}
function refreshTotlePrice() {
  const cardInfo = JSON.parse(localStorage.getItem("cardInfo")) || [];
  const newValue = cardInfo.reduce((accumulator, item) => {
    return accumulator + parseInt(item.totalPrice);
  }, 0);
  const totalPrice = document.querySelector("#total-price");
  totalPrice.innerHTML = `$${newValue}`;
}
function deleteIndividualCard(id) {
  const card = document.querySelector(`#items-card-${id}`);
  if (card) {
    card.remove();
  }
}
function sweetAlartFun(index) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
      deleteFunction(index);
    } else {
      swal("Your imaginary file is safe!");
      offcanvasDiv();
    }
  });
}
