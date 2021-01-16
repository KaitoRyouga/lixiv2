const EditOrder = (id, info) => {
    return{
        type: 'EDIT_ORDER',
        id,
        info
    }
}

export default EditOrder