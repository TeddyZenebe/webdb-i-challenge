const express = require('express');

const db = require('./data/dbConfig.js');

const router = express.Router();

// const query = require('querystring').stringify({
//     limit: 5,
//     sortby: 'id',
//     sortdir: 'desc'
//   });

router.get('/',(req, res)=>{
    db.select().table('accounts')
    .then(accounts=>{
        res.status(200).json(accounts)
    })
    .catch(error =>{
        res.status(500).json({message:'error loading the accounts table data'})
    })
})

router.get('/:id',(req, res)=>{
    const id = req.params.id
    db('accounts').where('id', id)
    .then(accounts=>{
        const account = accounts[0]
        if(account){res.json(account)}else{
            res.status(404).json({message:'the Id provided is not found'})
        }
        
    })
    .catch(error =>{
        res.status(500).json({message:'error loading the account table data by the id'})
    })
})

router.post('/', (req, res)=>{
    const {name, budget} = req.body
    if(!name||!budget){res.status(404).json({message:'both name and budget is required'})}else{
        db('accounts').insert({name, budget})
        .then(account=>{
            res.status(201).json(account)
        })
        .catch(error =>{
            res.status(500).json({message:'error aploding the data to account table'})
        })
    }
    
})

router.put('/:id',(req, res)=>{
    const id = req.params.id
    const {name, budget}= req.body
    if(!name||!budget){res.status(404).json({message:'both name and budget is required'})}else{
    db('accounts').where('id',id).update({name, budget})
    .then(accounts=>{
        if(accounts==1){res.status(204).json(accounts)}else{
            res.status(404).json({message: 'the id provided is not found'})
        }   
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({message:'error updating the data to account table'})
    })
  }
})

router.delete('/:id',(req, res)=>{
    const id = req.params.id
    db('accounts').where('id', id).del()
    .then(deleted=>{
        if(deleted==1){res.status(201).json({deleted: deleted})}else{
           res.status(404).json({message: 'the id provided is not found'})
        }  
    })
    .catch(error=>{
        res.status(500).json({message: 'error deleting the requiest'})
    })
})


module.exports = router;