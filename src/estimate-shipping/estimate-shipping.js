import moment from "moment";
import {
    API,
    EST_CLASSNAME,
    EST_END_POINTS,
    EST_VARS,
    FAS_ICON
} from "../utils/enum";

const getEstimateTime = async() => {
    const productType = window.product.type || "default";
    const options = {
        method: "POST",
        body: JSON.stringify({
            type: productType
        })
    }
    return fetch(API.EST_API_PRODUCTION + EST_END_POINTS.EST_SHIPPING, options).then(res => res.json()).then(res => {
        return res.isSuccess ?
            res.data.estTime : {};
    });
};

const createElementWithClassname = (tag, ...className) => {
    let element = document.createElement(tag);
    className.length > 0 && element.classList.add(...className);
    return element;
};

const generateStepperItem = (icon, time, label) => {

    let stepperItem = createElementWithClassname("div", EST_CLASSNAME.STEPPER_ITEM);
    let stepperContentWrapper = createElementWithClassname("div", EST_CLASSNAME.STEPPER_CONTENT);
    let stepperIconWrapper = createElementWithClassname("div", EST_CLASSNAME.STEPPER_ICON);
    let timeElement = createElementWithClassname("p", EST_CLASSNAME.TIME_VALUE);
    let labelElement = createElementWithClassname("p", EST_CLASSNAME.TIME_LABEL);

    timeElement.append(time);
    labelElement.append(label);
    stepperIconWrapper.append(icon);
    stepperContentWrapper.append(timeElement, labelElement);
    stepperItem.append(stepperIconWrapper, stepperContentWrapper);

    return stepperItem;
};

const generateEstPopup = ({
    orderPlace,
    shipping,
    delivery
}) => {
    const OrderLabel = `Today, ${formatEstTime(orderPlace)}`;
    const ShippingLabel = `${formatEstTime(shipping.min)} - ${formatEstTime(shipping.max)}`;
    const DeliveryLabel = `${formatEstTime(delivery.min)} - ${formatEstTime(delivery.max)}`;

    let orderIcon = createElementWithClassname("i", FAS_ICON.FA_DEFAULT_CLASS, FAS_ICON.FA_HANDSHAKE_O);
    let deliveryIcon = createElementWithClassname("i", FAS_ICON.FA_DEFAULT_CLASS, FAS_ICON.FA_GIFT);
    let shippingIcon = createElementWithClassname("i", FAS_ICON.FA_DEFAULT_CLASS, FAS_ICON.FA_TRUCK);

    let popup = createElementWithClassname("div", EST_CLASSNAME.POPUP, EST_CLASSNAME.EST_CARD);
    let stepper = createElementWithClassname("div", EST_CLASSNAME.STEEPR_CONTAINER);

    let orderStepItem = generateStepperItem(orderIcon, OrderLabel, EST_VARS.ORDER_LABEL);
    let shippingStepItem = generateStepperItem(shippingIcon, ShippingLabel, EST_VARS.SHIPPING_LABEL);
    let deliveryStepItem = generateStepperItem(deliveryIcon, DeliveryLabel, EST_VARS.DELIVERY_LABEL);

    stepper.append(orderStepItem, shippingStepItem, deliveryStepItem);
    popup.append(stepper);

    let noticeWrapper = createElementWithClassname("div", EST_CLASSNAME.EST_CARD_NOTICE);
    let ul = createElementWithClassname("ul");
    let li1 = createElementWithClassname("li");
    li1.innerText = EST_VARS.LABEL_NOTICE_1;
    let li2 = createElementWithClassname("li");
    li2.innerText = EST_VARS.LABEL_NOTICE_2;
    ul.append(li1, li2);
    noticeWrapper.append(ul);

    popup.append(noticeWrapper);
    return popup;
}

const formatEstTime = (time) => {
    return moment(time).format("ll").split(", ")[0];
};

class EstimateShipping {
    constructor(data) {
        this.data = data;
        this.element = null;
    };

    initElement() {
        const {
            orderPlace,
            shipping,
            delivery
        } = this.data;
        let wrapper = createElementWithClassname("div", EST_CLASSNAME.ROOT_TEXT);
        let carIcon = createElementWithClassname("i", FAS_ICON.FA_DEFAULT_CLASS, FAS_ICON.FA_TRUCK, EST_CLASSNAME.ROOT_TEXT_ICON);

        wrapper.append(carIcon);
        wrapper.append(EST_VARS.ROOT_HOVER_LABEL);

        let hoverText = createElementWithClassname("span", EST_CLASSNAME.ROOT_HOVER_TEXT);
        hoverText.append(`${formatEstTime(delivery.min)} - ${formatEstTime(delivery.max)}`)
        let popup = generateEstPopup({
            orderPlace,
            shipping,
            delivery
        });
        hoverText.append(popup);
        wrapper.append(hoverText);
        this.element = wrapper;
    }

    getEls() {
        return this.element
    }
}

const start = async() => {
    let dataEst = await getEstimateTime();
    let ES = new EstimateShipping(dataEst);
    ES.initElement();

    const estimateShippingEl = document.querySelector(`.${EST_CLASSNAME.ROOT_ITEM}`);
    estimateShippingEl.appendChild(ES.getEls())
};

start()