let data = [];
let filter_data_ = [];
const tbl_base = `<tr>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Mobile Number</th>
                        <th>Email address</th>
                        <th>Birthdate</th>
                        <th>Birthyear</th>
                    </tr>`
function check() {
    checkName('first_name', 'first_name_span');
    checkName('last_name', 'last_name_span');
    check_mobile();
    check_email();
    check_gender();
    check_date();
    object_new();
}
function checkName(fieldId, spanId) {
    let name = document.getElementById(fieldId).value;
    try{
        if (name != "") {
            if (isNaN(name) != 1) {
                document.getElementById(spanId).style.color = "Red";
                document.getElementById(spanId).innerHTML = "Name cannot be a numeric value";
            } else {
                let nameLength = name.length;
                if (nameLength > 3 && nameLength < 10) {
                    document.getElementById(spanId).style.color = "Green";
                    document.getElementById(spanId).innerHTML = "Name is valid";
                    return true;
                } else {
                    document.getElementById(spanId).style.color = "Red";
                    document.getElementById(spanId).innerHTML = "Name must be between 4 to 9 characters";
                }
            }
        } 
        else {
            document.getElementById(spanId).style.color = "Red";
            document.getElementById(spanId).innerHTML = "Please fill this field";
        }
    }
    catch(err_sentence){
        console.log("Invalid input !!!");
    }
}
function check_mobile() {
    let mobile_val = document.getElementById('mobile_number').value;
    if (mobile_val != "") {
        if (isNaN(mobile_val)) {
            // not valid
            document.getElementById('mobile_span').style.color = "Red";
            document.getElementById('mobile_span').innerHTML = "Mobile number must be numeric value";
        }
        else {
            let mobile_val_length = mobile_val.length;
            if (mobile_val_length == 10) {
                document.getElementById('mobile_span').style.color = "Green";
                document.getElementById('mobile_span').innerHTML = "Mobile number is valid";
                return true;
            }
            else {
                document.getElementById('mobile_span').style.color = "Red";
                document.getElementById('mobile_span').innerHTML = "Mobile number must contain 10 digits";
            }
        }
    }
    else {
        document.getElementById('mobile_span').style.color = "Red";
        document.getElementById('mobile_span').innerHTML = "Please fill this field";
    }
}
function check_email() {
  let email_value = document.getElementById('email_id').value;
  let emailRegex = /^[a-z0-9]+@gmail.com$/;
  if(email_value != ""){
    if(emailRegex.test(email_value)){
        document.getElementById('email_span').style.color = "Green";
        document.getElementById('email_span').innerHTML = "Email is valid";
        return true;
      }
      else {
            document.getElementById('email_span').style.color = "Red";
            document.getElementById('email_span').innerHTML = "Email must contain @gmail.com";
      }
  }
  else{
            document.getElementById('email_span').style.color = "Red";
            document.getElementById('email_span').innerHTML = "Please fill this field";
  }
}
function check_gender() {
    let gender_value = document.querySelector('input[name = Gender]:checked').value;
    return true;
}
function check_date(){
    let date_value = document.getElementById('birth_date').value;
    if(date_value != ""){
        document.getElementById('birth_span').style.color = "Green";
        document.getElementById('birth_span').innerHTML = "Input is valid";       
        return true;
    }
    else{
        document.getElementById('birth_span').style.color = "Red";
        document.getElementById('birth_span').innerHTML = "Please fill this field";       
    }
}   
class Person {
    constructor(fName, lName, mobile_val, email_value, gender_value, birth_value) {
        this.Fullname = fName + " " + lName;
        this.Mobile_number = mobile_val;
        this.Email = email_value;
        this.Gender = gender_value;
        this.Birth = birth_value;
        this.Year_value = this.Birth.substring(0, 4);
    }
}
function object_push(fName, lName, mobile_val, email_value, gender_value, birth_value) {
    let temp_obj = new Person(fName, lName, mobile_val, email_value, gender_value, birth_value);
    data.push(temp_obj);
    alert("Data added");
}
function object_new() {
    if (checkName('first_name', 'first_name_span') && checkName('last_name', 'last_name_span') && check_mobile() && check_email() && check_gender() && check_date()) {
        let fName = document.getElementById('first_name').value;
        let lName = document.getElementById('last_name').value;
        let mobile_val = document.getElementById('mobile_number').value;
        let email_value = document.getElementById('email_id').value;
        let gender_value = document.querySelector('input[name = Gender]:checked').value;
        let birth_value = document.querySelector('input[type="date"]').value;
        object_push(fName, lName, mobile_val, email_value, gender_value, birth_value);
    }
}
function show_data() {
    document.getElementById('table__').style.display = "block";
    let tbl = "";
    tbl += tbl_base;
        data.map((val, index, arr) => {
            tbl += `<tr>
                        <td>${data[index].Fullname}</td>
                        <td>${data[index].Gender}</td>
                        <td>${data[index].Mobile_number}</td>
                        <td>${data[index].Email}</td>
                        <td>${data[index].Birth}</td>
                        <td>${data[index].Year_value}</td>
                    </tr>`
        })
    if (data.length == 0) {
        alert("No data found");
    }
    else {
        alert("Data dispatched successfully scroll down to see data");
        document.getElementById('table_data').innerHTML = tbl;
    }
}
function filter_data() {
    filter_data_ = [];
    data.filter(function year_filter(val, index, arr) {
        if (data[index].Year_value >= 2000) {
            filter_data_.push(data[index]);
        }
    })
    document.getElementById('table__').style.display = "block";
    let tbl = "";
    tbl += tbl_base;
    filter_data_.map((val, index, arr) => {
        tbl += `
        <tr>
            <td>${filter_data_[index].Fullname}</td>
            <td>${filter_data_[index].Gender}</td>
            <td>${filter_data_[index].Mobile_number}</td>
            <td>${filter_data_[index].Email}</td>
            <td>${filter_data_[index].Birth}</td>
            <td>${filter_data_[index].Year_value}</td>
        </tr>
        `
    })
    if (filter_data_.length == 0) {
        alert("No such data with born year equal or above 2000")
    }
    else {
        alert("Data with born year equal or above 2000 is dispatched successfully scroll down to see data");
        document.getElementById('table_data').innerHTML = tbl;
    }
}
function clear_input() {
    document.getElementById('first_name').value = "";
    document.getElementById('last_name').value = "";
    document.getElementById('mobile_number').value = "";
    document.getElementById('email_id').value = "";
    let span_data = document.getElementsByTagName('span');
    for (let i = 0; i < span_data.length; i++){
            span_data[i].style.display = "none";
    }
}
