const EditProduct = (id, info) => {
    return{
        type: 'EDIT_PRODUCT',
        id,
        info
    }
}

export default EditProduct