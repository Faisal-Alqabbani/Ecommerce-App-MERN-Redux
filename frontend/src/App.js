import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SigninScreen from "./Screens/SigninScreen";
import { signout } from "./actions/userActions";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import PlaceholderScreen from "./Screens/PlaceholderScreen";
import OrderScreen from "./Screens/OrderScreen";
import OrderHistoryScreen from "./Screens/OrderHistoryScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import UserListScreen from "./Screens/UserListScreen";
import UserUpdateScreen from "./Screens/UserUpdateScreen";
import { listProductCategories } from "./actions/productActions";
import { useEffect, useState } from "react";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import SearchScreen from "./Screens/SearchScreen";
import SearchBox from "./components/SearchBox";
import OrderListScreen from "./Screens/OrderListScreen";
import AdminRoute from "./components/AdminRoute";
import ProductCreateScreen from "./Screens/ProductCreateScreen";
function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link to="/" className="brand">
              My Shop
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div>
            <Link to="/cart">
              Cart{" "}
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/create">Create Product</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userslist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/cart/:id?" component={CartScreen} exact />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/signin" component={SigninScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/shipping" component={ShippingScreen} exact />
          <Route path="/payment" component={PaymentMethodScreen} exact />
          <Route path="/placeorder" component={PlaceholderScreen} exact />
          <PrivateRoute path="/order/:id" component={OrderScreen} exact />
          <PrivateRoute
            path="/orderhistory"
            component={OrderHistoryScreen}
            exact
          />
          <PrivateRoute path="/profile" component={ProfileScreen} exact />
          <Route path="/search/name/:name" component={SearchScreen} exact />
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          />
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          />
          <AdminRoute path="/userslist" component={UserListScreen} exact />
          <AdminRoute path="/orderlist" component={OrderListScreen} exact />
          <AdminRoute
            path="/user/:id/edit"
            component={UserUpdateScreen}
            exact
          />
          <AdminRoute path="/create" component={ProductCreateScreen} exact />
          <Route path="/" component={HomeScreen} exact />
        </main>

        <footer className="row center">
          <p>All Right Reserved &copy; Faisal</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
