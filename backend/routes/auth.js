const router = require("express-promise-router")();
const AuthController=require('../controllers/auth').AuthController
const PostController=require('../controllers/post').PostController
const ProfileController=require('../controllers/profile').ProfileController
const authController=new AuthController()
const postController=new PostController()
const profileController=new ProfileController()

router.route("/signup").post(authController.signup);
router.route("/post").post(postController.create);
router.route("/post").get(postController.getPosts);
router.route("/get-profile/:id").get(profileController.getProfile);

module.exports=router