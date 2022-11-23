let tltle = document.getElementById('tltle')
let price = document.getElementById('price')
let texes = document.getElementById('texes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let mood = 'creat'
let tmp;
// get total 
function getTotal() {
    if (price.value != ''){
        let result = (+price.value + +texes.value + +ads.value)
        - discount.value;
        total.innerHTML = result;
        total.style.background = '#39e904e2'
    }
    else {
        total.innerHTML = '';
        total.style.background ='#a00d02';
    }
}
// creat product
let datapro;
if(localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
}
else {
    datapro = [];
}
submit.onclick = function () {
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        texes:texes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(mood === 'creat') {
        if(newpro.count > 1){
            for(let i = 0; i < newpro.count;i++){
                datapro.push(newpro);
            }
        }else{
            datapro.push(newpro);
        }
    }
    else {
        datapro[tmp] = newpro
        mood = 'creat'
        submit.innerHTML = 'creat'
        count.style.display = 'block'
    }   
    //save storge
    localStorage.setItem('product', JSON.stringify(datapro))
    clearData()
    showdata()
}
// clear input
function clearData(){
    title.value = '';
    price.value = '';
    texes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// read
function showdata(){
    let table = '';
    for(let i = 0; i < datapro.length;i++){
        table += `
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].texes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick ="updatedata(${i})" id="ubdate">update</button></td>
                <td><button onclick ="deletedata(${i})" id="Delete">Delete</button></td>
            </tr>
            `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(datapro.length > 0){
        btnDelete.innerHTML = `<button onclick=deleteAll()>Delete All(${datapro.length})</button>`;
    }
    else {
        btnDelete.innerHTML = '';
    }
    getTotal()
}
showdata()

// delete
function deletedata(i){
    datapro.splice(i,1)
    localStorage.product =JSON.stringify(datapro)
    showdata()
}
function deleteAll() {
    localStorage.clear
    datapro.splice(0)
    showdata()
}
// count
// ubdate
function updatedata(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    texes.value = datapro[i].texes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    getTotal()
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update'
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth' 
    })
}
// search
let searchMood = 'title';

function getsearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchtitle'){
        searchMood = 'Title';
    }else {
        searchMood = 'Category';
    }
    search.placeholder = 'Search By' +searchMood ;
    search.focus();
    search.value = '';
    showdata()
}
function searchData(value){
    let table = '';
    for (let i = 0; i < datapro.length;i++){
    if(searchMood == 'title'){
            if(datapro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].texes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick ="updatedata(${i})" id="ubdate">update</button></td>
                    <td><button onclick ="deletedata(${i})" id="Delete">Delete</button></td>
                </tr>
                `
            }
    }
    else{
            if(datapro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].texes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick ="updatedata(${i})" id="ubdate">update</button></td>
                    <td><button onclick ="deletedata(${i})" id="Delete">Delete</button></td>
                </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
// clean data