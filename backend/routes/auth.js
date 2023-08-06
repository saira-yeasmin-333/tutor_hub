const router = require("express-promise-router")();
const AuthController=require('../controllers/auth').AuthController
const PostController=require('../controllers/post').PostController
const ProfileController=require('../controllers/profile').ProfileController
const EfficiencyController = require('../controllers/efficiency').EfficiencyController
const SubjectController = require('../controllers/subject').SubjectController

const authController=new AuthController()
const postController=new PostController()
const profileController=new ProfileController()
const efficiencyController=new EfficiencyController()
const subjectController = new SubjectController()


router.route("/signup").post(authController.signup);
router.route("/post").post(postController.create);
router.route("/post").get(postController.getPosts);
router.route("/get-profile/:id").get(profileController.getProfile);
router.route("/get-efficiency/:teacher_id").get(efficiencyController.getEfficiency);
router.route("/subject").post(subjectController.create);
router.route("/subject").get(subjectController.getSubjects);


module.exports=router