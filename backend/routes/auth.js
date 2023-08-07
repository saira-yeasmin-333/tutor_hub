const router = require("express-promise-router")();
const AuthController=require('../controllers/auth').AuthController
const PostController=require('../controllers/post').PostController
const LocationController=require('../controllers/location').LocationController
const authController=new AuthController()
const postController=new PostController()
const locationController=new LocationController()
router.route("/signup").post(authController.signup);
router.route("/signin").post(authController.signin);
router.route("/post").post(postController.create);
router.route("/post").get(postController.getPosts);
router.route("/location").post(locationController.create);
router.route("/location").get(locationController.getLocations);
router.route("/account/:id").get(authController.findById);
module.exports=router