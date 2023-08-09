const router = require("express-promise-router")();

const { ReviewController } = require("../controllers/review");
const AuthController=require('../controllers/auth').AuthController
const PostController=require('../controllers/post').PostController
const LocationController=require('../controllers/location').LocationController
const ProfileController=require('../controllers/profile').ProfileController
const EfficiencyController = require('../controllers/efficiency').EfficiencyController
const SubjectController = require('../controllers/subject').SubjectController
const TeacherController = require('../controllers/teacher').TeacherController
const SMSController = require('../controllers/sms').SMSController

const authController=new AuthController()
const postController=new PostController()
const profileController=new ProfileController()
const efficiencyController=new EfficiencyController()
const subjectController = new SubjectController()
const teacherController = new TeacherController()
const reviewController = new ReviewController()
const locationController=new LocationController()
const smsController=new SMSController()

router.route("/signup").post(authController.signup);
router.route("/signin").post(authController.signin);
router.route("/post").post(postController.create);
router.route("/post").get(postController.getPosts);

router.route("/location").post(locationController.create);
router.route("/location").get(locationController.getLocations);
router.route("/account/:id").get(authController.findById);

router.route("/get-profile/:id").get(profileController.getProfile);
router.route("/get-efficiency/:teacher_id").get(efficiencyController.getEfficiency);

router.route("/insert-efficiency").post(efficiencyController.insertEfficiency);
router.route("/subject").post(subjectController.create);
router.route("/subject").get(subjectController.getSubjects);
router.route("/fetch-tutor/:id").get(teacherController.fetchTutor);
router.route("/teachers").get(teacherController.getTeachers);
router.route("/insert-teacher").post(teacherController.create);

router.route("/review").post(reviewController.create);
router.route("/review").get(reviewController.getReviews);

router.route("/get-efficiency-by-account/:account_id").get(subjectController.getEfficiencyByAccount)

router.route("/sms").get(smsController.sendSMS)

module.exports=router