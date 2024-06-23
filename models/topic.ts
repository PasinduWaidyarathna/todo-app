import mongoose, { Schema } from "mongoose";

// Define the Topic schema
const topicSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

// Create the Topic model
const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;