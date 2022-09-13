
let searchParams = new URLSearchParams(window.location.search)
let pNmeInSearch = searchParams.get("name");
let url = apiVersion + 'property?page_url=' + pNmeInSearch;
console.log("propertybefore");
dataFill(url);


async function dataFill(url) {
    var property = await asynAjaxCall(url);
    console.log("property", property);
    var sliderOneItem = "";
    var sliderTwoItem = "";
    $(".page_title").html(`${property.name} - Residential Buildings`)
    $(".main_p_title").html(property.name)
    $(".property-title-small").html(property.addressHeading)
    for (let i = 0; i < property.img_url.length; i++) {
        sliderOneItem += `
    <div class="item-box" style="background-image: url('${imgUrlBasePath}${property.img_url[i]}')">
            <div class="content">
                <div class="profile" style="background-image: url('${imgUrlBasePath}${property.img_url[i]}')">
                </div>
                <span>
                        by ${property.builder}
                </span>
                <span>
                    ${property.name}
                </span>
                <span>
                    ${property.city}, ${property.countryName}
                </span>
            </div>
        </div>
        `
        sliderTwoItem += `
        <div class="item" style="background-image: url(${imgUrlBasePath}${property.img_url[i]})"></div>
        `
    }
    document.querySelector(".sliderOneDiv").innerHTML += sliderOneItem
    document.querySelector(".sliderTwoDiv").innerHTML += sliderTwoItem

   let flatBhkTag= "Studio/1/2/3";
   if(property.flat_or_bhk.length){
    flatBhkTag="Studio"
    property.flat_or_bhk.forEach(flat=>{
        flatBhkTag+="/"+flat
    })
   }
   
    let tableCont = `
    <tbody>
        <tr>
            <th colspan="2" style="text-align: center;">PROPERTY DETAILS</th>
        </tr>
        <tr>
            <th style="width: 140px">Builder </th>
            <td>${property.builder}</td>
        </tr>
        <tr>
            <th>Address</th>
            <td>${property.address}</td>
        </tr>
        <tr>
            <th>RERA</th>
            <td> ${property.RERA}</td>
        </tr>
        <tr>
            <th> Project Area</th>
            <td>${property.propertyAreaAcre} Acres </td>
        </tr>
        <tr>
            <th> Size</th>
            <td>${property.propertyAreaLen}.00 sq.ft. - ${property.propertyAreaBre}.00 sq.ft.==>${property.propertyAreaSqFt} sq.ft</td>
        </tr>
        <tr>
            <th>Flat</th>
            <td>${flatBhkTag} BHK</td>
        </tr>
        <tr>
            <th> Avg Price</th>
            <td>₹${property.avgPricePerSqft}/sq.ft </td>
        </tr>
        <tr>
            <th>Total Blocks</th>
            <td>${property.totalBlocks}</td>
        </tr>
        <tr>
            <th>Status </th>
            <td>${property.status}</td>
        </tr>
    </tbody>
   `
    document.querySelector(".tableMain").innerHTML = tableCont
    // var ameneties = ["SWIMMING POOL WITH KIDS POOL", "GYM / OPEN GYM", "KIDS PLAY AREA", "MULTIPURPOSE HALL", "SQUASH COURT", "LIBRARY", "INDOOR GAMES", "TABLE TENNIS", "ELDER'S PARK"]
    var ameneties = property.propertyAmenities;

    let amenityCont = "";

    ameneties.forEach(itm => {
        amenityCont += `
    <li class="col-xs-12 col-sm-4 col-md-4">
        <i class="fa fa-chevron-circle-right">
        </i>
        ${itm}
    </li>
`
    })
    document.querySelector(".amenitiesUl").innerHTML = amenityCont;

    let ptyInfo = `
    <h5>
        <strong>
            Property Information
        </strong>
    </h5>
    <p>
        ${property.name} is a new residential project in ${property.addressHeading}.${property.propertyAreaAcre?`It is spread over an area of ​​about ${property.propertyAreaAcre}`:`It is vast spreaded area`} acres. 
        
        <br>
        <br> ${property.name} offers Studio Apartment. Studio, where available configurations include 1 BHK, 2 BHK, 3 BHK and much more. The studio apartment is ${property.propertyAreaLen}.0 - ${property.propertyAreaBre}.0 sq. ft as per the area plan. ${property.totalBlocks} buildings are available for sale. The project was launched in May 2022 and the possession date of Sattva Aeropolis is July 2026. Sattva Aeropolis is located in ${property.addressHeading} area. This project is developed by ${property.builder} Group. Many units are available for sale.

        ${property.name} has various residential-centric facilities including a gymnasium, and power backup. For families with children, apart from the swimming pool, there is also a dedicated children's play area. Residents can take advantage of the facilities in the scheme, the library. Enjoy the best-in-class lifestyle at ${property.name}.
        
        The scheme fulfills all the mandates of the state authority. 
        
        <br>
        ${property.RERA?" RERA ID of Satwa Aeropolis is ${property.RERA  Located close to the major suburbs of "+`${property.addressHeading}`+", the area has many amenities with major schools and hospitals nearby.":null}
       
    </p>
    `

    document.querySelector(".ptyInfoDiv").innerHTML = ptyInfo;

    // let video = "https://www.youtube.com/embed/vggW2Lss92w";
    let video = property.propertyVideo[0]
    let iframePtyVideo = `
    <iframe height="400" width="900" src="${video}" allowfullscreen="" ></iframe>
    `
    if (video) {
        $(".ptyVidContent").html(iframePtyVideo)
        $(".property-video-div").removeClass('d-none')
    }

}
function asynAjaxCall(url) {
    console.log("url", url);
    return new Promise(function (resolve, reject) {
        $.ajax({
            url,
            type: 'get',
            success: function (res) {
                console.log("resp", res);
                if (res.status) {
                    property = res.data[0];
                    property.name = JSON.stringify(property.name).toUpperCase()
                    resolve(property)
                }
                // window.location.replace('/properties')
            },
            error: function (err) {
                console.log(err);
                reject(err)
            }
        });
    })

}