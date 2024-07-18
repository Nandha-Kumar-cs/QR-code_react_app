import React from 'react'
import './QRcode.css'
import { useState } from 'react'
export const QRcode = () => 
{
  const [img , setImg]= useState("");
  const [loading,setLoading] = useState(false); 
  const[qrdata , setqrdata]=useState("");
  const[size, setSize]= useState("");
  async function generate()
     {
     setLoading(true);
      try{
        const url=`https://api.qrserver.com/v1/create-qr-code/?
        size=${size}x${size}&data=${encodeURIComponent(qrdata)}`;
        setImg(url);
      }
      catch(error){
        console.error("error while QRcode generating " , error);
      }
      finally{
        setLoading(false);
        }
    }
 function download(){
    fetch(img)
    .then((response) => response.blob())
    .then((blob)=> {
      const link = document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
 }
  return (
   <div className="container">
    <h3>QR code Generator</h3>
    {loading && <p>please wait.........</p>}
    {img && <img src={img}  />}
    <div className='form'>
    <label htmlFor="input-url">Enter the url</label>
    <input type="text" name="" id="input-url" 
     value={qrdata} onChange={(e)=>
      setqrdata(e.target.value)
     }/>

    <label htmlFor="input-size">Enter the size (eg 150 ..)</label>
    <input type="text" name="" id="input-size" 
    value={size} onChange={(e)=>setSize(e.target.value)} />

    <button className="generate" onClick={generate}>Generate QRcode</button>
    <button className="download" onClick={download}>Download QRcode</button>
    </div>
   
    <p id="footer">
      Designed by <span>Nandha Kumar</span>
    </p>
   </div>
  )
}