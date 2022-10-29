const router = require('express').Router();
const { notes } = require('../../db/notes');

router.get('/notes',(req,res)=> {
    const result = notes;
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes',(req,res)=>{
    req.body.id = notes
})

module.exports = router;