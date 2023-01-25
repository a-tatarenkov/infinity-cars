import { useState } from "react";
import "./pictures.scss";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { sellImages } from "../../../actions";

const Pictures = () => {
  const dispatch = useDispatch();
  const [baseImage, setBaseImage] = useState("");
  const [images, setImage] = useState([]);
  const onSetImages = (img) => {
    setImage((prevState) => [...prevState, img]);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    onSetImages(base64);
    setBaseImage(base64);
  };

  const viewImages = images.filter((item) => item !== undefined);

  useEffect(() => {
    dispatch(sellImages(viewImages));
  }, [images]);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
        onSetImages();
        console.log(baseImage);
        console.log(images);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onImageDelete = (item) => {
    setImage(viewImages.filter((el) => el !== item));
  };

  return (
    <div className="pictures">
      <h3>Images</h3>
      <span>Upload your images</span>

      <div className="image-select">
        <label htmlFor="image-loader"></label>
        <input
          className="image-loader"
          id="image-loader"
          required
          type="file"
          onChange={(e) => {
            uploadImage(e);
          }}
        />

        <ul className="image-list">
          {viewImages.map((item) => (
            <li key={item} className="image-list-item">
              <img src={item} alt="uploaded" />
              <button
                className="delete-image"
                onClick={() => onImageDelete(item)}
              ></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pictures;
