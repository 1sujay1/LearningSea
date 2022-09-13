$(document).ready(function () {
    $.ajax({
        url: `${apiVersion}property`,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        // data: JSON.stringify(propData),
        success: function (res) {
            console.log("resp", res);
            if (res.status) {
                let itemType1 = "";
                let itemType2 = "";
                let dropDownprop="";
                res.data.forEach(itm=>{
                    let itmDesc = "Property : "+itm.name +","+ itm.description;
                    let itmDescSplit = itmDesc.split(" ");
                    if(itmDescSplit.length>12){
                        itmDesc ="Property : "+itm.name+",";
                        for(let i=0;i<12;i++){
                            itmDesc+=splitdata[i]+" "
                        }
                    }
                    let modSize = "";
                    let sizeCount=0;
                    if(itm.propertyAreaAcre){
                        sizeCount = itm.propertyAreaAcre
                        modSize = itm.propertyAreaAcre +" Acres "
                    }else{
                        sizeCount = itm.propertyAreaSqFt
                        modSize = itm.propertyAreaSqFt +" Sq.Ft "+"("+itm.propertyAreaLen+"x"+itm.propertyAreaBre+")"
                    }
                    itmDesc+=`,Property Size of  ${modSize } located in ${itm.city}, in ${itm.countryName}, click to read more`
                    
                    let bhkCount = "3";
                    if(itm.flat_or_bhk.length ==1){
                        bhkCount=itm.flat_or_bhk[0]
                    }
                    if(itm.flat_or_bhk.length>1){
                        bhkCount=""
                        itm.flat_or_bhk.forEach((itm,i)=>{
                            if(i<2){
                                bhkCount+=itm+","
                            }
                        })
                    }
                    itemType1+=`
                    
                    <div class="property-listing-list wow fadeInDown delay-07s">
                                                <a href="/property/${itm.page_url}">
                                                    <div class="col-xs-12 col-sm-12 col-md-6 nopadd">
                                                        <span class="ribbon">
                                                            ${itm.status}
                                                        </span>
                                                        <img class="img-responsive " src="${imgUrlBasePath}${itm.img_url[0]}">
                                                        </img>
                                                        <span class="card-title">
                                                            3000 / Monthly
                                                        </span>
                                                        <span class="card-price">
                                                            For ${itm.propertyStatus}
                                                        </span>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-12 col-md-6 nopadd">
                                                        <div class="content-block">
                                                            <span class="label label-success">
                                                                ${itm.propertyType}
                                                            </span>
                                                            <h4>
                                                            ${itmDesc}
                                                            </h4>
                                                        </div>
                                                        <ul class="list-inline area-info">
                                                            <li>
                                                                <span>
                                                                    <i class="fa fa-map-o">
                                                                    </i>
                                                                </span>
                                                                <span class="text">
                                                                    ${sizeCount} M
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <i class="fa fa-building">
                                                                    </i>
                                                                </span>
                                                                <span class="text">
                                                                    ${sizeCount} M
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <i class="fa fa-bed">
                                                                    </i>
                                                                </span>
                                                                <span class="text">
                                                                    ${bhkCount}  BED ROOM
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <i class="fa fa-female">
                                                                    </i>
                                                                </span>
                                                                <span class="text">
                                                                    ${bhkCount} BATH ROOM
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </a>
                                            </div>
                    `

                    itemType2+=`
                    <div class="col-xs-12 col-sm-12 col-md-6">
                    <div class="item">
                        <a href="/property/${itm.page_url}" target="_blank">
                            <div class="card">
                                <div class="card-image">
                                    <span class="ribbon">
                                    ${itm.status}
                                    </span>
                                    <img alt="" class="img-responsive property-image" src="${imgUrlBasePath}${itm.img_url[0]}">
                                        <span class="card-title">
                                            3000 / Monthly
                                        </span>
                                        <span class="card-price">
                                            For ${itm.propertyStatus}
                                        </span>
                                    </img>
                                </div>
                                <div class="card-content">
                                    <div class="listingInfo">
                                        <div class="vcard">
                                            <span class="label label-success">
                                            ${itm.propertyType}
                                            </span>
                                            <div class="title-properti">
                                                <h4>
                                                ${itmDesc}                                               
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-spec">
                                    <div class="area" data-placement="top" data-toggle="tooltip" title="surface area">
                                        <strong>
                                            <i class="fa fa-map-o">
                                            </i>
                                        </strong>
                                        <span class="text">
                                        ${sizeCount} M
                                        </span>
                                        <sup>
                                            2
                                        </sup>
                                    </div>
                                    <div class="area" data-placement="top" data-toggle="tooltip" title="building area">
                                        <strong>
                                            <i class="fa fa-building">
                                            </i>
                                        </strong>
                                        <span class="text">
                                        ${sizeCount} M
                                        </span>
                                        <sup>
                                            2
                                        </sup>
                                    </div>
                                    <div class="area" data-placement="top" data-toggle="tooltip" title="Bed Room">
                                        <strong>
                                            <i class="fa fa-bed">
                                            </i>
                                        </strong>
                                        <span class="text">
                                        ${bhkCount}
                                        </span>
                                        <sup>
                                            Bed Room
                                        </sup>
                                    </div>
                                    <div class="area" data-placement="top" data-toggle="tooltip" title="Bath Room">
                                        <strong>
                                            <i class="fa fa-female">
                                            </i>
                                        </strong>
                                        <span class="text">
                                        ${bhkCount}
                                        </span>
                                        <sup>
                                            Bathroom
                                        </sup>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                    `
                    dropDownprop+=`
                    <option value="${itm.page_url}">
                    ${itm.name}
                    </option>
                    `;

                })
                document.querySelector(".itemType1").innerHTML=itemType1
                document.querySelector(".itemType2").innerHTML=itemType2
                document.querySelector(".dropDownprop").innerHTML=dropDownprop
            }

        },
        error: function (err) {
            console.log(err);
        }
    });
})

function pDetailRedi(){
    let pagrUrl = $(".dropDownprop").val();
    window.open(serverPath+pagrUrl)
}