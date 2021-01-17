import axios from 'axios'

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
            // console.log(action.info.displayName)
            try {
                const typeLogin = action.info
                let login = {
                    displayName: typeLogin.displayName,
                    email: typeLogin.email,
                    phoneNumber: typeLogin.phoneNumber,
                    uid: typeLogin.uid
                }
                const newOrder = [login]
                // axios.post('http://localhost:3000/user', login).then(res => console.log(res)).catch(err => console.log(err))
    
                return newOrder
            } catch (error) {
                console.log(error)
                return state
            }
        case 'USER_LOGOUT':
            return initState
        default:
            return state;
    }

}

export default UserReducer