import mongoose from 'mongoose';
import { Listing } from "../models/listingModel.js";

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
                    description: 1,
                    price: 1,
                    area: 1,
                    parking: 1,
                    bed: 1,
                    maxPeople: 1,
                    kitchen: 1,
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
                    },
                reviews: {
                    _id:1,
                    rating:1,
                    comment:1,
                    userDetails:{
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
