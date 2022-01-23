import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({
  component: Component,
  redirectPath,
  ...rest
}) {
  const statesObject = useSelector((state) => {
    return { isAuth: state.isAuth };
  });

  return (
    <Route
      {...rest}
      render={(props) => {
        if (statesObject.isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: redirectPath, state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}
