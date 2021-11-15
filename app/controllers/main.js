var service = new UserService();
var validation = new Validation();

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
        // console.log(result);
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
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editUser(${item.id})">Edit</button>
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
    <button class="btn btn-info" onclick="addUser()">Add user</button>
    `;
    getEleClass("modal-footer")[0].innerHTML = footerModal;
});

// Thêm đối tượng user
function addUser(){
    var taiKhoan = getEleId("TaiKhoan").value;
    var hoTen = getEleId("HoTen").value;
    var matKhau = getEleId("MatKhau").value;    
    var email = getEleId("Email").value;
    var hinhAnh = getEleId("HinhAnh").value;
    var loaiND = getEleId("loaiNguoiDung").value;
    var ngonNgu = getEleId("loaiNgonNgu").value;
    var moTa = getEleId("MoTa").value;

    var isValid = true;

    isValid &= validation.checkEmpty(taiKhoan, "Tài khoản không được để trống", "tbTK");

    isValid &= validation.checkEmpty(hoTen, "Họ Tên không được để trống", "tbHT") && validation.checkName(hoTen, "Họ Tên là kiểu chữ không chứa số và ký tự đặc biệt", "tbHT");

    isValid &= validation.checkEmpty(matKhau, "Mật Khẩu không được để trống", "tbMK") && validation.checkPass(matKhau, "Mật Khẩu phải chứa 1 ký tự số, 1 ký tự đặc biệt và 1 ký tự in hoa, dài 6-8", "tbMK");

    isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") && validation.checkEmail(email, "Email đúng định dạng", "tbEmail");

    isValid &= validation.checkEmpty(hinhAnh, "Hình ảnh không được để trống", "tbHA");

    isValid &= validation.checkSelect("loaiNguoiDung", "Loại người dùng phải được chọn", "tbLND");

    isValid &= validation.checkSelect("loaiNgonNgu", "Loại ngôn ngữ phải được chọn", "tbNN");

    isValid &= validation.checkEmpty(moTa, "Mô Tả không được để trống", "tbMT") && validation.checkTextbox(moTa, "Mô Tả không được quá 60 ký tự", "tbMT");

    if (isValid){
        var user = new UserInformation("", taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);
    
        service.addUser(user)
        .then(function(){
            // console.log(result);
            getListUser();
            alert("Add success");
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function(error){
            console.log(error);
        })
    }
}

// Show thông tin để chỉnh sửa
function editUser(id){
    getEleClass("modal-title")[0].innerHTML = "Edit User Information";
    var footerModal = `
    <button class="btn btn-info" onclick="updateUser(${id})">Update</button>
    `;
    getEleClass("modal-footer")[0].innerHTML = footerModal;

    service.getListUserById(id)
    .then(function(result){
        getEleId("TaiKhoan").value = result.data.taiKhoan;
        getEleId("HoTen").value = result.data.hoTen;
        getEleId("MatKhau").value = result.data.matKhau;
        getEleId("Email").value = result.data.email;
        getEleId("HinhAnh").value = result.data.hinhAnh;
        getEleId("loaiNguoiDung").value = result.data.loaiND;
        getEleId("loaiNgonNgu").value = result.data.ngonNgu;
        getEleId("MoTa").value = result.data.moTa;
        // console.log(result);
    })
    .catch(function(error){
        console.log(error);
    })
}

// Cập nhật thông tin 
function updateUser(id){
    var taiKhoan = getEleId("TaiKhoan").value;
    var hoTen = getEleId("HoTen").value;
    var matKhau = getEleId("MatKhau").value;    
    var email = getEleId("Email").value;
    var hinhAnh = getEleId("HinhAnh").value;
    var loaiND = getEleId("loaiNguoiDung").value;
    var ngonNgu = getEleId("loaiNgonNgu").value;
    var moTa = getEleId("MoTa").value;

    var isValid = true;

    isValid &= validation.checkEmpty(taiKhoan, "Tài khoản không được để trống", "tbTK");

    isValid &= validation.checkEmpty(hoTen, "Họ Tên không được để trống", "tbHT") && validation.checkName(hoTen, "Họ Tên là kiểu chữ không chứa số và ký tự đặc biệt", "tbHT");

    isValid &= validation.checkEmpty(matKhau, "Mật Khẩu không được để trống", "tbMK") && validation.checkPass(matKhau, "Mật Khẩu phải chứa 1 ký tự số, 1 ký tự đặc biệt và 1 ký tự in hoa, dài 6-8", "tbMK");

    isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") && validation.checkEmail(email, "Email đúng định dạng", "tbEmail");

    isValid &= validation.checkEmpty(hinhAnh, "Hình ảnh không được để trống", "tbHA");

    isValid &= validation.checkSelect("loaiNguoiDung", "Loại người dùng phải được chọn", "tbLND");

    isValid &= validation.checkSelect("loaiNgonNgu", "Loại ngôn ngữ phải được chọn", "tbNN");

    isValid &= validation.checkEmpty(moTa, "Mô Tả không được để trống", "tbMT") && validation.checkTextbox(moTa, "Mô Tả không được quá 60 ký tự", "tbMT");

    if (isValid){
        var user = new UserInformation("", taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);
    
        service.addUser(user)
        .then(function(){
            // console.log(result);
            getListUser();
            alert("Update success");
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function(error){
            console.log(error);
        })
    }
}