const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().sort({ class: 1, name: 1 });
        res.json(students);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ message: err.message });
    }
});

// Add new student
router.post('/', async (req, res) => {
    try {
        console.log('Received student data:', req.body);

        const student = new Student({
            name: req.body.name,
            fatherName: req.body.fatherName,
            class: parseInt(req.body.class),
            rollNumber: req.body.rollNumber,
            feeStatus: new Map()
        });

        console.log('Created student object:', student);

        const newStudent = await student.save();
        console.log('Saved student:', newStudent);
        res.status(201).json(newStudent);
    } catch (err) {
        console.error('Error creating student:', err);
        res.status(400).json({ 
            message: err.message,
            details: err.errors
        });
    }
});

// Update fee status
router.patch('/:id/fee', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.feeStatus.set(req.body.month, req.body.paid);
        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (err) {
        console.error('Error updating fee status:', err);
        res.status(400).json({ message: err.message });
    }
});

// Delete student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        await student.deleteOne();
        res.json({ message: 'Student deleted' });
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 