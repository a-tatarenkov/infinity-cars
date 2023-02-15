import { useState } from "react";
import "./pictures.scss";
import { useDispatch } from "react-redux";
import {  useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useEffect } from "react";
import { sellImages } from "../../../actions";

const Pictures = () => {
  
  const imagesData = createSelector(
    (state) => state.brands,
    (brands) => {
      return {
        brands,
      };
    }
  );

const imagesState = useSelector(imagesData)
  const dispatch = useDispatch();
  const [images, setImage] = useState(imagesState.brands.src || []);
  const onSetImages = (img) => {
    setImage((prevState) => [...prevState, img]);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    onSetImages(base64);
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
          required={viewImages.length === 0 ? true : false}
          type="file"
          onChange={(e) => {
            uploadImage(e);
          }}
        />

        <ul className="image-list">
          {viewImages.length !== 0 ? viewImages.map((item) => (
            <li key={item} className="image-list-item">
              <img src={item} alt="uploaded" />
              <button
                className="delete-image"
                onClick={() => onImageDelete(item)}
              ></button>
            </li>
          )) : null}
        </ul>
      </div>
    </div>
  );
};

export default Pictures;
