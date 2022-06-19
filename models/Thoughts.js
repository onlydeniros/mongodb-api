const {Schema,model,Types}=require('mongoose');

const ThoughtSchema= new Schema(
    {
        thoughtText:{
            type:String,
            required:true,
            
        }
    }
)