$(document).ready(function () {
   
$(".p_addr").val('')
$(".p_info").val('')
    // alert()
    // SaveProperty()
})
var img_url = [];
var errorMsg = [];
function totalSqft(){
    let toatal = $(".p_size_l").val()*$(".p_size_b").val();
    $(".p_size_total").val(`${toatal} Sq.ft`);
}
function uploadImgToAws() {
    let postData = new FormData();
    console.log("len", $('#p_image')[0].files.length);
    if ($('#p_image')[0].files.length < 4) {
        alert("Please upload minimum 5 images to get great User Experience")
    }
    $.each($('#p_image')[0].files, function (i, file) {
        postData.append('file', file);
    });
    console.log("postData", postData);

    $.ajax({
        url: 'http://localhost:3000/api/v1/uploads/files?path=property',
        type: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: postData,
        success: function (res) {
            console.log("resp", res);
            if (res.status) {
                img_url = res.data
                return res.data
            }
        },
        error: function (err) {
            console.log(err);
            alert("Upload Failed!!!Try again")
        }
    });
}


function SaveProperty(e) {
    errorMsg = [];
    e.preventDefault();
    console.log("Submit called");

    let name = $(".p_title").val();
    let builder = $(".p_builder").val();
    let propertyStatus = $(".p_status:checked").val() ? $(".p_status:checked").val() : "SALE";
    let propertyType = $(".p_type:checked").val() ? $(".p_type:checked").val() : "APARTMENT";
    let country = $(".selectCountry").val();
    let countryName =$("."+country).html().toString().trim();
    let city = $(".p_city").val();
    let address = $(".p_addr").val();
    let description = $(".p_info").val();
    let RERA = $(".p_rera").val();
    let propertyAreaAcre = $(".p_area").val();
    let propertyAreaLen = $(".p_size_l").val();
    let propertyAreaBre = $(".p_size_b").val();
    let totalBlocks = $(".p_blocks").val();
    let avgPricePerSqft = $(".p_avg_price").val();
    let totalPrice = $(".p_total_price").val();
    let mapLink = $(".p_location").val();
    let status = $(".p_fOrL:checked").val();
    let propertyVideo = $(".p_video").val();
    var p_bhk = [];
    
    if ($(".p_bhk_input:checked").length) {
        $(".p_bhk_input:checked").each((_, i) => {
            if (!p_bhk.includes($(i).val())) {
                p_bhk.push($(i).val())
            }
        })
    }
    var p_features = [];
    if ($(".p_features:checked").length) {
        $(".p_features:checked").each((_, i) => {
            if (!p_features.includes($(i).val())) {
                p_features.push($(i).val())
            }
        })
    }
    var p_category = [];
    if ($(".p_category:checked").length) {
        $(".p_category:checked").each((_, i) => {
            if (!p_category.includes($(i).val())) {
                p_category.push($(i).val())
            }
        })
    }

    
    if (!name) errorMsg.push("Propery title is required")
    if (!builder) errorMsg.push("Builder name is required")
    if (!country) errorMsg.push("Please select your country")
    if (!city) errorMsg.push("City name is required")
    if (!address) errorMsg.push("Please enter property address")
    if (!description) errorMsg.push("Enter few lines about the property")
    if (!propertyAreaAcre && !propertyAreaLen && !propertyAreaBre) errorMsg.push("Please fill Property Size either in Acres or Sq.ft")
    if (!avgPricePerSqft) errorMsg.push("Please enter price per sq.ft")
    if (!totalPrice) errorMsg.push("Enter your total price offerings")

    if(propertyAreaLen && !propertyAreaBre || !propertyAreaLen && propertyAreaBre){
        errorMsg.push("Please mention property length and breadth")
    }
    var propertyAreaSqFt 
    if(propertyAreaLen && propertyAreaBre){
         propertyAreaSqFt = propertyAreaLen*propertyAreaBre;
        $(".p_size_total").val(propertyAreaSqFt)
    }
    if (!$(".submitErrorDiv").hasClass('d-none')) {
        $(".submitErrorDiv").addClass('d-none');
    }
    errorMsg =[...new Set(errorMsg)]
    
    if (errorMsg.length) {  
        $(".submitErrorDiv").removeClass('d-none');
        let erSpan = "<span>Please complete following mandatory fields :-</span><br>"
        errorMsg.forEach((i, index) => {
            erSpan += `<span>${index + 1}. ${i}</span><br>`
        })
        $(".submitErrorSmDiv").html(erSpan)
        return
    }
    let totalPriceSQft = avgPricePerSqft*($(".p_size_total").val())
    console.log("country",$(`.${country}`).html());
    let propData = {
        name,
        builder,
        address,
        addressHeading:city+" "+countryName,
        countryCode:country,
        countryName,
        city,
        description,
        RERA,
        propertyAreaLen,
        propertyAreaBre,
        propertyAreaSqFt,
        propertyAreaAcre,
        flat_or_bhk:p_bhk,
        avgPricePerSqft,
        totalPriceSQft,
        quotePrice:totalPrice,
        totalBlocks,
        status,
        propertyStatus,
        propertyType,
        p_category,
        // isTopProperty,Backend Handle
        // isExclusiveProperty,
        // isPopularProperty,
        // isCommercialProperty,
        propertyAmenities:p_features,
        img_url,
        propertyVideo,
        page_url:name.split(" ").join("-"),
        mapLink
    }
    console.log("propData",propData);

  
        $.ajax({
            url: 'http://localhost:3000/api/v1/' + 'property',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(propData),
            success: function (res) {
                console.log("resp", res);
                if (res.status) {
                    return res.data
                }

            },
            error: function (err) {
                console.log(err);
            }
        });
}