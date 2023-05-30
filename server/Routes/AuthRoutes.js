const { register, login ,updateImage,adminLogin,getAllUsers,deleteUser,editUser} = require("../Controllers/AuthControllers");
const { checkUser,checkAdmin } = require("../Middlewares/AuthMiddlewares");
const router = require("express").Router();
const upload = require("../Middlewares/multer")

router.post("/",checkUser)
router.post("/register",register)
router.post("/login", login)
router.post('/profile', upload.single("image"), updateImage)

router.post("/adminlogin", adminLogin)
router.post('/admin', checkAdmin)
router.get('/getallusers', getAllUsers)
router.post('/deleteuser/:id', deleteUser)
router.post('/edituser', editUser)
router.post('/adminadduser',register)

module.exports = router;