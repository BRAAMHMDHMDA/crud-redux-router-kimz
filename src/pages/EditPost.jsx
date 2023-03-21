import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { usePostDetails } from "../hooks/use-post-details";
import { editPost, cleanRecord } from "../state/postSlice";
import { withGuard } from "../util/withGuard";
import { postSchema } from "../util/validationSchema";

function EditPost() {
  const { loading, error, record } = usePostDetails();
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (record) {
  //     setTitle(record.title);
  //     setDescription(record.description);
  //   }
  // }, [record]);

  // useEffect(() => {
  //   dispatch(cleanRecord());
  // }, []);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(editPost({ id: record.id, title, description }))
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
      title: record ? record.title : "",
      description: record ? record.description : "",
    },
    validationSchema: postSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(
        editPost({
          id: record.id,
          ...values,
        })
      )
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
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            // required
            onChange={formik.handleChange}
            value={formik.values.title}
            name="title"
            isValid={formik.touched.title && !formik.errors.title}
            isInvalid={formik.touched.title && formik.errors.title}
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
            // value={description}
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
            Save
          </Button>
        </Loading>
      </Form>
    </>
  );
}

export default withGuard(EditPost);
