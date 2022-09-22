const loadData = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    const error = document.getElementById('error');
    // innerHTML Clear
    document.getElementById('detail-container').textContent = '';
    if (searchText == '') {
        // Error Message   
        error.innerText = 'Please give iPhone, Samsung, Oppo or Huawei products';
        searchInput.value = '';
        // innerHTML Clear
        document.getElementById('div-container').textContent = '';
    }
    else {
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayShow(data.data.slice(0, 15)));
        searchInput.value = '';
        error.innerText = '';
    }
}


/**********************************
 *********** Phone Show ***********
 **********************************/

const displayShow = phones => {
    // console.log(phones) ;
    const divContainer = document.getElementById('div-container');
    // innerHTML Clear
    divContainer.textContent = '';
    for (const phone of phones) {
        // console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col m-3"> 
            <div class="card w-100">
                <img src="${phone.image}" class="card-img-top w-100 p-5" alt="...">
                <div class="card-body"> 
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <button class="btn btn-info" onclick="phoneDetail('${phone.slug}')">Details</button>
                </div>
            </div>
        </div>
        `;
        divContainer.appendChild(div);
    }
}


// Find Phone Detail
const phoneDetail = details => {
    //  console.log(details)
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetail(data.data));
}



/**********************************
********** Phone Detail ***********
***********************************/

const displayDetail = phoneDetail => {
    // console.log(phoneDetail);
    document.getElementById('detail-container').innerHTML = `  
        <div class="card w-25">
            <img src="${phoneDetail.image}" class="card-img-top w-96 p-4 alt="...">
            <div class="card-body"> 
                <h2>Brand : ${phoneDetail.brand}</h2>
                <h3>Phone Name : ${phoneDetail.name}</h3> 
                <h5>Slug : ${phoneDetail.slug}</h5> 
                <h4>Release Date : ${phoneDetail.releaseDate}</h4>
                <p>Display Size : ${phoneDetail.mainFeatures.displaySize}</p>
                <p>Memory : ${phoneDetail.mainFeatures.memory}</p>
                <p>Storage : ${phoneDetail.mainFeatures.storage}</p>
                </br>
                 
                <p class="text-center">Others</p>
                <hr> 
                <p>WLAN : ${phoneDetail.others.WLAN}</p>
                <p>Bluetooth : ${phoneDetail.others.Bluetooth}</p>
                <p>GPS : ${phoneDetail.others.GPS}</p>
                <p>NFC : ${phoneDetail.others.NFC}</p>
                <p>Radio : ${phoneDetail.others.Radio}</p>
                <p>USB : ${phoneDetail.others.USB}</p>  
                </br>
 
                <p class="text-center">Sensors Option</p>
                <hr>
                <p>0 : ${phoneDetail.mainFeatures.sensors[0]}</p>
                <p>1 : ${phoneDetail.mainFeatures.sensors[1]}</p>
                <p>2 : ${phoneDetail.mainFeatures.sensors[2]}</p>
                <p>3 : ${phoneDetail.mainFeatures.sensors[3]}</p>
                <p>4 : ${phoneDetail.mainFeatures.sensors[4]}</p>
                <p>5 : ${phoneDetail.mainFeatures.sensors[5]}</p>
 
                <button class="btn btn-danger" onclick="closeDetail()">Close</buttom>
            </div>
        </div> 
    `;
}


/**********************************
************** Close **************
***********************************/
const closeDetail = () => {
    //  console.log(close); 
    document.getElementById('detail-container').textContent = '';
}





 