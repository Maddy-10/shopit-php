import React, { useEffect, useState } from 'react'





const Home = () => {
    const [products, setProducts] = useState([]);

  useEffect(() => {    
    getProductdata();
  }, []);

  const getProductdata = async () => {
    try {
      const req = await fetch("http://localhost/project/api/product.php");
      const res = await req.json();
      console.log(res);

      if (Array.isArray(res.products)) {
        setProducts(res.products);
      } else {
        console.error("Products array not found in the response:", res);
        // Handle the case where 'products' array is not found in the response
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
    };
  
  return (
    <>
      <h1 className='text-5xl text-center mt-5 font-semibold'>Shop IT</h1>
      <hr className='mt-3' />
      <h1 className='text-3xl font-semibold mt-4 ml-5'>Products</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-2'>
        {products.map((product, index) => (
          <div key={product.productid || index} className='border rounded-xl mt-4 mx-2 flex flex-col p-5'>
            <div className='mx-auto mt-2'>
              <img className='w-[200px] h-auto border rounded-lg' src={`http://localhost/project/api/images/${product.image}`} alt="Not Found" />
            </div>
            <div className='mx-auto mt-2'>
              {product.productname}
            </div>
            <div className='mx-auto mt-2'>
              ₹{product.productprice}
            </div>
            {/* <button onClick={()=>dispatchEvent({type:'ADD_TO_CART',id:product.ProductID,product})}>ADD TO CART</button> */}
            <button  className='border rounded-lg hover:bg-slate-400 hover:text-white font-semibold mt-2 p-2 mx-auto'>ADD TO CART</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home