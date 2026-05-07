import {Schema, model} from "mongoose";

const ExpenseSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref:"users",
        required: true,
    },
    title:{
        type: String
    },
    amount:{
        type:Number,
        required:[true, "Amount is required"],
    },
    type:{
        type:String,
        enum:["INCOME","EXPENSE"],
        required:[true, "Specify income or expense"],
    },
    category:{
        type:String,
        required: [true, "Category is required"],
        enum:["FOOD","TRANSPORT","RENT","SHOPPING","SALARY","ENTERTAINMENT","HEALTH","RECIEPT","OTHERS"],
    },
    date:{
        type:Date,
        default: Date.now,
    },
    description:{
        type:String,
        maxLength:[200,"Description can't exceed 200 characters"],
    },
    
},
    {
        timestamps: true,
        versionKey: false,
        strict: "throw"
    },    
);

export const ExpenseModel = model("expenses", ExpenseSchema);