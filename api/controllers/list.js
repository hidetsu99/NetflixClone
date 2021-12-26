const { verify } = require("jsonwebtoken")
const List = require("../models/List")



//Create a List of movies 
const createList = async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body)
        try {
            const savedList = await newList.save()
            res.status(200).json(savedList)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('You are not allowed to create al list')
    }
}
// Delete movie/serie list
const deleteList = async (req, res, next)=>{
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id)
            res.status(200).json('The movie/serie has been deleted ')
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('Not auth')
    }
}
// Get list
const getList = async (req, res) => {
    const typeQuery = req.query.type
    const genreQuery = req.query.genre
    let list = []

    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([{$sample: {size: 10}}, {$match: {type:typeQuery, genre: genreQuery}}])
                return res.status(200).json(list)
            }
            list = await List.aggregate([{$sample: {size: 10}}, {$match: {type:typeQuery}}])
            return res.status(200).json(list)
        }
        list = await List.aggregate([{$sample: {size: 10}}])
        res.status(200).json(list)
    } catch (err) {
        res.status(500).json(err)
    }
}
module.exports = {createList, deleteList, getList}