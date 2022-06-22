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
.post(createThoughts);

router.route('/:thoughtId')
.get(getThoughtsById)
.put(updateThoughts)
.delete(deleteThoughts);

router.route('/:thoughtId/reactions')
.post(addReaction)
.delete(deleteReaction);


module.exports=router;

