import mongoose, { Schema, Model } from "mongoose";

interface Post {
  title: string;
  content: string;
  image: string;
  author_id: Schema.Types.ObjectId;
}

const PostSchema = new Schema<Post>(
  {
    title: {
      type: String,
      required: true,
    },
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, collection: "posts" }
);

const Post: Model<Post> = mongoose.model("Post", PostSchema);

export default Post;
