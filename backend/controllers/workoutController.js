const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async(req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    
    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    
    else {
        res.status(200).json(workout)
    }
}

// create a new workout
const createWorkout = async(req, res) => {
    const {title, reps, load} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }

    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
    // add document to db
    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteWorkout = async(req, res) => {
    const { id } = req.params

     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workOut = await Workout.findOneAndDelete({_id: id})

    if (!workOut) {
        return res.status(404).json({error: 'No such workout'})
    }
    else {
        res.status(200).json(workOut)
    }

}

// update a workout

const updateWorkout = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workOut = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body

    })

    if (!workOut) {
        return res.status(404).json({error: 'No such workout'})
    }
    else {
        res.status(200).json(workOut)
    }
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}