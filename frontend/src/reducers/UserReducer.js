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
            
            try {
                const typeLogin = action.info
                let login = {
                    displayName: typeLogin.displayName,
                    email: typeLogin.email,
                    phoneNumber: typeLogin.phoneNumber,
                    uid: typeLogin.uid
                }
                const newOrder = [login]
                axios.post(`https://${process.env.REACT_APP_API}/user`, login).then(res => console.log(res)).catch(err => console.log(err))
    
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