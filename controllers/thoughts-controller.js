const {Thoughts,User}=require('../models');

const ThoughtsController = {
// get all thoughts
getAllThoughts(req,res){
    Thoughts.find({})
    .then(dbThoughtsData => res.json(dbThoughtsData))
    .catch(err =>{
        console.log(err);
        res.sendStatus(404);
    });
  },
// get a single thought by its id
getThoughtsById({params},res){
    Thoughts.findOne({_id:params.id})
    .populate({
        path:'reactions',
        select:'-__v'
    })
    .select('-__v')
    .then(dbThoughtsData =>{
        if(!dbThoughtsData){
            res.json(404).json({message:'No thoughts found with this ID!'})
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err =>{
        console.log(err);
        res.sendStatus(404);
    });
  },
//   create a new thought 
createThoughts({params,body},res){
    Thoughts.create(body)
    .then(({_id})=>{
        return User.findOneAndUpdate({_id:params.UserId},{$push:{Thoughts:_id}},{new:true});
    })
    .then(dbThoughtsData=>{
        if(!dbThoughtsData){
            res.status(404).json({message:'No thoughts found with this ID!'});
            return;
        }
        res.json(dbThoughtsData)
    })
    .catch(err =>{
        console.log(err);
        res.sendStatus(404);
    })
  },
//   update thoughts 
  updateThoughts({params,body},res){
    Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
                res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
  },
//   delete thoughts
   deleteThoughts({params},res){
    Thoughts.findOneAndDelete({_id:params.id})
    .then(dbThoughtsData =>{
        if(!dbThoughtsData){
            res.status(404).json({message:'No thoughts found with this ID'})
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err =>{
        console.log(err);
        res.sendStatus(404);
    });
   },
//    add new reaction
addReaction({params,body},res){
    Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err))
  },
//   delete reaction by ID
deleteReaction({params},res){
    Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err));
}
};

module.exports = ThoughtsController;