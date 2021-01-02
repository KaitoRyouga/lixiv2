import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

const Home = () => {

        const [data, setData] = useState("");
        const [path, setPath] = useState("");
        const [change, setChange] = useState(0);
    
        return(
            <div>

                { change ? <Redirect to={{ pathname: path, data: data }} /> : null }

                <article>this is Home</article>
                <button onClick={() => {
                    setData("products")
                    setPath("products")
                    setChange(1)
                }}>
                    Products
                </button>
            </div>
        )
}

export default Home;