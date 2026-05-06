import multer from "multer";

export const upload = multer({
    //store in RAM
    storage: multer.memoryStorage(),
    //avoiding RAM overflow
    limits: {
        fileSize: 2 * 1024 * 1024 //2MB
    },
    //for security validation 
    fileFilter:(req,file,cb) => {
        if(file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
            cb(null,true);
        } else {
            const err = new Error("Only JPG and PNG allowed");
            err.status = 400;
            cb(err,false);
        }
    },
});