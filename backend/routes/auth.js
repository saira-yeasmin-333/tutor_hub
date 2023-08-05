const router = require("express-promise-router")();
const AuthController=require('../controllers/auth').AuthController
const PostController=require('../controllers/post').PostController
const authController=new AuthController()
const postController=new PostController()

router.route("/signup").post(authController.signup);
router.route("/post").post(postController.create);
router.route("/post").get(postController.getPosts);

module.exports=router