const updateUser = (user) => {
    return {
        type: "UPDATE_USER",
        data: user
    }
}
const removeUser = (user) => {
    return {
        type: "REMOVE_USER"
    }
}

export {
    updateUser,
    removeUser
}