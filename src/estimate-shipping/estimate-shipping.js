console.log("Zoooo");
let getData = () => {
  
};

class EstimateShipping {
  constructor() {
    const data = getData();
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add("estimate-title");

// create hoverText Day from api data
    let deliveryDay = "Nov 21 - Dec 12";

// constant label
    const EST_LABEL = "Estimate arrival:"

// create icons
    let carIcon = document.createElement("i");
    carIcon.classList.add("fa", "fa-truck", "label-icon");
    let orderIcon = document.createElement("i");
    orderIcon.classList.add("fa", "fa-handshake-o");
    let deliveryIcon = document.createElement("i");
    deliveryIcon.classList.add("fa", "fa-gift");
    let shippingIcon = document.createElement("i");
    shippingIcon.classList.add("fa", "fa-truck");

// add car icon and constant label first
    this.wrapper.append(carIcon);
    this.wrapper.append(EST_LABEL);

// create hover text element and popup inside
    let hoverText = document.createElement("span");
    hoverText.classList.add("hover-text");
    hoverText.append(deliveryDay)

    let popup = document.createElement("div");
    popup.classList.add("tooltip-text", "est-card")
    let stepper = document.createElement("div");
    stepper.classList.add("shipping-stepper");

    let stepperItemGener = (icon, time, label) => {
      let stepperItem = document.createElement("div");
      stepperItem.classList.add("stepper-item");

      let stepperContentWrapper = document.createElement("div");
      stepperContentWrapper.classList.add("stepper-content");

      let stepperIconWrapper = document.createElement("div");
      stepperIconWrapper.classList.add("stepper-icon");

      let timeElement = document.createElement("p");
      let labelElement = document.createElement("p");

      timeElement.classList.add("time");
      labelElement.classList.add("time-label");
      timeElement.append(time);
      labelElement.append(label);

      stepperIconWrapper.append(icon);
      stepperContentWrapper.append(timeElement, labelElement);
      stepperItem.append(stepperIconWrapper, stepperContentWrapper);

      return stepperItem;
    };
    let orderStepItem = stepperItemGener(orderIcon, "Dec 12 - 15", "Order Placing");
    let shippingStepItem = stepperItemGener(shippingIcon, "Dec 16 - 18", "Order Shipping");
    let deliveryStepItem = stepperItemGener(deliveryIcon, "Dec 18 - 20", "Order delivering");
    stepper.append(orderStepItem, shippingStepItem, deliveryStepItem);
    popup.append(stepper);

    let noticeWrapper = document.createElement("div");
    noticeWrapper.classList.add("est-shipping-notice");
    let ul = document.createElement("ul");
    let li1 = document.createElement("li");
    li1.innerText = "The above time frame is only applied for orders to the US with standard shipping methods.";
    let li2 = document.createElement("li");
    li2.innerText = "International orders: It may take 2-5 days longer due to the customs clearance process.";
    ul.append(li1, li2);
    noticeWrapper.append(ul);

    popup.append(noticeWrapper);
    hoverText.append(popup);
    this.wrapper.append(hoverText);
    console.log(this.wrapper);
    return;
  }

  getEls() {
    return {wrapper: this.wrapper}
  }
}

const estimateShipping = new EstimateShipping()

const estimateShippingEl = document.querySelector('.eb-estimate-shipping');
estimateShippingEl.appendChild(estimateShipping.getEls().wrapper)