import React, { useState } from 'react'
import language from './config'

const Messenge = (name) => {

    const dataMessenge = {
        quickView: {
            EN: "Quick View",
            VN: "Xem"
        },
        quickShop: {
            EN: "Quick Shop",
            VN: "Thêm nhanh"
        },
        home: {
            EN: "Home",
            VN: "Trang chủ"
        },
        products: {
            EN: "Products",
            VN: "Sản phẩm"
        },
        orders: {
            EN: "Orders",
            VN: "Đơn hàng"
        },
        price: {
            EN: "Price",
            VN: "Giá"
        },
        quantity: {
            EN: "Quantity",
            VN: "Số lượng"
        },
        total: {
            EN: "Total",
            VN: "Tổng"
        },
        checkOut: {
            EN: "Check Out",
            VN: "Thanh toán"
        },
        order: {
            EN: "Order",
            VN: "Đặt hàng"
        },
        name: {
            EN: "Name",
            VN: "Tên"
        },
        phone: {
            EN: "Phone",
            VN: "Số điện thoại"
        },
        address: {
            EN: "Address",
            VN: "Địa chỉ"
        },
        submit: {
            EN: "Submit",
            VN: "Thêm"
        },
        shoppingCart: {
            EN: "Shopping Cart",
            VN: "Giỏ hàng"
        },
        goToCart: {
            EN: "Go to Cart",
            VN: "Đến giỏ hàng"
        },
        
    }

    return <span>{dataMessenge[name][language]}</span>


    
}

export default Messenge
