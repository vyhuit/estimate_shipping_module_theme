import moment from "moment";
import {
    API,
    EST_CONSTANT
} from "../constants/enum";

let getEstimateTime = async() => {
    let productType = window.product.type == "" ?
        "default" :
        window.product.type;
    const options = {
        // mode: 'no-cors',
        method: "POST",
        body: JSON.stringify({
            type: productType
        })
    }
    return fetch(API + "/product/estimate-shipping", options).then(res => res.json()).then(res => {
        if (res.isSuccess) {
            return res.data.estTime;
        } else {
            return {};
        }
    });
};

let createElementWithClassname = (tag, ...className) => {
    let element = document.createElement(tag);
    className.length > 0 && element.classList.add(...className);
    return element;
};

let stepperItemGener = (icon, time, label) => {
    const CLASSNAME_STEPPER_ITEM = "stepper-item";
    const CLASSNAME_STEPPER_CONTENT = "stepper-content";
    const CLASSNAME_STEPPER_ICON = "stepper-icon";
    const CLASSNAME_TIME_VALUE = "time";
    const CLASSNAME_TIME_LABEL = "time-label";

    let stepperItem = createElementWithClassname("div", CLASSNAME_STEPPER_ITEM);
    let stepperContentWrapper = createElementWithClassname("div", CLASSNAME_STEPPER_CONTENT);
    let stepperIconWrapper = createElementWithClassname("div", CLASSNAME_STEPPER_ICON);
    let timeElement = createElementWithClassname("p", CLASSNAME_TIME_VALUE);
    let labelElement = createElementWithClassname("p", CLASSNAME_TIME_LABEL);

    timeElement.append(time);
    labelElement.append(label);
    stepperIconWrapper.append(icon);
    stepperContentWrapper.append(timeElement, labelElement);
    stepperItem.append(stepperIconWrapper, stepperContentWrapper);

    return stepperItem;
};

let formatEstShippingTime = (time) => {
    return moment(time).format("ll").split(", ")[0];
};

class EstimateShipping {
    constructor(data) {
        this.data = data;
        this.element = null;
    }

    initElement() {
        let wrapper = createElementWithClassname("div", "estimate-title");

        const OrderLabel = `Today, ${
      formatEstShippingTime(this.data.orderPlace)
    }`;
        const ShippingLabel = `${
      formatEstShippingTime(this.data.shipping.min)
    } - ${
      formatEstShippingTime(this.data.shipping.max)
    }`;
        const DeliveryLabel = `${
      formatEstShippingTime(this.data.delivery.min)
    } - ${
      formatEstShippingTime(this.data.delivery.max)
    }`;

        let carIcon = createElementWithClassname("i", "fa", "fa-truck", "label-icon");
        let orderIcon = createElementWithClassname("i", "fa", "fa-handshake-o");
        let deliveryIcon = createElementWithClassname("i", "fa", "fa-gift");
        let shippingIcon = createElementWithClassname("i", "fa", "fa-truck");

        wrapper.append(carIcon);
        wrapper.append(EST_CONSTANT.LABEL_EST);

        let hoverText = createElementWithClassname("span", "hover-text");
        hoverText.append(DeliveryLabel)

        let popup = createElementWithClassname("div", "tooltip-text", "est-card");
        let stepper = createElementWithClassname("div", "shipping-stepper");

        let orderStepItem = stepperItemGener(orderIcon, OrderLabel, "Order Placing");
        let shippingStepItem = stepperItemGener(shippingIcon, ShippingLabel, "Order Shipping");
        let deliveryStepItem = stepperItemGener(deliveryIcon, DeliveryLabel, "Order delivering");

        stepper.append(orderStepItem, shippingStepItem, deliveryStepItem);
        popup.append(stepper);

        let noticeWrapper = createElementWithClassname("div", "est-shipping-notice");
        let ul = createElementWithClassname("ul");
        let li1 = createElementWithClassname("li");
        li1.innerText = EST_CONSTANT.LABEL_NOTICE_1;
        let li2 = createElementWithClassname("li");
        li2.innerText = EST_CONSTANT.LABEL_NOTICE_2;
        ul.append(li1, li2);
        noticeWrapper.append(ul);

        popup.append(noticeWrapper);
        hoverText.append(popup);
        wrapper.append(hoverText);
        this.element = wrapper;
    }

    getEls() {
        return {
            element: this.element
        }
    }
}

let start = async() => {
    let dataEst = await getEstimateTime();
    let ES = new EstimateShipping(dataEst);
    ES.initElement();

    const estimateShippingEl = document.querySelector(`.${
    EST_CONSTANT.CLASSNAME_ESTIMATE_SHIPPING_INIT
  }`);
    estimateShippingEl.appendChild(ES.getEls().element)
};

start()