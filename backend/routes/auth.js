const router = require("express-promise-router")();

const { NotificationController } = require("../controllers/notification");
const { ReviewController } = require("../controllers/review");
const { GradeController } = require("../controllers/grade");
const AuthController=require('../controllers/auth').AuthController
const PostController=require('../controllers/post').PostController
const LocationController=require('../controllers/location').LocationController
const ProfileController=require('../controllers/profile').ProfileController
const EfficiencyController = require('../controllers/efficiency').EfficiencyController
const SubjectController = require('../controllers/subject').SubjectController
const TeacherController = require('../controllers/teacher').TeacherController
const SMSController = require('../controllers/sms').SMSController
const RequestController = require('../controllers/request').RequestController
const { GradeController } = require("../controllers/grade");
const { authenticateUser } = require("../services/authMiddleware");

const authController=new AuthController()
const postController=new PostController()
const profileController=new ProfileController()
const efficiencyController=new EfficiencyController()
const subjectController = new SubjectController()
const teacherController = new TeacherController()
const reviewController = new ReviewController()
const gradeController = new GradeController()
const locationController=new LocationController()
const smsController=new SMSController()
const requestController=new RequestController()
const notificationController=new NotificationController()
const gradeController = new GradeController()

router.route("/signup").post(authController.signup);
router.route("/signin").post(authController.signin);
router.route("/post").post(authenticateUser,postController.create);
router.route("/post").get(postController.getPosts);
router.route("/profile").post(authenticateUser,authController.updateProfileImage);

router.route("/location").post(authenticateUser,locationController.create);
router.route("/location").get(locationController.getLocations);

router.route("/get-rating").get(authenticateUser,reviewController.getRating);

router.route("/get-profile").get(authenticateUser,authController.findById);
router.route("/get-efficiency/:teacher_id").get(efficiencyController.getEfficiency);

router.route("/insert-efficiency").post(efficiencyController.insertEfficiency);
router.route("/subject").post(subjectController.create);
router.route("/subject").get(subjectController.getSubjects);
router.route("/fetch-tutor/:id").get(teacherController.fetchTutor);
router.route("/teachers").get(teacherController.getTeachers);
router.route("/insert-teacher").post(teacherController.create);

router.route("/review").post(authenticateUser,reviewController.create);
router.route("/review").get(authenticateUser,reviewController.getReviews);
router.route("/get-rating").get(authenticateUser,reviewController.getRating);

router.route("/get-efficiency-by-account/:account_id").get(subjectController.getEfficiencyByAccount)

router.route("/sms").get(smsController.sendSMS)

router.route("/notification").get(authenticateUser,notificationController.getNotifications)
router.route("/notification").post(authenticateUser,notificationController.send)
router.route("/notification/read").post(authenticateUser,notificationController.readAllData)

router.route("/request").get(authenticateUser,requestController.getRequests)
router.route("/request").post(authenticateUser,requestController.sendRequest)
router.route("/request/approve").post(authenticateUser,requestController.approveRequest)

router.route("/grade").post(authenticateUser, gradeController.create);
router.route("/grade").get(authenticateUser, gradeController.getGrades);

module.exports=router