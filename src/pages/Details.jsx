import Loading from "../components/Loading";
import { usePostDetails } from "../hooks/use-post-details";

function Details() {
  const { loading, error, record } = usePostDetails();

  return (
    <div>
      <Loading loading={loading} error={error}>
        <p>ID: {record.id}</p>
        <p>Title: {record.title}</p>
        <p>Description: {record.description}</p>
      </Loading>
    </div>
  );
}

export default Details;
