import { Schema, model } from "mongoose";

export const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const BookModel = model("books", BookSchema);
