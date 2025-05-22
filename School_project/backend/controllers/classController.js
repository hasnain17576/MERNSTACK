import Class from '../models/Class.js';

// @desc    Get all classes
// @route   GET /api/classes
// @access  Private
export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('students');
    res.status(200).json({
      success: true,
      count: classes.length,
      data: classes
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single class
// @route   GET /api/classes/:id
// @access  Private
export const getClass = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id).populate('students');
    
    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.status(200).json({
      success: true,
      data: classData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new class
// @route   POST /api/classes
// @access  Private/Admin
export const createClass = async (req, res) => {
  try {
    const classData = await Class.create(req.body);
    res.status(201).json({
      success: true,
      data: classData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update class
// @route   PUT /api/classes/:id
// @access  Private/Admin
export const updateClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.status(200).json({
      success: true,
      data: classData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete class
// @route   DELETE /api/classes/:id
// @access  Private/Admin
export const deleteClass = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);

    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }

    await classData.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 