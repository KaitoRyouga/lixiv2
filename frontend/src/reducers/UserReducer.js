const initState = [
    {
        "displayName": "",
        "email": "",
        "phoneNumber": "",
        "uid": "",
        "type": ""
    }
]

const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ALL_USER':
            const data = action.info
            return data
        case 'ADD_USER':
            const typeLogin = action.info
            let login = {
                displayName: typeLogin.displayName,
                email: typeLogin.email,
                phoneNumber: typeLogin.phoneNumber,
                uid: typeLogin.uid
            }
            const newOrder = [login]

            return newOrder
        case 'USER_LOGOUT':
            return initState
        default:
            return state;
    }

}

export default UserReducer