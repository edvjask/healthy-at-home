import {Navigate} from "react-router-dom";
import {Outlet} from "@mui/icons-material";
import {useUserContext} from "../../contexts/UserAuthContext";

export enum RouteType {
    ADMIN,
    USER,
}

type PrivateRouteProps = {
    type: RouteType,
    redirectPath?: string,
    children?: JSX.Element,
}

export const PrivateRoute = ({redirectPath = '/', type, children}: PrivateRouteProps) => {

    const {user, isAdmin} = useUserContext();

    const isSignedInUsingEmail = user?.providerData[0].providerId === 'password';

    //explicit check for undefined only!
    if (user === undefined || isAdmin === undefined) {
        ///wait for it to be defined
        return null;
    } else {
        if (!user ||
            (isSignedInUsingEmail && !user.emailVerified) ||
            (type === RouteType.ADMIN && !isAdmin)) {
            return <Navigate to={redirectPath} replace/>;
        }

        return children ? children : <Outlet/>;
    }


}