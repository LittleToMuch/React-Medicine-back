const permissionReducer = (state = 0, action) => {
    console.log(action)
    switch (action.type) {
        case 'DOCTOR':
            return 1
        case 'ADMIN':
            return 2
        default:
            return 0
    }
}

export default permissionReducer