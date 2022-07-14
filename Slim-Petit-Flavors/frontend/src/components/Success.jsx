
import { Link } from "react-router-dom";
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';

const Success = () => {

  return (
    <div
      style={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
     <p>
         Order has been submitted.
         Confirmation has been sent to the provided email.
         </p>
      <div className="start-shopping">
            <Link to="/">
              <KeyboardReturnOutlinedIcon />
              <span>Start Shopping</span>
            </Link>
          </div>
    
    </div>
  );
};

export default Success;
