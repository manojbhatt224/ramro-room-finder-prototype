import { handleFileUpload } from "../helpers/fileUpload.js";
import { Listing, Room, House, Flat } from "../models/listingModel.js";
import mongoose from "mongoose";
import { Media } from "../models/mediaModel.js";
import fs from 'fs'

class ListingController {
  static async getAllListings(req, res) {
    try {
      const listings = await Listing.aggregate([
        {
          $lookup: {
            from: 'media',
            localField: '_id',
            foreignField: 'listingId',
            as: 'medias'
          }
        },
        {
          $addFields: {
            medias: {
              $map: {
                input: '$medias',
                as: 'media',
                in: {
                  path: '$$media.path', 
                  type: '$$media.type' 
                }
              }
            }
          }
        },
      ]);
      if (listings.length != 0) {
        res.sendData(200, { listings: listings });
      } else {
        res.sendData(200, { listings:[], message: "Data not found." });
      }
    } catch (error) {
      res.sendData(401, { error: `${error}` });
    }
  }
  static async getMyListings(req, res) {
    try {
      const listings = await Listing.aggregate([
        {
          $match: { userId: new mongoose.Types.ObjectId(req.user._id) } // Match the specific listing by ID
        },
        {
          $lookup: {
            from: 'media',
            localField: '_id',
            foreignField: 'listingId',
            as: 'medias'
          }
        },
        {
          $addFields: {
            medias: {
              $map: {
                input: '$medias',
                as: 'media',
                in: {
                  path: '$$media.path', 
                  type: '$$media.type' 
                }
              }
            }
          }
        },
      ]);
      if (listings.length != 0) {
        res.sendData(200, { listings: listings });
      } else {
        res.sendData(200, { listings:[], message: "Data not found." });
      }
    } catch (error) {
      res.sendData(401, { error: `${error}` });
    }
  }
  static async getListing(req, res) {
    const listingId = req.params.id;
    try {
      const listing = await Listing.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(listingId) } // Match the specific listing by ID
        },
        {
          $lookup: {
            from: 'media', // Collection name for media
            localField: '_id',
            foreignField: 'listingId',
            as: 'medias'
          }
        },
        {
          $addFields: {
            medias: {
              $map: {
                input: '$medias',
                as: 'media',
                in: {
                  path: '$$media.path', 
                  type: '$$media.type'  
                }
              }
            }
          }
        }
      ]);
      
      if (listing.length != 0) {
        res.sendData(200, { data: listing });
      } else {
        res.sendData(200, { data: {}, message: "Data not found." });
      }
    } catch (error) {
      res.sendData(401, { error: `${error}` });
    }
  }
  static async addListing(req, res) {
    try {
      const { files, fields } = await handleFileUpload(req);
      const {
        userId,
        title,
        description,
        price,
        type,
        hall,
        bedrooms,
        parking,
        bed,
        kitchen,
        area,
        maxPeople,
        garden,
        rooms,
      } = fields;
      if (type === "Room" || type === "Flat" || type === "House") {
        var newListing = null;
        let listingData = {
          userId,
          title,
          description,
          type,
          price,
          area,
          maxPeople,
        };
        if (parking === "true") listingData.parking = parking;
        if (type === "Room") {
          if (
            (userId && !title) ||
            !description ||
            !price ||
            !area ||
            !maxPeople
          ) {
            return res
              .status(401)
              .json({ error: "Incomplete details for Room!" });
          }
          if (bed === "true") listingData.bed = bed;
          newListing = new Room(listingData);
        } else if (type === "Flat") {
          if (
            (userId && userId && !title) ||
            !description ||
            !price ||
            !area ||
            !bedrooms ||
            !maxPeople
          ) {
            return res
              .status(401)
              .json({ error: "Incomplete details for Flat!" });
          }

          if (hall === "true") listingData.hall = hall;
          if (kitchen === "true") listingData.kitchen = kitchen;
          listingData.bedrooms = bedrooms;
          newListing = new Flat(listingData);
        } else if (type === "House") {
          if ((userId && !title) || !description || !price || !area || !rooms) {
            return res
              .status(401)
              .json({ error: "Incomplete details for House!" });
          }
          if (garden === "true") listingData.garden = garden;
          listingData.rooms = rooms;
          newListing = new House(listingData);
        }
        if (newListing) {
          try {
            const session = await mongoose.startSession();
            session.startTransaction();
            newListing = await newListing.save({ session });
            if (files.length > 0) {
              const mediaPromises = files.map((media) => {
                const newMedia = new Media({
                  listingId: newListing._id,
                  path: media.path,
                  type: media.type,
                });
                return newMedia.save({ session });
              });
              await Promise.all(mediaPromises);
            }
            await session.commitTransaction();
            session.endSession();
            return res.sendData(200, { data: newListing });
          } catch (error) {
            return res.sendData(401, { error: error });
          }
        } else {
          return res.sendData(401, { error: "Listing not created!" });
        }
      } else {
        return res.sendData(401, { error: "Invalid listing type" });
      }
    } catch (error) {
      console.error("Error processing request:", error);
      return res.sendData(401, { error: error });
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
      rooms,
    } = req.body;
    try {
      const listing = await Listing.findByIdAndUpdate(
        listingId,
        {
          title,
          description,
          price,
          kitchen,
          location,
          parking,
          bed,
          area,
          maxPeople,
          garden,
          rooms,
        },
        { new: true }
      );
      res.sendData(200, { data: listing });
    } catch (error) {
      res.sendData(401, { error: `${error}` });
    }
  }
  static async deleteListing(req, res) {
    const listingId = req.params.id;
    
    try {
      const session = await mongoose.startSession();
    session.startTransaction();
      const listing = await Listing.findById(listingId);
      if (!listing) {
        await session.abortTransaction();
        session.endSession();
        return res.sendData(200, { data: {}, message: "Listing not found." });
      }
      // Find associated media
      const mediaFiles = await Media.find({ listingId });
      // Delete files from storage
      const deletePromises= mediaFiles.map((media)=>{
        return new Promise((resolve, reject)=>{
          fs.unlink(media.path, (err)=>{
            if (err) {
              console.error(`Error deleting file ${media.path}:`, err);
              reject(err);
            } else {
              resolve();
            }
          })
        })
      });
      await Promise.all(deletePromises);
      // Delete media documents from the database
      await Media.deleteMany({ listingId });

      // Delete the listing
      await Listing.findByIdAndDelete(listingId);

            // Commit the transaction
            await session.commitTransaction();
            session.endSession();
      res.sendData(200, { message: "Deleted Successfully!" });
    } 
    catch(error) {
      res.sendData(401, { error: `${error}` });
    }
  }
}



export { ListingController };
