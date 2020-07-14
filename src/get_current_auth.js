export const current_auth = {

    get_current_auth: function(){
    return {
        role: localStorage.getItem("role"),
        id: parseInt(localStorage.getItem("id")),
        token: localStorage.getItem("token"),
        name: localStorage.getItem("name"),
        is_blocked_by_admin: localStorage.getItem("is_blocked_by_admin"),
        blocked_deadline: localStorage.getItem("blocked_deadline")
    }
    }
}

export default current_auth;