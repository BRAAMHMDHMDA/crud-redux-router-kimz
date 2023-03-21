import React from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function PostList({ data, deletePost, isLoggedIn }) {
  const navigate = useNavigate();
  //handle delete post
  const handleDelete = (item) => {
    //confirm delete
    const confirm = window.confirm(
      `Are you sure you want to delete this post => ${item.title}?`
    );
    if (confirm) {
      deletePost(item.id);
    }
  };
  const records = data.map((el) => (
    <tr key={el.id}>
      <td>{el.id}</td>
      <td>
        <Link to={`post/${el.id}`}>{el.title}</Link>
      </td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="success"
            onClick={() => navigate(`post/${el.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(el)}
            disabled={!isLoggedIn}
          >
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "70%" }}>Title</th>
          <th style={{ width: "10%" }}></th>
        </tr>
      </thead>
      <tbody>{records}</tbody>
    </Table>
  );
}

export default PostList;
