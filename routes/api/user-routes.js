const {getAllUser,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addUserFriend,
    deleteUserFriend
}= require('../../controllers/user-controller');

const router = require('express').Router();

router.route('/')
.get(getAllUser)
.post(createUser);

router.route('/:id')
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById);

router.route('/:id/friends/:friendId')
.post(addUserFriend)
.delete(deleteUserFriend);


module.exports= router;