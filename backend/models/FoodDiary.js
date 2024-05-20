import mongoose from "mongoose";

const FoodDiarySchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    days: [
      {
        date: { type: String, required: true },
        mealTypes: [
          {
            name: { type: String, required: true },
            foods: [
              {
                item: { type: Object, required: true },
                amount: { type: String, required: true },
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const FoodDiary = mongoose.model('FoodDiary', FoodDiarySchema);

export default FoodDiary;
