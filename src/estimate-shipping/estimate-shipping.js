import {HTMLTAG, CONSTANT} from "../enum/enum"

let getData = () => {
  let productType = window.product.type == ""
    ? "nonType"
    : window.product.type;
  return productType;
};

let createElementWithClassname = (tag, ...className) => {
  let element = document.createElement(tag);
  element.classList.add(...className);
  return element;
}

let stepperItemGener = (icon, time, label) => {
  const CLASSNAME_STEPPER_ITEM = "stepper-item";
  const CLASSNAME_STEPPER_CONTENT = "stepper-content";
  const CLASSNAME_STEPPER_ICON = "stepper-icon";
  const CLASSNAME_TIME_VALUE = "time";
  const CLASSNAME_TIME_LABEL = "time-label";

  let stepperItem = createElementWithClassname(HTMLTAG.DIV, CLASSNAME_STEPPER_ITEM);
  let stepperContentWrapper = createElementWithClassname(HTMLTAG.DIV, CLASSNAME_STEPPER_CONTENT);
  let stepperIconWrapper = createElementWithClassname(HTMLTAG.DIV, CLASSNAME_STEPPER_ICON);
  let timeElement = createElementWithClassname(HTMLTAG.P, CLASSNAME_TIME_VALUE);
  let labelElement = createElementWithClassname(HTMLTAG.P, CLASSNAME_TIME_LABEL);

  timeElement.append(time);
  labelElement.append(label);
  stepperIconWrapper.append(icon);
  stepperContentWrapper.append(timeElement, labelElement);
  stepperItem.append(stepperIconWrapper, stepperContentWrapper);

  return stepperItem;
};

class EstimateShipping {
  constructor() {
    const data = getData();
    this.element = this.initElement(data);
  }
  initElement(data) {
    let wrapper = createElementWithClassname(HTMLTAG.DIV, "estimate-title");
    let deliveryDay = "Nov 21 - Dec 12"; // get from data.abc

    let carIcon = createElementWithClassname(HTMLTAG.I, "fa", "fa-truck", "label-icon");
    let orderIcon = createElementWithClassname(HTMLTAG.I, "fa", "fa-handshake-o");
    let deliveryIcon = createElementWithClassname(HTMLTAG.I, "fa", "fa-gift");
    let shippingIcon = createElementWithClassname(HTMLTAG.I, "fa", "fa-truck");

    wrapper.append(carIcon);
    wrapper.append(CONSTANT.LABEL_EST);

    let hoverText = createElementWithClassname(HTMLTAG.SPAN, "hover-text");
    hoverText.append(deliveryDay)

    let popup = createElementWithClassname(HTMLTAG.DIV, "tooltip-text", "est-card");
    let stepper = createElementWithClassname(HTMLTAG.DIV, "shipping-stepper");

    let orderStepItem = stepperItemGener(orderIcon, "Dec 12 - 15", "Order Placing");
    let shippingStepItem = stepperItemGener(shippingIcon, "Dec 16 - 18", "Order Shipping");
    let deliveryStepItem = stepperItemGener(deliveryIcon, "Dec 18 - 20", "Order delivering");
    stepper.append(orderStepItem, shippingStepItem, deliveryStepItem);
    popup.append(stepper);

    let noticeWrapper = createElementWithClassname(HTMLTAG.DIV, "est-shipping-notice");
    let ul = createElementWithClassname(HTMLTAG.SPAN);
    let li1 = createElementWithClassname(HTMLTAG.LI);
    li1.innerText = CONSTANT.LABEL_NOTICE_1;
    let li2 = createElementWithClassname(HTMLTAG.LI);
    li2.innerText = CONSTANT.LABEL_NOTICE_2;
    ul.append(li1, li2);
    noticeWrapper.append(ul);

    popup.append(noticeWrapper);
    hoverText.append(popup);
    wrapper.append(hoverText);
    return wrapper;
  }

  getEls() {
    return {element: this.element}
  }
}

const ES = new EstimateShipping()
const estimateShippingEl = document.querySelector(`.${
  CONSTANT.CLASSNAME_ESTIMATE_SHIPPING_INIT
}`);
estimateShippingEl.appendChild(ES.getEls().element)