import express from 'express'
import controller from '../controllers/User'
import extractJWT from '../middleware/extractJWT'
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema'

const router = express.Router()

router.get('/validate', extractJWT, controller.validateToken)
router.post('/login', controller.loginUser)
router.get('/', controller.getAllUsers)
router.get('/:userId', controller.getUser)
router.post('/', ValidateSchema(Schemas.user.create), controller.createUser)
router.patch('/:userId', controller.updateUser)
router.delete('/:userId', controller.deleteUser)

export = router