import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import PostList from "../components/PostList";
import { deletePost, fetchPosts } from "../state/postSlice";

function Index() {
  const dispatch = useDispatch();
  const { records, loading, error } = useSelector((state) => state.posts);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  //delete post
  const deleteRecord = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <Loading loading={loading} error={error}>
      <PostList
        data={records}
        deletePost={deleteRecord}
        isLoggedIn={isLoggedIn}
      />
    </Loading>
  );
}

export default Index;
