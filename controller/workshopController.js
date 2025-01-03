import { Workshop } from "../models/workshopModel.js";
import { User } from "../models/userModel.js";

export const createWorkshop = async (req, res) => {
    try {
        const { title, description, date, location, fee, capacity } = req.body;
        const instructorId = req.id;

        // Check if the user is an instructor
        const instructor = await User.findById(instructorId);
        if (!instructor || instructor.role !== 'instructor') {
            return res.status(403).json({
                message: "Only instructors can create workshops",
                success: false,
            });
        }

        // Create the new workshop
        const newWorkshop = new Workshop({
            title,
            description,
            instructor: instructorId,
            fee,
            date,
            location,
            capacity,
        });

        // Save the workshop to the database
        await newWorkshop.save();

        return res.status(201).json({
            message: "Workshop created successfully",
            success: true,
            workshop: newWorkshop,
        });
    } catch (error) {
        console.error("Error in createWorkshop controller", error);
        return res.status(500).json({
            message: "Failed to create workshop",
            success: false,
        });
    }
};
//get workshop
export const getWorkshop = async (req, res) => {
    try {
        const workshops = await Workshop.find().populate('instructor', 'fullName email');
         return res.status(200).json({
           success: true,
           workshops,
         });
    } catch (error) {
        console.log("Error getting workshop", error);
        return res.status(500).json({ message: "error getting workshop", success: false });
    }
}
//enroll in workshop
export const enrollWorkshop = async (req, res) => {
    try {
        const workshopId = req.params.id;
        const studentId = req.id;

        const workshop = await Workshop.findById(workshopId);
        if(!workshop) {
            return res.status(404).json({ message: "Workshop not found", success: false });
        }
       if(workshop.enrolledStudents.includes(studentId)) {
           return res.status(400).json({ message: "You are already enrolled in this workshop", success: false });
        }
        workshop.enrolledStudents.push(studentId);
        await workshop.save();
        return res.status(200).json({
            success: true,
            message: "Enrolled in workshop successfully",
        })
    } catch (error) {
        console.log("Failed to enroll in workshop", error);
        return res.status(500).json({ message: "Failed to enroll in workshop", success: false });
    }
}
//add announcement
export const addAnnouncement = async (req, res) => { 
    try {
        const workshopId = req.params.id;
        const { announcement } = req.body;

        const workshop = await Workshop.findById(workshopId);
        if(!workshop) {
            return res.status(404).json({ message: "Workshop not found", success: false });
        }

        workshop.announcements.push(announcement);
        await workshop.save();
        return res.status(200).json({
            success: true,
            message: "Announcement added successfully",
        });
    } catch (error) {
        console.log("Failed to upload announcement")
        return res.status(500).json({ message: "Failed to upload announcement", success: false });
    }
}