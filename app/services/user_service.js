function UserService(){
    this.getListUserApi = function(){
        return axios({
            url: "https://6183cae591d76c00172d1b53.mockapi.io/api/teacher",
            method: "GET",
        });
    };

    this.deleteUser = function(id){
        return axios({
            url: `https://6183cae591d76c00172d1b53.mockapi.io/api/teacher/${id}`,
            method: "DELETE",
        });
    };

    this.addUser = function(user){
        return axios({
            url: "https://6183cae591d76c00172d1b53.mockapi.io/api/teacher",
            method: "POST",
            data: user,
        });
    };
    
    this.getListUserById = function(id){
        return axios({
            url: `https://6183cae591d76c00172d1b53.mockapi.io/api/teacher/${id}`,
            method: "GET",
        });
    };

    this.updateUser = function(user){
        return axios({
            url: `https://6183cae591d76c00172d1b53.mockapi.io/api/teacher/${user.id}`,
            method: "PUT",
            data: user,
        })
    }
}