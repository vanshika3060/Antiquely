import axios from "axios";
import { post } from "../../config";

const PRODUCTS_ROUTE = "/product/handler";
const PRODUCTS_DEFAULT_DATA = {
    "table": "products",
};

const BIDS_ROUTE = "/bid/handler";
const BIDS_DEFAULT_DATA = {
    "table": "bids",
};

const createProducts = (info) => {
    return post(PRODUCTS_ROUTE, {
        ...PRODUCTS_DEFAULT_DATA,
        "action": "CREATE_NEW_PRODUCT",
        "data": info.data
    });
};

const getAllProducts = (info) => {
    return post(PRODUCTS_ROUTE,{
        ...PRODUCTS_DEFAULT_DATA,
        "action": "GET_ALL_PRODUCTS"
    })
}

const getProductById = (info) => {
    return post(PRODUCTS_ROUTE,{
        ...PRODUCTS_DEFAULT_DATA,
        "action": "GET_SPECIFIC_PRODUCT",
        "data": {
            "product_id": info.product_id
        }
    })
}

const getUserSpecificProducts = (info) => {
    return post(PRODUCTS_ROUTE,{
        ...PRODUCTS_DEFAULT_DATA,
        "action": "GET_USER_SPECIFIC_PRODUCT",
        "data" : {
            "user_id" : info.user_id
        }
    })
}

const getUserSpecificBids = (info) => {
    return post(BIDS_ROUTE,{
        ...BIDS_DEFAULT_DATA,
        "action": "GET_USER_SPECIFIC_BID",
        "data" : {
            "user_id" : info.user_id
        }
    })
}

const generatePreSignedURLProducts = (info) => {
    return post(PRODUCTS_ROUTE, {
        ...PRODUCTS_DEFAULT_DATA,
        "action": "GEN_PRE_SIGNED_URL_PRODUCT_IMG_UPLOAD",
        "data": {
            "product_image_file_name": info.product_image_file_name
        }
    })
}

const uploadFileToS3 = (info) => {
    return axios({
        method: "PUT",
        url: info.url,
        data: info.data,
        headers: { "Content-Type": "multipart/form-data" }
    });
}

const createBids = (info) => {
    return post(BIDS_ROUTE, {
        ...BIDS_DEFAULT_DATA,
        "action": "CREATE_NEW_BID",
        "data": info.data
    });
};

export const api = {
    getAllProducts,
    createProducts,
    getUserSpecificBids,
    getUserSpecificProducts,
    getProductById,
    generatePreSignedURLProducts,
    uploadFileToS3,
    createBids
};