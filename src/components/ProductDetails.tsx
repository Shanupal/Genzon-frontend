import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  RadioGroup,
  FormControlLabel,
  Radio,
  Box
} from '@mui/material';
import { dummyProducts } from '../products';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = dummyProducts.find(p => p.id === id);

  // Ensure the state has a fallback value if `product` is undefined
  const [shippingType, setShippingType] = useState(
    product ? product.shippingType || 'self' : 'self'
  );

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <Card sx={{ maxWidth: '32rem', mx: 'auto' }}>
      <CardContent>
        <Button onClick={() => navigate('/listings')} sx={{ mb: 4 }}>
          Back to Listings
        </Button>
        
        <Box sx={{ height: '16rem', backgroundColor: 'grey.300', mb: 4, borderRadius: 2 }}></Box>
        
        <Typography variant="h4" sx={{ mb: 4 }}>
          {product.name}
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4 }}>
          {product.description}
        </Typography>
        
        <Typography variant="h6" color="primary" sx={{ mb: 4 }}>
          ${product.price?.toFixed(2) || '0.00'}
        </Typography>
        
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Category: {product.category}
        </Typography>
        
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Shipping Preference
          </Typography>
          <RadioGroup
            value={shippingType}
            onChange={(e) => setShippingType(e.target.value as "self" | "amazon")}

          >
            <FormControlLabel 
              value="self" 
              control={<Radio />} 
              label="I want to ship this product" 
            />
            <FormControlLabel 
              value="amazon" 
              control={<Radio />} 
              label="Amazon will ship this product" 
            />
          </RadioGroup>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
