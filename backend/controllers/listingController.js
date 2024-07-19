import { Listing, Room, House, Flat } from "../models/listingModel.js";

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
static async addListing(req, res) {
  const {
    userId,
    title,
    description,
    price,
    type,
    parking,
    bed,
    kitchen,
    area,
    maxPeople,
    garden,
    rooms
  } =req.body;
  if (type === "Room" || type === "Flat" || type === "House") {
    var newListing=null;
    let listingData = {userId, title, description, type, price, area, maxPeople };
    if (typeof parking === "boolean") listingData.parking = parking;
    if (type === "Room") {
      if (userId && !title || !description || !price || !area || !maxPeople) {
        return res.status(401).json({ error: "Incomplete details for Room!" });
      }
      if (typeof bed==="boolean") listingData.bed=bed;
      newListing = new Room(listingData);
    } 
    else if (type === "Flat") {
      if (userId && userId && !title || !description || !price || !area || !bedrooms || !maxPeople) {
        return res.status(401).json({ error: "Incomplete details for Flat!" });
      }
      if (typeof hall === "boolean") listingData.hall = hall;
      if (typeof kitchen === "boolean") listingData.kitchen = kitchen;
      listingData.bedrooms = bedrooms;
      newListing = new Flat(listingData);
    } 
    else if (type === "House") {
      if (userId && !title || !description || !price || !area || !rooms) {
        return res.status(401).json({ error: "Incomplete details for House!" });
      }
      if (typeof garden === boolean) listingData.garden = garden;
      listingData.rooms = rooms;
     newListing = new House(listingData);
    }
    if (newListing){
    try {
      await newListing.save();
      return res.sendData(200, {data:listingData});
    } catch (error) {
      return res.sendData(401, { error: error });
    }}
    else{
      return res.sendData(401, { error: "Listing not created!" });
    }
  } else {
    return res.status(401).json({ error: "Invalid listing type" });
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
          const listing=await Listing.findByIdAndUpdate(listingId, {title, description, price, kitchen, location, parking, bed, area, maxPeople, garden, rooms}, {new:true} );
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
