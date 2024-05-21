import mongoose from "mongoose";


const NutritionAnalysisSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    days: [
      {
        date: { type: String, required: true },
        mealTypes: [
          {
            name: { type: String, required: true },
            foods: [
              {
                item: { type: Object, required: true },
                amount: { type: String, required: true }
              }
            ]
          }
        ]
      }
    ]
}, { timestamps: true });


const NutritionAnalysis = mongoose.model('NutritionAnalysis', NutritionAnalysisSchema);

export default NutritionAnalysis;