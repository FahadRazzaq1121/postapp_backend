import * as Yup from "yup";

export const createPostSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().optional(),
  image: Yup.mixed().optional(),
})
  .noUnknown(true)
  .strict(true);

export const updatePostSchema = Yup.object({
  title: Yup.string().optional(),
  content: Yup.string().optional(),
  image: Yup.mixed().optional(),
})
  .noUnknown(true)
  .strict(true);
