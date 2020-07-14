
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
    },

    set_current_auth:function f(data) {
        var res = JSON.parse(data.responseText)
      //  alert(JSON.stringify(res))
      localStorage.setItem("role", res.role);
        localStorage.setItem("id",res.id);
        localStorage.setItem("token",res.token);
        localStorage.setItem("name",res.name);
        localStorage.setItem("is_blocked_by_admin",res.is_blocked_by_admin);
        localStorage.setItem("blocked_deadline",res.blocked_deadline);
    },

}

export default current_auth;