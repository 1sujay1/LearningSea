
const fs = require('fs')

function profileFolder(path) {
    let Folderpath = path;

    if (!fs.existsSync(Folderpath)) {
        fs.mkdirSync(Folderpath);
        fs.mkdirSync('public/uploads/profile/xs/');
        fs.mkdirSync('public/uploads/profile/sm/');
        fs.mkdirSync('public/uploads/profile/md/');
    }

    return Folderpath;
}

function profileCoverFolder(path) {
    let Folderpath = path;

    console.log(Folderpath);


    if (!fs.existsSync(Folderpath)) {
        fs.mkdirSync(Folderpath);
    }

    return Folderpath;
}
function propertyFolder(path) {
    let Folderpath = path;

    console.log(Folderpath);


    if (!fs.existsSync(Folderpath)) {
        fs.mkdirSync(Folderpath);
    }

    return Folderpath;
}

function pdfFolder(path) {
    let Folderpath = path;

    if (!fs.existsSync(Folderpath)) {
        fs.mkdirSync(Folderpath);
    }

    return Folderpath;
}

function postFolder(folderPath) {

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        fs.mkdirSync(folderPath + 'video/');
        fs.mkdirSync(folderPath + 'image/');
        fs.mkdirSync(folderPath + 'document/');
    } else {
        return true;
    }

    return folderPath;

}

const getFolderByMime = (fileOriginalName) => {
    if ((/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(fileOriginalName)) {
        return 'image';
    } else if ((/\.(mp4)$/i).test(fileOriginalName)) {
        return 'video';
    } else if ((/\.(pdf)$/i).test(fileOriginalName)) {
        return 'document';
    } else {
        return false;
    }
}

const deleteImageDisk = (fileName) => {
    const path = `public/uploads/${fileName}`;
    if (fileName && fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const deletePdfDisk = (fileName) => {
    const path = `public/uploads/pdf/${fileName}`;
    if (fileName && fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const deletePostFiles = (file, filename) => {
    const path = file;
    if (filename && fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

// Accepts the array and key
const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
    }, {}); // empty object is the initial value for result object
};

const randomDigits = (length) => {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
}

const trimTextLength = (content, length) => {
    var trimmedString = content.substring(0, length);
    return trimmedString + '...';
}


module.exports = {
    profileFolder,
    postFolder,
    profileCoverFolder,
    pdfFolder,
    propertyFolder,
    deleteImageDisk,
    deletePdfDisk,
    deletePostFiles,
    getFolderByMime,
    groupBy,
    randomDigits,
    trimTextLength
};