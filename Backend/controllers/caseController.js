import asyncHandler from 'express-async-handler'
import Case from '../Models/caseModel.js'
import cloudinary from '../utils/cloudinary.js'



/// fetching all Cases
/// public route
/// api/case
export const getAllcases= ('/',  asyncHandler(async (req, res)=> {
    try {
        const cases= await Case.find()

    res.json(cases)
        
    } catch (error) {
        res.json( error.message)
    }
}))


/// add new Case
/// private route
/// api/case/add
export const createCase= ('/add',   asyncHandler(async (req, res)=>{
  // console.log(req.body.image[1]);
let category='new'
let image=req.files;
 
  let {
   
      title,
      
      description,
      comment
   
  } = req.body;

  
if (!image|| image.length===0) {
  image.push('https://via.placeholder.com/600x800')
}
let uploadedImage=[]
let uploadedImagePublicId=[]
console.log(image);
 try {

 
  const uploadResult= await Promise.all(image.map(async img=>{
    const result= await cloudinary.uploader.upload(img.path,{
      folder: 'early/cases'
    })
    uploadedImagePublicId.push({
      url: result.secure_url,
      publicId: result.public_id

    })
    uploadedImage.push(result.secure_url)
    return result.secure_url
    
  })) 
  

// uploadedImage.push(uploadResult)



   try {

    const cs = new Case({
     
      pcpid: req.user._id,
      title,
      image:uploadedImage,
      imagePublicId:uploadedImagePublicId,
      description,
      comment,
      category,
      
     
      
    })

  const caseAddDone= await cs.save()
  if (productAddDone) {
        res.status(200).json(caseAddDone)}
    
   } catch (error) {
    console.log(error);
    throw new Error('server error')
   }
 } catch (error) {
  console.log(error);
  throw new Error('problem with image upload');
 }



}))


/// update case 
/// private route
/// api/case/update/:id
export const updateCase = ("/update/:id", asyncHandler(async (req, res) => {
  
   
    const {changedField}= req.body
   
    try {
      const product = await Case.findOneAndUpdate({_id:req.params.id}, changedField);
    if (product) {
      res.json({success: true, message:'case updated successfully'});
    } else {
      res.status(500);
      throw new Error("Internal error");
    }
    } catch (error) {
      res.status(404);
      res.json({success: false, message:'Item not found'})
    }
  }));

/// delete product 
/// private route
/// api/products/delete/:id
export const deleteCase =
  ("/delete/:id",
  asyncHandler(async (req, res) => {
    const product = await Case.deleteOne({_id:req.params.id});
    if (product) {
      res.json({success: true, message:'Item deleted successfully'});
    } else {
      res.status(404);
      throw new Error("Item Not Found...");
    }
  }));

/// fetching item by ID 
/// public route
/// api/products/:id
export const getCaseID =
  ("/:id",
  asyncHandler(async (req, res) => {
    const product = await Case.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Item Not Found...");
    }
  }));


  /// add product review
/// api/products/review/add/:id
export const addReview =
("products/review/add/:id", asyncHandler(async (req, res) => {
  
const { comment, rating, newTotalRating}= req.body

 try {
  const product = await Case.findOneAndUpdate({ _id: req.params.id }, 
    { $push: { reviews: {name:req.user.name, rating,comment}  }}, 
    
    );
    
  if (product) {
    const incNumReview = await Case.findOneAndUpdate({ _id: req.params.id }, 
    
      {$inc: {numReviews:1}}

      );
      await Case.findOneAndUpdate({ _id: req.params.id }, 
        {rating: newTotalRating*1, }
        
  
        );
      
    res.json({success: true, message: 'Review added successfully'});
  } 
 } catch (error) {
  
  throw new Error("Item Not Found....");
 }
}));