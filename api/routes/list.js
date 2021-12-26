const router = require("express").Router();
const verify = require('../verifyToken')
const {createList, deleteList, getList} = require('../controllers/list')

// Create list
router.post("/", verify, createList);
// Delete list
router.delete("/", verify, deleteList);
// Get list
router.get('/', verify, getList)

module.exports = router;
