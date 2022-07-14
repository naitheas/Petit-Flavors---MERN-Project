import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "@material-ui/core";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const NavBar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>Petit Flavors</h2>
      </Link>
      <Link to="/cart">
        <div className="nav-bag">
        <Badge badgeContent={cartTotalQuantity} color="secondary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
