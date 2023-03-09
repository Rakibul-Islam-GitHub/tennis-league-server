import asyncHandler from 'express-async-handler'
import { ObjectId } from 'bson';


import Message from '../Models/messageModel.js'


export const sendMessage= ('/send', asyncHandler(async (req, res)=>{
    const {
      reciever,
      message,
      caseid
    } = req.body;


    const messageDatas = new Message({
       sender: req.user._id,
        reciever,
        message,
        caseid
        
      })
  
    const messageResult= await messageDatas.save()

    if (messageResult) {
        res.json(messageResult)
        
    }
    else {
        res.status(404)
        throw new Error('Problem with sending message')
    }


}))





/// get messages
export const getMessages = ('/getmessage', asyncHandler(async (req, res)=>{
   const {caseid}= req.body


  const messages = await Message.aggregate( 
    [
        {$match: {caseid:ObjectId(caseid) }},

        {
          $lookup:
            {
              from: "users",
              localField: "sender",
              foreignField: "_id",
              as: "senderdetails",
              "pipeline": [
                
                { "$project": { "name": 1 }}
              ],
            }
       },
       
      
    ]
)
console.log(messages);
    if (messages) {
      res.json(messages);
    } else {
      res.status(404);
      throw new Error("Message not found...");
    }
}))

/// get senders
export const getSenderList = ('/senders', asyncHandler(async (req, res)=>{

    const senders = await Message.aggregate( 
        [
            {$match: {$or:[{reciever: req.user._id},{sender: req.user._id}] }},
            
            //  {$unwind: '$sender_docs'},
             {$group: { "_id": { sender: "$sender", reciever: "$reciever" } } },
             {
                $lookup:
                  {
                    from: "users",
                    localField: "_id.sender",
                    foreignField: "_id",
                    as: "senderdetails"
                  }
             },
             {
                $lookup:
                  {
                    from: "users",
                    localField: "_id.reciever",
                    foreignField: "_id",
                    as: "recieverdetails"
                  }
             },
             {
                $project: {'senderdetails.name':1,'senderdetails.image':1,'recieverdetails.name':1,'recieverdetails.image':1}
             }
             
        ]
    )
   

if (senders) {
    res.json(senders);
  } else {
    res.status(404);
    throw new Error("Message not found...");
  }

  }))
  