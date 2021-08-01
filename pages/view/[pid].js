import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ID() {
  const router = useRouter();
  const [product, setProduct] = useState();
  const { pid } = router.query;

  const API_URL = `http://makeup-api.herokuapp.com/api/v1/products/${pid}.json`;
  function getData() {
    axios.get(API_URL).then((res) => {
      console.log('asdf');
      setProduct(res.data);
    });
  }
  useEffect(() => {
    if (pid && pid > 0) getData();
  }, [pid]);

  return <p>{product?.name}</p>;
}
