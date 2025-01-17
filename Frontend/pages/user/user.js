const ORDERCONTAINER = document.getElementById("feed");
const LOADER = document.createElement("div");
LOADER.setAttribute(
  "class",
  "m-auto mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"
);
LOADER.style = "left: 50%";

window.onload = function() {
  makeUser(JSON.parse(sessionStorage.getItem("userInfo")));
};

// Create order history
function makeOrders(userID) {
  
  const REQUEST = new XMLHttpRequest();
  
    REQUEST.onloadstart = function () {
        ORDERCONTAINER.appendChild(LOADER);
    };
  REQUEST.open("GET", "http://localhost:57269/api/getOrderUser/" + userID);

  REQUEST.onload = function() {
    let orders = JSON.parse(this.response);
    if (REQUEST.status >= 200 && REQUEST.status < 400) {
      if (!orders[0].usersOrder.length) {
        ORDERCONTAINER.innerHTML = `
                <div class="mdl-card card-wide mdl-shadow--2dp">
                <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">You have not made any orders yet</h2>
                </div>
                </div>
                `;
      } else {
        orders[0].usersOrder.forEach(order => {
          let card = document.createElement("div");
          card.classList.add("card-wide");
          card.classList.add("mdl-card");
          card.classList.add("mdl-shadow--2dp");
          let date = order.PickUpDate;
          // cannot slice null values
          if (date != null) {
            date = date.slice(0, 10);
          }
          card.innerHTML = `
                    <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">Order ID #${
                          order.OrderID
                        }</h2>
                    </div>
                    <div id="orderItems" class="mdl-card__supporting-text">
                    Total order price: ${order.TotalValue} kr </br>
                    Pick up time: ${date} ${order.PickUp.slice(0, 5)}

                        <table class="mdl-data-table mdl-js-data-table m-auto">
                            <thead>
                                <tr>
                                    <th class="mdl-data-table__cell--non-numeric">Item</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody id="${order.OrderID}">
                            </tbody>
                        </table>
                    </div>
                    <div class="mdl-card__menu">
                        <button id="editOrder${order.OrderID}"
                         class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                            <i class="material-icons">menu</i>
                        </button>
                        <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="editOrder${
                          order.OrderID
                        }">
                            <li class="mdl-menu__item">Some Action</li>
                            <li class="mdl-menu__item">Another Action</li>
                            <li disabled class="mdl-menu__item">Disabled Action</li>
                            <li class="mdl-menu__item">Yet Another Action</li>
                        </ul>
                    </div>`;
          ORDERCONTAINER.appendChild(card);
          order.OrderList.forEach(ol => {
            orderItem = document.createElement("tr");
            orderItem.innerHTML = `
                            <td class="mdl-data-table__cell--non-numeric">${
                              ol.productDetails[0].ProductName
                            }</td>
                            <td>${
                              ol.productDetails[0].productCategory[0]
                                .CategoryName
                            }</td>
                            <td>${ol.productDetails[0].ProductPrice} kr</td>`;

            document.getElementById(order.OrderID).appendChild(orderItem);
          });
          //orders[0].usersOrder.forEach(uo => console.log(uo));

          /* [0].OrderList.forEach(item => {
                      console.log(item);
                      orderItem = document.createElement("tr");
                      orderItem.innerHTML = `
                                      <td class="mdl-data-table__cell--non-numeric">${
                                        item.productDetails[0].ProductName
                                      }</td>
                                      <td>${
                                        item.productDetails[0].productCategory[0]
                                          .CategoryName
                                      }</td>
                                      <td>${item.productDetails[0].ProductPrice} kr</td>`;
          
                      document.getElementById(order.OrderID).appendChild(orderItem);
                    });*/
        });
      }
    } else {
      ORDERCONTAINER.innerHTML = `
            <div class="mdl-card card-wide mdl-shadow--2dp">
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">Order history cannot be accessed at this moment, try again later</h2>
                </div>
            </div>
            `;
    }
  };

  REQUEST.send();
}

function makeUser(userInfo) {
  document.querySelector("#welcomeUser").innerHTML = `Welcome ${
    userInfo[0].FName
  } ${userInfo[0].LName}`;
  document.querySelector("#userName").innerHTML = `${userInfo[0].FName} ${
    userInfo[0].LName
  }`;
  document.querySelector("#cpr").innerHTML = `${userInfo[0].CPR}`;
  document.querySelector("#email").innerHTML = `${userInfo[0].EMail}`;
  document.querySelector("#address").innerHTML = `${userInfo[0].Street}, ${
    userInfo[0].FlatNo
  } <br> ${userInfo[0].City} <br> ${userInfo[0].Zip}`;
  document.querySelector("#phone").innerHTML = `${userInfo[0].PhoneNo}`;
  makeOrders(userInfo[0].UserID);
}

(function() {
  "use strict";
  var snackbarContainer = document.querySelector("#toast");
  var showToastButton = document.querySelector("#editProfile");
  showToastButton.addEventListener("click", function() {
    "use strict";
    var data = { message: "" };
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("userInfo");
    sessionStorage.setItem("logoutFlag", true);
    location = "../home/home.html";
  });
})();

//update the cart icon, function comes from app.js
updateCartIconShared();
