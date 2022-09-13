const path =require('path')
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink)

const multer  = require('multer');
const {uploadFile,getFilyByKey,deleteFilyByKey}  = require('./awsController');
//Set Storage Engine
const storage = multer.diskStorage({
    destination:'./public/uploads/property',
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})

//Init Upload
const upload  =multer({storage:storage,limits:{fileSize:1000000}}).single('file');

var multiUploads = multer({ storage: storage }).any();


const awsMultiUpload = async function (req, res, next) {
    console.log("files",req.files);
    console.log("reqb",req.body);

    multiUploads(req, res, async function (err) {

        const folder = req.query.path;

        if (!folder)
            return res.json({ status: false, message: ['Path is required.'], data: [] })
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        const files = req.files;

        let awsListUpload = [];

        await Promise.all(files.map(async (file) => {
            const upres1 = await new Promise((resolve, reject) => {
                uploadFile(file, folder).then(awsres => {
                    resolve(awsres)
                }).catch(awserr => {
                    reject(awserr)
                });
            })
            awsListUpload.push(upres1.Key)
        }));

        if (awsListUpload && awsListUpload.length) {
            res.json({ status: true, message: ["Files uploaded successfully!!!"], data: awsListUpload })
        } else {
            res.json({ status: false, message: ["Not able to upload file"], data: [] })
        }
    });
}

function checkFileType(file,cb){
    //Allowed Extension
    const fileTypes =/jpeg|jpg|png|gif/
    //Check extension
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    //check mimetype
    const mimeType = fileTypes.test(file.mimetype)

    if(extname && mimeType){
        return cb(null,true)
    }else{
         cb('Error, Images only')
    }
}

function awsSingleUpload(req,res){
    let folder = req.query.path;
    upload(req,res,async(err)=>{
        console.log("req.file",req.file);
     
        if(err){
            console.log("errd",err);
            return res.json({
                status:204,
                message:[err]
            })
        }else{
            if(req.file==undefined){
                return res.json({
                    status:204,
                    message:["Error No file selected"]
                }) 
            }else{
                try {
                    const result =await uploadFile(req.file,folder);
                console.log("result",result);
                await unlinkFile(req.file.path)
                return res.json({
                    status:200,
                    message:["File uploaded successfully"],
                    data:{
                        location:`/profile/${result.Key}`
                    }
                })
                } catch (error) {
                    return res.json({
                        status:204,
                        message:["Upload Error "+error]
                    }) 
                }
                 
            }
        }
    })
}

function awsGetS3File(req,res){
    try {
        const {key }=req.params;
    const folder=req.query.path;
    console.log("key",key,folder);
    const readStreamData =   getFilyByKey(key,folder);
    readStreamData.pipe(res)
    } catch (error) {
        return res.json({
            status:false,
            message:[error.message]
        })
    }
    
}
function deleteFileFromAWS(req,res){
    const {key }=req.params;
    deleteFilyByKey(key,res);
}


module.exports = {
    awsSingleUpload,
    awsMultiUpload,
    awsGetS3File,
    deleteFileFromAWS
};