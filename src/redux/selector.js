// import { createSelector } from "@reduxjs/toolkit";

export const modalSelector = (state) => state.modal;

export const currentUserSelector = (state) => state.currentUser.user;

export const imagesSelector = (state) => state.upImage.images;

export const productsUserSelector = (state) => state.productsUser.products;

export const productsSelector = (state) => state.products.products;

export const productPageSelector = (state) => state.productPage;

export const ShopSelector = (state) => state.productPage.shop;

export const cartSelector = (state) => state.cart.cart;
export const cartLoadingSelector = (state) => state.cart.isloading;

export const billSelector = (state) => state.bill.bill;

export const orderSelector = (state) => state.order


export const notificationSelector = (state) => state.notification
