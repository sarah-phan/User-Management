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
}