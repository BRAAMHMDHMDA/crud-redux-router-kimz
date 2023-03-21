import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostDetails } from "../state/postSlice";

export const usePostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, record } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostDetails(id));
  }, [dispatch, id]);

  return { loading, error, record };
};
