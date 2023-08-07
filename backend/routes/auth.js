const router = require("express-promise-router")();
const AuthController=require('../controllers/auth').AuthController
const PostController=require('../controllers/post').PostController
const ProfileController=require('../controllers/profile').ProfileController
const EfficiencyController = require('../controllers/efficiency').EfficiencyController
const SubjectController = require('../controllers/subject').SubjectController
const TeacherController = require('../controllers/teacher').TeacherController

const authController=new AuthController()
const postController=new PostController()
const profileController=new ProfileController()
const efficiencyController=new EfficiencyController()
const subjectController = new SubjectController()
const teacherController = new TeacherController()


router.route("/signup").post(authController.signup);
router.route("/post").post(postController.create);
router.route("/post").get(postController.getPosts);
router.route("/get-profile/:id").get(profileController.getProfile);
router.route("/get-efficiency/:teacher_id").get(efficiencyController.getEfficiency);

router.route("/insert-efficiency").post(efficiencyController.insertEfficiency);
router.route("/subject").post(subjectController.create);
router.route("/subject").get(subjectController.getSubjects);
router.route("/insert-teacher").post(teacherController.create);

router.route("/get-efficiency-by-account/:account_id").get(subjectController.getEfficiencyByAccount)


module.exports=router