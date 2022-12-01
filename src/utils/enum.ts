// EST => Estimate

const EST_VARS = {
  ROOT_HOVER_LABEL: "Estimate arrival:",
  ORDER_LABEL: "Order Placing",
  SHIPPING_LABEL: "Order Shipping",
  DELIVERY_LABEL: "Order delivering",
  LABEL_NOTICE_1: "The above time frame is only applied for orders to the US with standard shipping methods",
  LABEL_NOTICE_2: "International orders: It may take 2-5 days longer due to the customs clearance process."
};

const EST_CLASSNAME = {
  ROOT_ITEM: "eb-estimate-shipping",
  ROOT_TEXT: "estimate-title",
  ROOT_TEXT_ICON: "hover-label-icon",
  ROOT_HOVER_TEXT:"hover-text",
  POPUP:"tooltip-text",
  EST_CARD: "est-card",
  EST_CARD_NOTICE: "est-shipping-notice",
  STEEPR_CONTAINER:"shipping-stepper",
  STEPPER_ITEM: "stepper-item",
  STEPPER_CONTENT: "stepper-content",
  STEPPER_ICON: "stepper-icon",
  TIME_VALUE: "time",
  TIME_LABEL: "time-label"
}
const FAS_ICON = {
  FA_DEFAULT_CLASS: "fa",
  FA_TRUCK: "fa-truck",
  FA_GIFT: "fa-gift",
  FA_HANDSHAKE_O: "fa-handshake-o"
}

const API = {
  EST_API_PRODUCTION: "https://tdkmdl0k6j.execute-api.ap-southeast-2.amazonaws.com/dev"
};
const EST_END_POINTS = {
  EST_SHIPPING: "/product/estimate-shipping"
}

export {
  EST_CLASSNAME,
  EST_VARS,
  API,
  FAS_ICON,
  EST_END_POINTS
};
