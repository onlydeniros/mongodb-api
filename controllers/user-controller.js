const {User, Thoughts}= require('../models');

const UserController ={
    // get all User
    getAllUser(req,res){
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err);
            res.sendStatus(404);
        });
    },
    // get a single user by it's id
    getUserById({params},res){
        User.findOne({_id:params.id})
        .populate({
            path:'thoughts',
            select:'-__v'
        })
        .populate({
            path:'friend',
            select:"-__v"
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err);
            res.sendStatus(404);
        })
    },
    // post a new user
    createUser({body},res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err);
            res.sendStatus(404);
        })
    },
    // update a user by its id
    updateUserById({params,body},res){
        User.findOneAndUpdate({_id:params.id},body,{new:true, runValidators:true})
        .then(dbUserData=>{
            if(!dbUserData){
                res.json(404).json({message:'No user found with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err =>{
            console.log(err);
            res.sendStatus(404);
        })
    },
    // delete user & thoughts by its id
    deleteUserById({params,body},res){
        User.findOneAndDelete({_id:params.id})
        .then(dbUserData => {
            if(!dbUserData){
                return res.json(404).json({message:"No User found with this ID!"});
            }
            return Thoughts.deleteMany({_id:{$in:dbUserData.thoughts}})
        })
        .catch(err =>{
            console.log(err);
            res.sendStatus(404);
        });
    },
    // add new friend to a user's friend list
    addUserFriend({params},res){
        User.findOneAndUpdate({_id:params.id},{$push:{friends: params.friendsId}},{new:true})
        .populate({
            path:"friends",
            select:"-__v"
        })
        .select("-__v")
        .then(dbUserData =>{
            if(!dbUserData){
                res.send(404).json({message:'User id no matches'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err =>{
            console.log(err);
            res.sendStatus(404);
        })
    },
        // delete friend to a user's friend list
        deleteUserFriend({params},res){
            User.findOneAndDelete({_id:params.id},{$pull:{friends: params.friendsId}},{new:true})
            .populate({
                path:"friends",
                select:"-__v"
            })
            .select("-__v")
            .then(dbUserData =>{
                if(!dbUserData){
                    res.send(404).json({message:'User id no matches'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err =>{
                console.log(err);
                res.sendStatus(404);
            })
        }
}


module.exports=UserController;