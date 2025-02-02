
document.querySelector(".allCategoriesBtn").addEventListener("click",()=>{
  document.querySelector(".megamenu").classList.toggle("show")
})

let hotDeals = document.querySelector(".hot-deals .swiper-wrapper");

    // Remove Item From Cart
    let removeCartButtons = [...document.getElementsByClassName("delete")];
    removeCartButtons.forEach((button) => {
      button.addEventListener("click", removeCartItem);
    });

    //Quantity Changing
    let quantityInputs = [
      ...document.getElementsByClassName("cartBox-Quantity"),
    ];
    quantityInputs.forEach((input) => {
      input.addEventListener("change", quantityChanged);
    });

    //Add to Cart
    let addCart = [...document.getElementsByClassName("add-to-cart")];
    addCart.forEach((button) => {
      button.addEventListener("click", addCartClicked);
    });

    //Remove Item Function
    function removeCartItem(event) {
      let buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
      updateTotal();
    }

    // QuantityChanged Function
    function quantityChanged(event) {
      let input = event.target;
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
      }
      updateTotal();
    }

    // AddtoCart Function
    function addCartClicked(event) {
      let button = event.target;
      console.log(button);
      let product = button.parentElement;
      let title = product.getElementsByClassName("text-product")[0].innerText;
      let price = product.getElementsByClassName("price")[0].innerText;
      let img = product.getElementsByClassName("product-img")[0].src;
      addProductToCart(title, price, img);
      updateTotal();
    }

    function addProductToCart(title, price, img) {
      let cartShopBox = document.createElement("div");
      let cartItems = document.getElementsByClassName("cart-content")[0];
      let cartItemsNames = document.getElementsByClassName("card-title");
      //if product will be added twice
      for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerHTML == title) {
          // document.querySelector(".alert").style.display = "flex"
          // setTimeout(() => {
          //   document.querySelector(".alert").style.display = "none"
          // }, 6000);
          // Creating alert message
          let alert = document.createElement("div");
          alert.classList.add(
            "alert",
            "alert-warning",
            "alert-dismissible",
            "fade",
            "show"
          );
          let alertText = document.createTextNode(
            "This Product has been added to the cart."
          );
          alert.appendChild(alertText);
          let btn = document.createElement("button");
          btn.classList.add("btn-close");
          btn.dataset.bsDismiss = "alert";
          alert.appendChild(btn);
          let hotDeals = document.querySelector(".hot-deals .body-content");
          hotDeals.prepend(alert);
          return;
        }
      }

      let cartBoxContent = `
    <div class="row cartBox">
        <div class="col-md-4">
          <img src="${img}" class="img-fluid rounded-start" alt />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <div class="card-text d-flex mb-2">
              <div class="price fw-bold">${price}</div>
              <div
                class="delete ms-auto text-danger fs-5"
                style="cursor: pointer"
              >
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <input
              type="number"
              class="text-center cartBox-Quantity"
              value="1"
              style="width: 2.4rem"
            />
          </div>
        </div>
      </div>
      `
      cartShopBox.innerHTML += cartBoxContent;
      cartItems.append(cartShopBox);
      cartShopBox
        .getElementsByClassName("delete")[0]
        .addEventListener("click", removeCartItem);
      cartShopBox
        .getElementsByClassName("cartBox-Quantity")[0]
        .addEventListener("change", quantityChanged);
    }

    // Update Total Function
    function updateTotal() {
      let cartBoxes = document.getElementsByClassName("cartBox");
      let cartContent = document.getElementsByClassName("cart-counter")[0];
      if (cartBoxes.length > 0) {
        cartBoxes = [...cartBoxes];
        let total = 0;
        cartBoxes.forEach((cartBox) => {
          let priceElement = cartBox.getElementsByClassName("price")[0];
          let price = parseInt(
            priceElement.innerHTML.replace("EGP", "").replace(",", "")
          );
          let quantityElement =
            cartBox.getElementsByClassName("cartBox-Quantity")[0];
          let quantity = quantityElement.value;
          total = total + price * quantity;
          total = Math.round(total * 100) / 100;
          document.getElementsByClassName("total")[0].innerText =
            "Total: " + total + " EGP";
          cartContent.innerHTML = cartBoxes.length;
          cartContent.style.display = "flex";
        });
      } else {
        document.getElementsByClassName("total")[0].innerText = "Total: 0";
        cartContent.style.display = "none";
      }
    }

//viwAll btn redirection
let viewAll = [...document.querySelectorAll(".viewAll")]
viewAll.map((item)=>{
  item.addEventListener('click',(e)=>{
    e.preventDefault()
    if(e.target.parentNode.classList.contains("viewAll")){
      let category = e.target.parentElement.parentElement.parentElement.parentElement.classList[0]
      window.open("home/category?cat="+category,"_self")
    }
  })
})







