import React, { useState, useEffect ,memo} from "react";
import "./upImage.scss";
import { PlusOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import upImageSlice from "./upImageSlice";
import * as api from "../../api/api";
import { imagesSelector } from "../../redux/selector";

function UpImage({ index,refImage }) {
  const listImgSetUp = useSelector(imagesSelector);
  const dispatch = useDispatch();
  const [urlImg, setUrlImg] = useState("");

  useEffect(() => {

    return () => {
      console.log("unmount");
      
      console.log("done")
    }
  } ,[refImage]);
  const handleOnchageFile = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("index", index);
    
    dispatch(upImageSlice.actions.addImageRequest(formData));

    const urlFake = URL.createObjectURL(e.target.files[0]);
    setUrlImg(urlFake);

    // clear: value img ;
    e.target.value = null
  };
  const handleClick = () => {
    const input = document.querySelectorAll(".UpImage-input");
    input[index].click();
  };
  const handleDelete = async () => {
    const imgDelete = listImgSetUp.filter(
      (img) => img.index === index.toString()
    );
   await api.deleteImage({filename:imgDelete[0].filename});

    dispatch(upImageSlice.actions.deleteImage(index.toString()));
    const over = document.querySelectorAll(".UpImage-Over");
    over[index].style.display = "block";
    setUrlImg("");


  };

  useEffect(() => {
    const over = document.querySelectorAll(".UpImage-Over");
    if (urlImg) {
      over[index].style.display = "none"; 
    }
  }, [urlImg, index]);

  return (
    <div className="UpImage-container">
      <input
        type="file"
        name="file"
        accept="image/*"
        onChange={handleOnchageFile}
        className="UpImage-input"
      
      ></input>
      <div className="UpImage-icon">
        {!urlImg && <PlusOutlined style={{ fontSize: "26px" }} />}
      </div>
      {urlImg && (
        <>
          <Image
            className="UpImage-img"
            preview={{
              mask: <EyeOutlined />,
              maskClassName: "mask-img",
            }}
            style={{ objectFit: "cover", width: "76px", height: "76px" }}
            src={urlImg}    
          />
          <div className="UpImage-controler">
            <div className="UpImage-btn_delete" onClick={handleDelete}>
              <DeleteOutlined />
            </div>
          </div>
        </>
      )}
      <div className="UpImage-Over" onClick={handleClick}></div>
    </div>
  );
}

export default memo(UpImage);
