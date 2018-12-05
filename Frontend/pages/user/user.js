const ORDERCONTAINER = document.getElementById('feed');
let orders =
    [{
        orderId: '#105269945',
        orderDate: new Date('December 17, 2018'),
        orderStatus: 'Pending',
        items: [
            {
                name: "Pink Lady Apples",
                subtitle: "",
                brand: "Pink Lady",
                weight: "",
                unit: "/kg",
                price: "3",
                promotionPrice: "",
                extraInfo: "",
                category: "Produce",
                img: "../../img/apple1.jpg",
                promotion: 0,
                highlight: 0,
                quantity: 2
            },
            {
                name: "Archer Farms",
                subtitle: "Deluxe roasted mixed nuts",
                brand: "",
                weight: "",
                unit: "",
                price: "25",
                promotionPrice: "",
                extraInfo: "",
                category: "Nuts",
                img: "../../img/nuts1.jpg",
                promotion: 0,
                highlight: 0,
                quantity: 2
            },
            {
                name: "Chiquita banana",
                subtitle: "",
                brand: "",
                weight: "",
                unit: "/kg",
                price: "3",
                promotionPrice: "",
                extraInfo: "",
                category: "Produce",
                img: "../../img/banana1.jpg",
                promotion: 0,
                highlight: 0,
                quantity: 2
            }

        ]
    },
    {
        orderId: '#10526654',
        orderDate: new Date('December 1, 2018'),
        orderStatus: 'Complete',
        items: [
            {
                name: "Cliff Bar",
                subtitle: "Chocolate Chip",
                brand: "Cliff",
                weight: "",
                unit: "",
                price: "6",
                promotionPrice: "",
                extraInfo: "",
                category: "Nutrition",
                img: "../../img/cliff1.jpg",
                promotion: 0,
                highlight: 0,
                quantity: 2
            },
            {
                name: "Lay's Classic",
                subtitle: "Family Size",
                brand: "Lay's",
                weight: "",
                unit: "",
                price: "2,5",
                promotionPrice: "",
                extraInfo: "",
                category: "Chips, snacks & cookies",
                img: "../../img/lays1.jpg",
                promotion: 0,
                highlight: 0,
                quantity: 2
            },
            {
                name: "Peeled Snacks",
                subtitle: "Organic Dried Mango",
                brand: "Peeled Snacks",
                weight: "",
                unit: "",
                price: "3,79",
                promotionPrice: "",
                extraInfo: "",
                category: "Chips, snacks & cookies",
                img: "../../img/peeledmango1.jpg",
                promotion: 0,
                highlight: 0,
                quantity: 2
            },
            {
                name: "Philadelphia",
                subtitle: "Original",
                brand: "Philadelphia",
                weight: "",
                unit: "",
                price: "3,79",
                promotionPrice: "",
                extraInfo: "",
                category: "Dairy",
                img: "../../img/philadelphiaOriginal.jpg",
                promotion: 0,
                highlight: 0,
                quantity: 2
            }
        ]
    },
    {
        orderId: '#105269445',
        orderDate: new Date('December 17, 2018'),
        orderStatus: 'Pending',
        items: [
            {
                name: "Pink Lady Apples",
                subtitle: "",
                brand: "Pink Lady",
                weight: "",
                unit: "/kg",
                price: "3",
                promotionPrice: "",
                extraInfo: "",
                category: "Produce",
                img: "../../img/apple1.jpg",
                promotion: 0,
                highlight: 0,
                quantity: 2
            },
            {
                name: "Archer Farms",
                subtitle: "Deluxe roasted mixed nuts",
                brand: "",
                weight: "",
                unit: "",
                price: "25",
                promotionPrice: "",
                extraInfo: "",
                category: "Nuts",
                img: "../../img/nuts1.jpg",
                promotion: 0,
                highlight: 0,
                quantity: 2
            },
            {
                name: "Chiquita banana",
                subtitle: "",
                brand: "",
                weight: "",
                unit: "/kg",
                price: "3",
                promotionPrice: "",
                extraInfo: "",
                category: "Produce",
                img: "../../img/banana1.jpg",
                promotion: 0,
                highlight: 0,
                quantity: 2
            }

        ]
    }
    ];

if (!orders.length) {
    ORDERCONTAINER.innerHTML = `
    <p>You have not made any orders yet</p>
    `;
} else {
    orders.forEach(order => {
        let card = document.createElement('div');
        card.classList.add("card-wide");
        card.classList.add("mdl-card");
        card.classList.add("mdl-shadow--2dp");

        card.innerHTML = `
        <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Order ${order.orderId}</h2>
        </div>
        <div id="orderItems" class="mdl-card__supporting-text">
            ${order.orderDate}
            <table class="mdl-data-table mdl-js-data-table m-auto">
                <thead>
                    <tr>
                        <th class="mdl-data-table__cell--non-numeric">Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody id="${order.orderId}">
                    ${order.orderContent}
                </tbody>
            </table>
        </div>
        <div class="mdl-card__menu">
            <button id="editOrder" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                <i class="material-icons">menu</i>
            </button>
            <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="editOrder">
                <li class="mdl-menu__item">Some Action</li>
                <li class="mdl-menu__item">Another Action</li>
                <li disabled class="mdl-menu__item">Disabled Action</li>
                <li class="mdl-menu__item">Yet Another Action</li>
            </ul>
        </div>`;
        ORDERCONTAINER.appendChild(card);

        order.items.forEach(item => {
            order.orderContent = document.createElement('tr');
            item.totalPrice = parseFloat(item.price) * parseInt(item.quantity);
            console.log(order.price);
            order.orderContent.innerHTML = 
                `<td class="mdl-data-table__cell--non-numeric">${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.totalPrice} kr</td>`;
            document.getElementById(order.orderId).appendChild(order.orderContent);
        });
    });
}