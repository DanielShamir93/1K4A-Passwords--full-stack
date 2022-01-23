import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LoginRoute({
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
          return (
            <Redirect
              to={{ pathname: redirectPath, state: { from: props.location } }}
            />
          );
        } else {
          return <Component />;
        }
      }}
    />
  );
}
