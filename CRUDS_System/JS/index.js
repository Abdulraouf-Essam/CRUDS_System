var Product_Name_Input = document.getElementById("Product_Name_Input");
var Product_Price_Input = document.getElementById("Product_Price_Input");
var Product_Category_Input = document.getElementById("Product_Category_Input");
var Product_Description_Input = document.getElementById("Product_Description_Input");
var Add_button = document.getElementById("Add_button");
var Edit_button = document.getElementById("Edit_button");
var Clear_Input_Button = document.getElementById("Clear_Input_Button");
var Input_Search = document.getElementById("Input_Search");
var Index_Update_Input;

var Product_List = [];

Edit_button.style.display = "none";

Add_button.addEventListener("click", function () {
    Add_Products();
})

Input_Search.addEventListener("input", function (Event_info) {
    Search_Product(Event_info.target.value)
})

Edit_button.addEventListener("click", function () {
    Asign_Update_Product();
})

Clear_Input_Button.addEventListener("click", function () {
    Clear_Input();
})

if (localStorage.getItem("Product_List") != null) {
    Product_List = JSON.parse(localStorage.getItem("Product_List"));
    Diplay_Product();
}

function Add_Products() {
    if (Validat_Product_Name()) {
        var Obj = {
            Name: Product_Name_Input.value,
            Price: Product_Price_Input.value,
            Category: Product_Category_Input.value,
            Description: Product_Description_Input.value
        }

        Product_List.push(Obj);
        localStorage.setItem("Product_List", JSON.stringify(Product_List));
        Diplay_Product();
        Clear_Input();
    }
    else alert("The Product Name invalid, please Enter first Character capital and name is less than 16 character");
}

function Delete_Product(Index_Delete) {
    Product_List.splice(Index_Delete, 1);
    localStorage.setItem("Product_List", JSON.stringify(Product_List));
    Diplay_Product();
}

function Update_Product(Index_Update) {
    Product_Name_Input.value = Product_List[Index_Update].Name;
    Product_Price_Input.value = Product_List[Index_Update].Price;
    Product_Category_Input.value = Product_List[Index_Update].Category;
    Product_Description_Input.value = Product_List[Index_Update].Description;

    Index_Update_Input = Index_Update;

    Edit_button.style.display = "inline";
    Add_button.style.display = "none";
}

function Asign_Update_Product() {

    var Obj_Input = {
        Name: Product_Name_Input.value,
        Price: Product_Price_Input.value,
        Category: Product_Category_Input.value,
        Description: Product_Description_Input.value,
    }

    Product_List[Index_Update_Input] = Obj_Input;

    Edit_button.style.display = "none";
    Add_button.style.display = "inline";

    localStorage.setItem("Product_List", JSON.stringify(Product_List));
    Diplay_Product();
}

function Diplay_Product() {

    var Result = "";

    for (var i = 0; i < Product_List.length; i++) {
        Result +=
            ` <tr>
                    <td>${i + 1}</td>
                    <td>${Product_List[i].Name}</td>
                    <td>${Product_List[i].Price}</td>
                    <td>${Product_List[i].Category}</td>
                    <td>${Product_List[i].Description}</td >
                    <td>
                        <button class="btn btn-sm btn-outline-info" 
                        onclick="Update_Product(${i})">Update</button>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-danger" onclick="Delete_Product(${i})">delete</button>
                    </td>
            </tr > `

        //     ` < tr >
        //          <td>`+ (i + 1) + `</td>
        //          <td>`+ Product_List[i].Name + `</td>
        //          <td>`+ Product_List[i].Price + `</td>
        //          <td>`+ Product_List[i].Category + `</td>
        //          <td>`+ Product_List[i].Description + `</td>
        //          <td>
        //              <button class="btn btn-outline-info oncli" onclick="Update_Product(`+ i + `)">Update</button>
        //          </td>
        //          <td>
        //              <button class="btn btn-outline-danger" onclick="Delete_Product(`+ i + `)">delete</button>
        //          </td>
        //      </>`
    }

    document.getElementById("Table_Body").innerHTML = Result;
}

function Search_Product(Word_Search) {

    var Result = "";
    for (var i = 0; i < Product_List.length; i++) {
        if (Product_List[i].Name.toLowerCase().includes(Word_Search.toLowerCase())) {
            Result +=
                ` <tr>
                    <td>${i + 1}</td>
                    <td>${Product_List[i].Name.toLowerCase().replace(Word_Search, "<span class = 'text-danger'>" + Word_Search + "</span>")}
                    <td>${Product_List[i].Price}</td>
                    <td>${Product_List[i].Category}</td>
                    <td>${Product_List[i].Description}</td >
                    <td>
                        <button class="btn btn-sm btn-outline-info" 
                        onclick="Update_Product(${i})">Update</button>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-danger" onclick="Delete_Product(${i})">delete</button>
                    </td>
                </tr > `
        }
    }

    document.getElementById("Table_Body").innerHTML = Result;
}

function Clear_Input() {
    Product_Name_Input.value = '';
    Product_Price_Input.value = '';
    Product_Category_Input.value = '';
    Product_Description_Input.value = '';

    Edit_button.style.display = "none";
    Add_button.style.display = "inline";
}

function Validat_Product_Name() {
    var regex = /^[A-Z][a-z]{3,15}$/;
    return regex.test(Product_Name_Input.value);
}
