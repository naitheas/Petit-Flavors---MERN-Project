import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addToCart } from "../slices/cartSlice";
import { useGetAllProductsQuery } from "../slices/productsApi";
import {
  Button,
  Card,
  CardContent, 
  CardMedia,
  CardActions,
  Typography,
  Skeleton } from '@mui/material';

const Home = () => {
  const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const history = useHistory();

  const { data, error, isLoading } = useGetAllProductsQuery();
  console.log("Api", isLoading);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    history.push("/cart");
  };

  return (

    <div className="home-container">
      {status === "success" ? (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data &&
              data?.map((product) => (
                <Card sx={{ maxWidth: 345, mb:2 }} key={product._id}>
                  <CardMedia
                    component="img"
                    alt={product.title}
                    height="250"
                    image={product.img}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.desc}
                    </Typography>
                    <Typography variant="body3">
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {product.inStock ?
                    <Button size="small" onClick={() => handleAddToCart(product)}>
                      Add To Cart
                    </Button> 
                    : <p>Out of stock </p> 
                    }
                  </CardActions>
                </Card>
                ))
              }
          </div>
        </>
      ) : status === "pending" ? (
        // <p>Loading...</p>
        <Skeleton variant="rectangular" width={210} height={118} />
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>

  );
};

export default Home;
