const express = require('express')
const router = express.Router()
const Menu = require('../models/Menu')


// POST route to add an item
router.post('/', async(req, res)=>{
    try{
        const menuData = req.body
        const newMenuData = new Menu(menuData)

        const response = await newMenuData.save()
        console.log('Item saved')
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
})



router.get('/', async(req,res)=>{
    try{
        const menuData = await Menu.find();
        console.log('Menu Data Fatched')
        res.status(200).json(menuData)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Erron'})
    }
})

router.get('/:tasteType', async(req,res)=>{
    try{
        const tasteType = req.params.tasteType
        if(tasteType=='spicy' || tasteType == 'sweet'|| tasteType=='sour'){
            const response = await Menu.find({taste: tasteType})
            console.log('Target Data Fatched')
            res.status(200).json(response)
        }else{
            res.status(200).json('Invalid Keywords')
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
})

// Update menu item
router.put('/:id', async(req,res)=>{
    try{
        const itemId = req.params.id
        const updateInfo = req.body
        const response = await Menu.findByIdAndUpdate(itemId, updateInfo,{
            new:true,
            runValidators: true,
        })

        if(!response){
            res.status(404).json('Item not found')
        }
        console.log('Item Info Updated')
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
})

// Item delete operations
router.delete('/:id',async(req,res)=>{
    try{
        const itemId = req.params.id
        const response = await Menu.findByIdAndDelete(itemId)

        if(!response){
            res.status(404).json('Item not found')
        }
        console.log('Item deleted')
        res.status(200).json('Item Deleted Successfully')

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server error'})
    }
})

module.exports = router