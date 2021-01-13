const EditCart = (id, count) => {
    return{
        type: 'EDIT_CART',
        id,
        count
    }
}

export default EditCart