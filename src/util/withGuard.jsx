import { useSelector } from "react-redux";

export const withGuard = (Component) => {
  const Wrapper = (props) => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    return isLoggedIn ? (
      <Component {...props} />
    ) : (
      <div>Pls Log In Frist!!</div>
    );
  };
  return Wrapper;
};
