const {Schema,model,Types}=require('mongoose');
const validateEmail = require('../utils/emailVerify');


const UserSchema = new Schema(
    {
        username:{
            type:String,
            unique:true,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            validate: [validateEmail, "Please fill a valid email address"],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"]
        },
        thoughts:[{
            type:Schema.Types.ObjectId,
            ref:'Thoughts'
        }],
        friends:[{
            type:Schema.Types.ObjectId,
            ref:'Users'
        }]
    },{
        toJSON:{
            virtuals:true,
            getters:true
        },
        id:false
    }
)

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

const Users = model('Users',UserSchema);

module.exports= Users;