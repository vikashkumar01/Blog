export const LoginStart = (userCreadential) => ({

     type: "LOGIN_START",
})

export const LoginSuccess = (user) => ({

    type: "LOGIN_SUCCESS",
    payload: user
})

export const LoginFailure = (user) => ({

    type: "LOGIN_FAILURE"
})

export const Logout = () => ({

    type: "LOGOUT"
})


export const UpdateStart = (userCreadential) => ({

    type: "UPDATE_START",
})

export const UpdateSuccess = (user) => ({

   type: "UPDATE_SUCCESS",
   payload: user
})

export const UpadteFailure = (user) => ({

   type: "UPDATE_FAILURE"
})
