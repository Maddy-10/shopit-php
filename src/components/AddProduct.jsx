import axios from "axios";
import { useState } from "react";



const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    // const navigate = useNavigate();

    const upload = async () => {
        try {
            const data = new FormData();
            data.append('productname', productName);
            data.append('productprice', productPrice);
            data.append('image', image);

            const res = await axios.post("http://localhost/project/api/product.php", data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.success) {
                setMessage(res.data.success);
                setTimeout(() => {
                    // navigate('/productlist');
                }, 2000);
            }
        } catch (error) {
            // Handle error, perhaps set error state
            console.error('Error uploading product:', error);
        }
    };

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate inputs if needed
        // Set errors if validation fails

        await upload();
    };
    
    return (
        <div className='flex flex-col'>
            <h1 className='text-3xl mx-auto mt-5 font-bold'>Add a New Product</h1>
            <form autoComplete='off' onSubmit={handleSubmit} className='flex flex-col my-3 mx-auto p-5 md:p-10 border w-3/4 md:w-1/2 xl:w-1/3 rounded-xl'>
                <label htmlFor="Productname" className='mt-4 text-xl'>Product Name :</label>
                <input type="text"  className='my-1 border rounded mx-2' placeholder='Product Name' onChange={(e)=>setProductName(e.target.value)}  />
                <label htmlFor="Productprice" className='mt-4 text-xl'>Product Price :</label>
                <input type="number"  className='my-1 border rounded mx-2' onChange={(e)=>setProductPrice(e.target.value)} />
                <label htmlFor="Productimage" className='mt-4 text-xl'>Product Image :</label>
                <input type="file" className='my-1 border rounded mx-2' onChange={(e)=>setImage(e.target.files[0])} id='file' />
                
                <button className='mt-4 mx-auto bg-[#28a745] text-white hover:bg-[#218838] font-thin rounded px-2'>ADD PRODUCT</button>                
            </form>

        </div>
    )
}

export default AddProduct