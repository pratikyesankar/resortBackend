const mongoose = require("mongoose")

const resortSchema = new mongoose.Schema({
  name: String,
  category: String,
  location: String,
  rating: Number,
  website: String,
  phoneNumber: String,
  checkInTime: String,
  checkOutTime: String,
  amenities: String,
  priceRange: String,
  reservationsNeeded: Boolean,
  isParkingAvailable: Boolean,
  isWifiAvailable: Boolean,
  isPoolAvailable: Boolean,
  isSpaAvailable: Boolean,
  isRestaurantAvailable: Boolean,
  photos: String,
})

const Resort = mongoose.model("Resort", resortSchema)

module.exports = Resort
