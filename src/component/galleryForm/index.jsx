import React, { useState } from 'react'
import './index.css'

export default function GalleryForm() {
    let [images,setImages] = useState([]);
    let [notify,setNotify] = useState(null);

    // Image Upload Handle 
    let imgUpload = (e) =>{
        if(images.length <6){
            let fileReader = new FileReader();

            fileReader.onload = (e) =>{
                setImages((prevImg)=>[...prevImg,e.currentTarget.result])
            }
            fileReader.readAsDataURL(e.currentTarget.files[0]);
            setNotify(null)
        }else{
            setNotify('You Can not image upload more than 6')
        }
    }

    // Drag Image Handle Start
    const handleDragStart = (index) => (e) => {
        e.dataTransfer.setData('index', index.toString());
      };
      
    const handleDragOver = (e) => {
        e.preventDefault();
      };
      
    const handleDrop = (index) => (e) => {
        let dragIndex = e.dataTransfer.getData('index');
        let droppedIndex = e.currentTarget.dataset.index;

        let newImages = [...images];
        const [dropImg] = newImages.splice(dragIndex,1)
        newImages.splice(droppedIndex,0,dropImg)

        setImages(newImages)

      };


  return (
    <div className='galleryForm'>
        {notify && 
        <div className="notify">
            {notify}
        </div>
        }
        {/* IMAGE SHOW LIKE GALLERY */}
        {images.map((url,index) =>
        <div key={index} 
            onDragOver={handleDragOver}   
            data-index={index} 
            onDragStart={handleDragStart(index)} 
            onDrop={handleDrop(index)} 
            draggable 
            className="img_show">

            <img src={url} alt="" />
        </div>
        )}

        {/* IMAGE UPLOAD */}
        <div className={images.length == 6 ? 'img_upload opacity_50':'img_upload '}>
            <input onChange={imgUpload} type="file" />
        </div>
    </div>
  )
}
