import moment from "moment";
import {
    CONSTANT,
    HTMLTAG
} from "../enum/enum";

let getEstimateTime = async(callback) => {
    let productType = window.product.type == "" ?
        "nonType" :
        window.product.type;
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            type: productType
        })
    }
    return fetch("http://127.0.0.1:2345/product/estimate-shipping", options).then(res => res.json()).then(res => {
        if (res.isSuccess) {
            return res.data.estTime;
        } else {
            return [];
        }
    });
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

let formatEstShippingTime = (time) => {
    return moment(time).format("ll").split(", ")[0];
}

class EstimateShipping {
    constructor(data) {
        this.data = data;
        this.element = null;
    }

    initElement() {
        let estimateData = this.data;
        let wrapper = createElementWithClassname(HTMLTAG.DIV, "estimate-title");
        console.log(estimateData);
        let deliveryDay = `${
          formatEstShippingTime(estimateData.delivery.min)
        } - ${
          formatEstShippingTime(estimateData.delivery.max)
        }`;
        console.log(deliveryDay);
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

        let orderStepItem = stepperItemGener(orderIcon, `Today, ${formatEstShippingTime(estimateData.orderPlace)}`, "Order Placing");
        let shippingStepItem = stepperItemGener(shippingIcon, `${
          formatEstShippingTime(estimateData.shipping.min)
        } - ${
          formatEstShippingTime(estimateData.shipping.max)
        }`, "Order Shipping");
        let deliveryStepItem = stepperItemGener(deliveryIcon, `${
          formatEstShippingTime(estimateData.delivery.min)
        } - ${
          formatEstShippingTime(estimateData.delivery.max)
        }`, "Order delivering");
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
    CONSTANT.CLASSNAME_ESTIMATE_SHIPPING_INIT
  }`);
    estimateShippingEl.appendChild(ES.getEls().element)
};

start()