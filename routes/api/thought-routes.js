const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction,
}=require('../../controllers/thoughts-controller');

const router = require('express').Router();

router.route('/')
.get(getAllThoughts)

router.route('/:userId')
.post(createThoughts);

router.route('/:id')
.get(getThoughtsById)
.put(updateThoughts)
.delete(deleteThoughts);

router.route('/:thoughtId/reactions')
.post(addReaction)

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);


module.exports=router;

