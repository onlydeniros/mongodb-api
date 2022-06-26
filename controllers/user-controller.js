const {User, Thoughts}= require('../models');

const UserController ={
    // get all User
    getAllUser(req,res){
        User.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err);
            res.sendStatus(404);
        });
    },
    // get a single user by it's id
    getUserById({params}, res) {
        User.findOne({_id: params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // return if no user is found 
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No User with this particular ID!'});
                return; 
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
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
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No User with this particular ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },
    // delete user & thoughts by its id
    deleteUserById({params},res){
        User.findOneAndDelete({_id:params.id})
        .then(dbUserData => {
            if(!dbUserData){
            res.status(404).json({message:"No User found with this ID!"});
            return;
            }
            return Thoughts.deleteMany({_id:{$in:dbUserData.thoughts}})
        })
        .catch(err => res.status(400).json(err));
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
            User.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
            .populate({path: 'friends', select: '-__v'})
            .select('-__v')
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({message: 'No User with this particular ID!'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.status(400).json(err));
        }
    
}


module.exports=UserController;