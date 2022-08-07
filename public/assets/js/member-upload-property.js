$(document).ready(function () {
    // alert()
    // SaveProperty()
})

 function SaveProperty() {
    let name="test"; let builder="test"; let address="test"; let addressHeading="test"; let description="test"; let shortDescription="test"; let RERA="test"; let projectArea="test"; let size="test"; let flat="test"; let avgPrice="test"; let totalBlocks="test"; let propertyVideo="test"; let propertyLocation="test"; let propertyStatus="SALE"; let propertyType="VILLAS"; let propertyBHK="1"; let isTopProperty=false; let isExclusiveProperty=false; let isPopularProperty=false; let propertyAmenities=["test"];let img_url=["tesssg"];

    let postData = {
name, builder, address, addressHeading, description, shortDescription, RERA, projectArea, size, flat, avgPrice, totalBlocks, propertyVideo, propertyLocation, propertyStatus, propertyType, propertyBHK, isTopProperty, isExclusiveProperty, isPopularProperty, propertyAmenities, img_url
    }
    $.ajax({
        url: 'http://localhost:3000/api/v1/' + 'property',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(postData),
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