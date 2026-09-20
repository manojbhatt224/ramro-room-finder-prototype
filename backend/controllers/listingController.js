import { handleFileUpload } from "../helpers/fileUpload.js";
import { Listing, Room, House, Flat } from "../models/listingModel.js";
import mongoose from "mongoose";
import { Media } from "../models/mediaModel.js";
import fs from 'fs'
import {getListingDetails, getListingsWithOwner, getFilteredListingsWithOwner, getUserListingsWithOwner} from '../aggregations/listing.js'

class ListingController {
  static async getAllListings(req, res) {
    const {location, minPrice, maxPrice, type} = req.query;
    let filter = {};
    if (location) filter.location = new RegExp(location, 'i');
    if (type) {
      filter.type = type;
    }
  
    if (minPrice) {
      filter.price = { ...filter.price, $gte: Number(minPrice) };
    }
  
    if (maxPrice) {
      filter.price = { ...filter.price, $lte: Number(maxValue) };
    }
  


    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    try {
      let finalData;
      if (Object.keys(filter).length > 0){
        finalData = await getFilteredListingsWithOwner(filter, page,limit);
    }
    else{
      finalData = await getListingsWithOwner(page,limit);

    }
      
      if (finalData?.listings?.length != 0) {
        res.sendData(200, { ...finalData });
      } else {
        res.sendData(200, { listings:[]});
      }
    } catch (error) {
      res.sendData(401, { error: `${error}` });
    }
  }
    static async getMyListings(req, res) {
    try {
      const listings = await getUserListingsWithOwner(req.user._id)
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
      const listing = await getListingDetails(listingId);
      if (listing.length != 0) {
        res.sendData(200, { listing: listing[0] });
      } else {
        res.sendData(200, { listing: {}});
      }
    } catch (error) {
      res.sendData(401, { error: `${error}` });
    }
  }
  static async addListing(req, res) {
    try {
      const { files, fields } = await handleFileUpload(req);
      console.log(fields);
      const {
        userId,
        title,
        description,
        price,
        location,
        latitude,
        longitude,
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
          location,
          longitude,
          latitude,
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
            !maxPeople || !latitude || !longitude || !location
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
            !maxPeople || !latitude || !longitude || !location
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
          if ((userId && !title) || !description || !price || !area || !rooms || !latitude || !longitude || !location) {
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
      latitude,
      longitude,
      parking,
      bed,
      kitchen,
      area,
      maxPeople,
      garden,
      rooms,
      hall,
      bedrooms,
    } = req.body;
    try {
      const updateData = {
        title,
        description,
        price,
        location,
        latitude,
        longitude,
        kitchen,
        parking,
        bed,
        area,
        maxPeople,
        garden,
        rooms,
        hall,
        bedrooms,
      };

      const listing = await Listing.findByIdAndUpdate(
        listingId,
        updateData,
        { new: true }
      );
      
      if (!listing) {
        return res.sendData(404, { error: "Listing not found." });
      }

      res.sendData(200, { data: listing, message: "Listing updated successfully!" });
    } catch (error) {
      res.sendData(401, { error: `${error}` });
    }
  }

  static async deleteListing(req, res) {
    const listingId = req.params.id;
    
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      const listing = await Listing.findById(listingId).session(session);
      if (!listing) {
        await session.abortTransaction();
        session.endSession();
        return res.sendData(404, { error: "Listing not found." });
      }

      // Find associated media
      const mediaFiles = await Media.find({ listingId }).session(session);

      // Delete files from storage
      const deletePromises = mediaFiles.map((media) => {
        return new Promise((resolve, reject) => {
          fs.unlink(media.path, (err) => {
            if (err) {
              console.error(`Error deleting file ${media.path}:`, err);
              resolve(); // Continue even if file deletion fails
            } else {
              resolve();
            }
          });
        });
      });

      await Promise.all(deletePromises);

      // Delete media documents from the database
      await Media.deleteMany({ listingId }).session(session);

      // Delete the listing
      await Listing.findByIdAndDelete(listingId).session(session);

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      res.sendData(200, { message: "Listing deleted successfully!" });
    } catch (error) {
      res.sendData(401, { error: `${error}` });
    }
  }

}



export { ListingController };
