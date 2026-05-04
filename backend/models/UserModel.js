import { Schema , model } from "mongoose";

const userSchema = new Schema ({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true , "Email already registered"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    monthlyBudget : {
            type: Number,
            default:0
    },

    currency: {
        type:String,
        default:"INR",
    },

    role : {
        type: String,
        enum: ["USER" , "ADMIN"],
        required: [true, "Invalid role"]
    },
    profileImageUrl: {
        type: String
    },
    isUserActive: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false,
        strict: "throw"
    },
);


export const UserModel = model("users",userSchema);