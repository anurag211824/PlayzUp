import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullName, email, username, password } = req.body;
  console.log(req.body);
  console.log(req.files);
  
  
  console.log(fullName, email, username, password);
  
  if (
    [fullName, email, username, password].some((userDetails) => {
      userDetails?.trim() === "" ? true : false;
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exits");
  }
  const avatarImageLocalPath = req.files?.avatar[0]?.path;

  
 let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

  if (!avatarImageLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarImageLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
 console.log(avatar,coverImage);
 
  if(!avatar){
    throw new ApiError(400,"Avatar file is required")
  }   

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const  createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    )
    
    if(!createdUser){
      throw new ApiError("500","Something went wrong while creating user")
    }

    return res.status(201).json(new ApiResponse(200,createdUser,"user registered successfully"))
     
});





export { registerUser };
