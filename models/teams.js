const express = require("express");
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 3.0,
    },
    uclwinner: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      enum: {
        values: ["England", "Spain", "Germany", "France", "Italy"],
        message: "{VALUE} is not supported",
      },
      //enum: ["England", "Spain", "Germany", "France", "Italy"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
