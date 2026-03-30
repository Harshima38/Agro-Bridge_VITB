/**
 * RuralAssist Unified MongoDB Schemas
 * Used for backend Node.js / Express processing
 */

const mongoose = require('mongoose');

// Unified User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  
  // Distinguishing roles: 'Consumer', 'Farmer', 'Agent'
  role: { 
    type: String, 
    enum: ['Consumer', 'Farmer', 'Agent'], 
    required: true 
  },
  
  // Specific Location details for Consumers (Students/Faculties at VIT)
  location: { 
    type: String, 
    enum: [
      'Block 1 (Boys Hostel)',
      'Block 2 (Boys Hostel)',
      'Block 3 (Boys Hostel)',
      'Block 4 (Boys Hostel)',
      'Block 5 (Boys Hostel)',
      'Girls Hostel',
      'Faculty Quarters',
      'None' // For Farmers and Agents who might not be inside VIT
    ],
    default: 'None'
  },
  
  // Farmer specific details
  village: { type: String },
  farmName: { type: String },

  // Agent specific tracking
  deliveriesCompleted: { type: Number, default: 0 },
  walletBalance: { type: Number, default: 0 }

}, { timestamps: true });

// Product / Harvest Schema
const ProductSchema = new mongoose.Schema({
  farmerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { type: String, required: true },
  quantityAvailableKg: { type: Number, required: true },
  pricePerKg: { type: Number, required: true },
  
  // Automatically handles showing "Current Season vs Upcoming"
  seasonStart: { type: Date, required: true },
  seasonEnd: { type: Date, required: true },

  // Handles daily freshness constraint
  expiryDate: { type: Date, required: true },

  // Image URL for visual presentation
  imageUrl: { type: String }

}, { timestamps: true });

/**
 * Mongoose Pre-find Middleware for Seasonality
 * If current date is strictly greater than seasonEnd, we might want to automatically hide it via query.
 * Alternatively, we can use a virtual field on the model.
 */
ProductSchema.virtual('isAvailable').get(function() {
  const today = new Date();
  return (this.quantityAvailableKg > 0) && (today <= this.expiryDate);
});

ProductSchema.virtual('seasonStatus').get(function() {
  const today = new Date();
  if (today > this.seasonEnd) return 'Ended';
  if (today < this.seasonStart) return 'Upcoming';
  return 'Current';
});

// Setting virtuals to true when converting to JSON
ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

// Exports
module.exports = {
  User: mongoose.model('User', UserSchema),
  Product: mongoose.model('Product', ProductSchema)
};
