import { Listing } from "../models/listingModel.js";

class ListingController {
  static async getAllListings(req, res) {
      try {
        const listings = await Listing.find();
        console.log(`Listings:${listings}`)
        if (listings.length != 0) {
          res.sendData(200, { data:listings });
        } else {
          res.sendData(200, { data: listings, message: "Data not found." });
        }
      } catch (error) {
        res.sendData(401, { error: `${error}` });
      }

  }
  static async getListing(req, res) {
    const listingId = req.params.id;
    try {
            const listing=await Listing.findById({_id:listingId})
            if (listing.length != 0) {
              res.sendData(200, { data:listing });
            } else {
              res.sendData(200, { data: {}, message: "Data not found." });
            }
    } catch (error) {
        res.sendData(401, {error: `${error}`});
    }
}
static async updateListing(req, res) {
  const listingId = req.params.id;
  const {
    title,
    description,
    price,
    location,
    parking,
    bed,
    kitchen,
    area,
    maxPeople,
    garden,
    rooms
  } =req.body;
  try {
          const listing=await Listing.findByIdAndUpdate(listingId, {title, description, price, location, parking, bed, area, maxPeople, garden, rooms}, {new:true} );
          res.sendData(200, {data: listing})
         
  } catch (error) {
      res.sendData(401, {error: `${error}`});
  }
}
static async deleteListing(req, res) {
  const listingId = req.params.id;
  try {
          const listing=await Listing.findByIdAndDelete(listingId);
          if (listing.length != 0) {
            res.sendData(200, { message:"Deleted Successfully!" });
          } else {
            res.sendData(200, { data: {}, message: "Data not found." });
          }
  } catch (error) {
      res.sendData(401, {error: `${error}`});
  }
}
  static async signupUser(req, res) {
    const { username, password, email, confirm_password, firstName, lastName } =
      req.body;
    if (
      !username ||
      !password ||
      !confirm_password ||
      !firstName ||
      !lastName
    ) {
      res.sendData(401, {
        error: "Please input required fields.",
      });
    } else if (password !== confirm_password) {
        res.sendData(401, {
          error: "Password and confirm password didn't match!",
        });
        
      }
    else{
      try {
        const newUser = {
          username: username,
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        };
        const state = await userDAO.createUser(newUser);
        if (state instanceof Error) {
          res.sendData(200, {
            msg: state.message,
          });
        } else if(state){
          res.sendData(200, {
            msg: "User signed up successfully.",
            user:state
          });
        } 
        else {
          res.sendData(401, { error: "User didnt signed up!" });
        }
      } catch (error) {
        res.sendData(401, { error: `${error}` });
      }
    }
    }
  }


export { ListingController };
