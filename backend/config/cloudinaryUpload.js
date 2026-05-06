import cloudinary from "./cloudinary";

export const uploadToCloudinary = (buffer) => {
    console.log("Upload function called");
    console.log(buffer);
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({folder: "cashflow_users"}, (err,result)=> {
            if(err) return reject(err);
            resolve(result);
        });
        stream.end(buffer);
    });
};