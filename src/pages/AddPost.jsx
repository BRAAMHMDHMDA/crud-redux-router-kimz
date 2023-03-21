import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { createPost } from "../state/postSlice";
import { withGuard } from "../util/withGuard";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "The Title Too Short, must at least 2 char!")
    .max(50, "The Title Too Long, max 50 char!!")
    .required("The Title Is Required"),
  description: Yup.string()
    .min(20, "Too Short!")
    .max(200, "Too Long!")
    .required("Description is Required"),
});

function AddPost() {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.posts);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const id = Math.floor(Math.random() * 500);
  //   dispatch(createPost({ id, title, description }))
  //     .unwrap()
  //     .then(() => {
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      const id = Math.floor(Math.random() * 500);
      dispatch(createPost({ id, ...values }))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <>
      <Form
        // onSubmit={(e) => handleSubmit(e)}
        onSubmit={formik.handleSubmit}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            // onChange={(e) => setTitle(e.target.value)}
            // required
            onChange={formik.handleChange}
            value={formik.values.title}
            name="title"
            isValid={formik.touched.title && !formik.errors.title}
            isInvalid={formik.touched.title && formik.errors.title}
            // isInvalid={!!formik.errors.title}
          />

          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {formik.errors.title}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            // onChange={(e) => setDescription(e.target.value)}
            // required
            onChange={formik.handleChange}
            value={formik.values.description}
            name="description"
            isValid={formik.touched.description && !formik.errors.description}
            isInvalid={formik.touched.description && formik.errors.description}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {formik.errors.description}
          </Form.Control.Feedback>
        </Form.Group>
        <Loading loading={loading} error={error}>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Loading>
      </Form>
    </>
  );
}

export default withGuard(AddPost);
