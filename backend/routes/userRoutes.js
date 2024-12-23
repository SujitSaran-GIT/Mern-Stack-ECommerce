import express from "express";
import {
    createUser, 
    getAllUsers, 
    loginUser, 
    logoutCurrentUser, 
    getCurrentUserProfile, 
    updateCurrentUserProfile, 
    deleteUserById, 
    getUserById, 
    updateUserById
} from '../controllers/userController.js'

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.route("/").post(createUser).get(authenticate, authorizeAdmin, getAllUsers)
router.post('/auth', loginUser)
router.post('/logout', logoutCurrentUser)

// now we have to get specific user data
router.route('/profile').get(authenticate,getCurrentUserProfile).put(authenticate,updateCurrentUserProfile)

router.route('/:id')
    .delete(authenticate, authorizeAdmin, deleteUserById)
    .get(authenticate, authorizeAdmin, getUserById)
    .put(authenticate, authorizeAdmin, updateUserById)


export default router