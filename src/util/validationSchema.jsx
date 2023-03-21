import * as Yup from "yup";

export const postSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "The Title Too Short, must at least 2 char!")
    .max(50, "The Title Too Long, max 50 char!!")
    .required("The Title Is Required"),
  description: Yup.string()
    .min(20, "Too Short!")
    .max(200, "Too Long!")
    .required("Description is Required"),
});
