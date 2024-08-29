import mongoose from 'mongoose';
import { Listing } from "../models/listingModel.js";
import { Review } from '../models/reviewModel.js';

export async function findReviewWithPermissionDetails(reviewId) {
    try {
      const result = await Review.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(reviewId) }
        },
        {
          $lookup: {
            from: 'listings', // Collection name for listings
            localField: 'listingId',
            foreignField: '_id',
            as: 'listingDetails'
          }
        },
        {
          $unwind: { path: '$listingDetails', preserveNullAndEmptyArrays: true }
        },
        {
          $lookup: {
            from: 'users', // Collection name for users
            localField: 'userId',
            foreignField: '_id',
            as: 'reviewOwner'
          }
        },
        {
          $unwind: { path: '$reviewOwner', preserveNullAndEmptyArrays: true }
        },
        {
          $lookup: {
            from: 'users', // Collection name for users
            localField: 'listingDetails.userId',
            foreignField: '_id',
            as: 'listingOwner'
          }
        },
        {
          $unwind: { path: '$listingOwner', preserveNullAndEmptyArrays: true }
        },
        {
          $project: {
            _id: 1,
            comment:1,
            rating:1,
            listingId:1,
            userId:1,
            reviewOwner: {
              _id: 1
            },
            listingOwner: {
              _id: 1
            }
          }
        }
      ]);
  
      if (result.length === 0) {
        throw new Error('Review not found');
      }
  
      return result[0]; // Return the review with user and listing details
    } catch (error) {
      throw new Error(`Aggregation error: ${error.message}`);
    }
  }

export async function getListingDetails(listingId) {
    try {
        return Listing.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(listingId) } // Match the specific listing by ID
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
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'ownerDetails'
                }
            },
            { $unwind: { path: '$ownerDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'listingId',
                    as: 'reviews'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'reviews.userId',
                    foreignField: '_id',
                    as: 'reviewUsers'
                }
            },
            {
                $addFields: {
                    reviews: {
                        $map: {
                            input: '$reviews',
                            as: 'review',
                            in: {
                                _id: '$$review._id',
                                rating: '$$review.rating',
                                comment: '$$review.comment',
                                createdAt: '$$review.createdAt', 
                                updatedAt: '$$review.updatedAt', 
                                userDetails: {
                                
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: '$reviewUsers',
                                                    as: 'user',
                                                    cond: { $eq: ['$$user._id', '$$review.userId'] }
                                                }
                                            },
                                            0
                                        ]
                                    
                          
                                }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id:1,
                    title: 1,
                    type:1,
                    description: 1,
                    price: 1,
                    area: 1,
                    parking: 1,
                    rented: 1,
                    bed: 1,
                    maxPeople: 1,
                    kitchen: 1,
                    hall: 1,
                    location:1,
                    latitude:1,
                    longitude:1,
                    bedrooms: 1,
                    garden: 1,
                    rooms: 1,
                    medias: 1,
                    ownerDetails: {
                        _id:1,
                        firstName: 1,
                        lastName: 1,
                        photourl: 1,
                        email:1,
                    },
                reviews: {
                    _id:1,
                    rating:1,
                    createdAt:1,
                    updatedAt:1,
                    comment:1,
                    userDetails:{
                        _id:1,
                        firstName:1,
                        lastName:1,
                        photourl:1
                    }
                }
                }
            }
        ]);
    } catch (error) {
        throw new Error(`Aggregation error: ${error.message}`);
    }
}

export async function getListingsWithOwner(page, limit) {
    console.log(page, limit)

    const skip = (page - 1) * limit;
    try {
        const data = await Listing.aggregate([
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
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'ownerDetails'
                }
            },
            { $unwind: { path: '$ownerDetails', preserveNullAndEmptyArrays: true } },
            
            {
                $lookup: {
                    from: 'users',
                    localField: 'reviews.userId',
                    foreignField: '_id',
                    as: 'reviewUsers'
                }
            },
            {
                $project: {
                    _id:1,
                    title: 1,
                    description: 1,
                    price: 1,
                    type: 1,
                    area: 1,
                    parking: 1,
                    bed: 1,
                    rented:1,
                    maxPeople: 1,
                    kitchen: 1,
                    location:1,
                    latitude:1,
                    longitude:1,
                    hall: 1,
                    bedrooms: 1,
                    garden: 1,
                    rooms: 1,
                    medias: 1,
                    ownerDetails: {
                        _id:1,
                        firstName: 1,
                        lastName: 1,
                        photourl: 1
                    }
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]);
        const totalDocuments = await Listing.countDocuments();
        return {listings: data, totalDocuments, currentPage: page, totalPages:Math.ceil(totalDocuments/limit)};
    } catch (error) {
        throw new Error(`Aggregation error: ${error.message}`);
    }
}


export async function getFilteredListingsWithOwner(filter, page, limit) {
    console.log(page, limit)

    const skip = (page - 1) * limit;
    try {
        const data = await Listing.aggregate([
            {
                $match:   filter
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
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'ownerDetails'
                }
            },
            { $unwind: { path: '$ownerDetails', preserveNullAndEmptyArrays: true } },
            
            {
                $lookup: {
                    from: 'users',
                    localField: 'reviews.userId',
                    foreignField: '_id',
                    as: 'reviewUsers'
                }
            },
            {
                $project: {
                    _id:1,
                    title: 1,
                    description: 1,
                    price: 1,
                    type: 1,
                    area: 1,
                    parking: 1,
                    bed: 1,
                    rented:1,
                    maxPeople: 1,
                    kitchen: 1,
                    location:1,
                    latitude:1,
                    longitude:1,
                    hall: 1,
                    bedrooms: 1,
                    garden: 1,
                    rooms: 1,
                    medias: 1,
                    ownerDetails: {
                        _id:1,
                        firstName: 1,
                        lastName: 1,
                        photourl: 1
                    }
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]);
        const totalDocuments = await Listing.countDocuments(filter);
        return {listings: data, totalDocuments, currentPage: page, totalPages:Math.ceil(totalDocuments/limit)};
    } catch (error) {
        throw new Error(`Aggregation error: ${error.message}`);
    }
}


export async function getUserListingsWithOwner(userId) {
    try {
        return Listing.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) } // Match the specific listing by ID
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
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'ownerDetails'
                }
            },
            { $unwind: { path: '$ownerDetails', preserveNullAndEmptyArrays: true } },
            
            {
                $lookup: {
                    from: 'users',
                    localField: 'reviews.userId',
                    foreignField: '_id',
                    as: 'reviewUsers'
                }
            },
            {
                $project: {
                    _id:1,
                    title: 1,
                    description: 1,
                    price: 1,
                    type: 1,
                    area: 1,
                    parking: 1,
                    bed: 1,
                    rented:1,
                    maxPeople: 1,
                    kitchen: 1,
                    hall: 1,
                    location:1,
                    latitude:1,
                    longitude:1,
                    bedrooms: 1,
                    garden: 1,
                    rooms: 1,
                    medias: 1,
                    ownerDetails: {
                        _id:1,
                        firstName: 1,
                        lastName: 1,
                        photourl: 1
                    }
                }
            }
        ]);
    } catch (error) {
        throw new Error(`Aggregation error: ${error.message}`);
    }
}
