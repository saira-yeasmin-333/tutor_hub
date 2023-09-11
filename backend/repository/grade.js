const { Grade, Account, Subject } = require('../models/models');
const Repository = require('./database').Repository


class GradeRepository extends Repository {
    constructor() {
        super();
    }

    create = async data => {
        try {
            data['timestamp'] = parseInt(Date.now() / 1000)
            const grade = await Grade.create(data)
            return grade
        } catch (e) {
            console.log(e)
        }

    }

    getGradesFromCreateReview = async (studentId, teacherId) => {
        const grades = Grade.findAll({
            where: {
                teacher_id: teacherId,
                student_id: studentId
            },
            include: {
                model: Subject
            }
        });
        return grades
    }

    getGradesById = async (studentId) => {
        const grades = Grade.findAll({
            where: {
                student_id: studentId
            },
            include: {
                model: Subject
            }
        });
        return grades
    }

    getRating = async (studentId) => {
        try {
            // Fetch grades for the given student
            const grades = await Grade.findAll({
                where: {
                    student_id: studentId
                }
            });

            if (!grades || grades.length === 0) {
                return 0; // Return 0 if there are no grades for the student
            }

            // Calculate the sum of ratings based on mark_received/total_marks*5.0 for each grade
            const totalRating = grades.reduce((sum, grade) => {
                const ratio = (grade.mark_received / grade.total_marks) * 5.0;
                return sum + ratio;
            }, 0);

            // Calculate the average rating
            const averageRating = totalRating / grades.length;

            return averageRating;
        } catch (error) {
            console.error('Error fetching and calculating rating:', error);
            return 0; // Return 0 in case of an error
        }
    }

    updateGrade = async (grade) =>{
        try {
            // Assuming you are using Sequelize as your ORM
            const updatedGrade = await Grade.findOne({
                where: { grade_id: grade.grade_id },
            });

            if (!updatedGrade) {
                throw new Error('Grade not found');
            }

            // Update the properties you want to change
            updatedGrade.title = grade.title;
            updatedGrade.subject_id = grade.subject.id;
            updatedGrade.mark_received = grade.mark_received;
            updatedGrade.total_marks = grade.total_marks;
            updatedGrade.submit_for_review = grade.submit_for_review;
            updatedGrade.timestamp = grade.timestamp;
            updatedGrade.timestamp_of_exam = grade.timestamp_of_exam;

            // Save the updated grade to the database
            await updatedGrade.save();

            return updatedGrade;
        } catch (error) {
            throw error; // Handle or log the error appropriately
        }
    
    }


}

module.exports = { GradeRepository }