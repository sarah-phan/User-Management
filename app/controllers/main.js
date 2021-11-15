var service = new UserService();

function getEleId(id){
    return document.getElementById(id);
}
function getEleClass(className){
    return document.getElementsByClassName(className);
}

// Lấy thông tin từ API
function getListUser(){
    service.getListUserApi()
    .then(function(result){
        renderData(result.data);
    })
    .catch(function(error){
        console.log(error);
    })
}
getListUser();

// Show thông tin ra ngoài màn hình
function renderData(data){
    var content = "";
    data.forEach(function(item, index){
        content += `
        <tr>
            <td>${index+1}</td>
            <td>${item.taiKhoan}</td>
            <td>${item.matKhau}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.ngonNgu}</td>
            <td>${item.loaiND}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser(${item.id})">Delete</button>
            </td>
        </tr>
        `;
    })
    getEleId("tblDanhSachNguoiDung").innerHTML = content;
}

// Xóa đối tượng
function deleteUser(id){
    service.deleteUser(id)
    .then(function(){
        getListUser();
        alert("Delete success");
    })
    .catch(function(error){
        alert(error);
    })
}

// Tạo form cho thêm user
getEleId("btnThemNguoiDung").addEventListener("click", function(){
    getEleClass("modal-title")[0].innerHTML = "Add user information";

    var footerModal = `
    <button class="btn btn-info">Add user</button>
    `;
    getEleClass("modal-footer")[0].innerHTML = footerModal;
});

function addUser(){
    var taiKhoan = getEleId("TaiKhoan").value;
}