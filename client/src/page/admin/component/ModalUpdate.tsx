import React, { useState } from "react";
import { Input, Modal, Select } from "antd";
import { vnd } from "../../../help";
import axios from "axios";
import instance from "../../../api/axios";
import { Option } from "antd/es/mentions";

interface ModalUpdateProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  fetchProducts: () => void;
  selectedProduct: any;
  setSelectedProduct: React.Dispatch<React.SetStateAction<any>>;
  category: any;
}

const ModalUpdate: React.FC<ModalUpdateProps> = ({
  open,
  setOpen,
  handleSubmit,
  fetchProducts,
  selectedProduct,
  setSelectedProduct,
  category,
}) => {
  // thêm ảnh vào clouddinary
  const cloud_name = "dr9fccacv";
  const preset_key = "upload_img_project4";
  const folder = "imgProject4";
  const handleChange = (e: any) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", preset_key);
    formData.append("folder", folder);
    // Gọi API
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) =>{
        setSelectedProduct({ ...selectedProduct, img: res.data.url })
        console.log(res.data.url);
      })
      .catch((err) => console.log(err));
      
  };
  handleSubmit = async () => {
    try {
      const categoryFind = category.find(
        (item: any) => item.name == selectedProduct.category
      );
      const product = {
        ...selectedProduct,
        category: categoryFind.category_id,
      };

      await instance
        .put(`products/${selectedProduct.id}`, product)
        .then((res) => {
          setOpen(false);
          setSelectedProduct(null);
          fetchProducts();
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        className="w-75"
        title={<h1 className="text-center mb-4">Chỉnh sửa sản phẩm</h1>}
        centered
        open={open}
        onOk={() => handleSubmit()}
        onCancel={() => setOpen(false)}
        width={1000}
        okText="Xác nhận"
        cancelText="Huỷ bỏ"
      >
        <div className="d-flex justify-content-between gap-4">
          <div className="d-flex col-6" style={{ flexDirection: "column" }}>
            <h4>Thông tin sản phẩm</h4>
            <img
              className="w-100 mb-4"
              style={{ height: "50%" }}
              src={selectedProduct.img}
              alt=""
            />
            <input
              type="file"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label>Tên sản phẩm</label>
            <Input
              className="py-1 my-1"
              value={selectedProduct.name}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, name: e.target.value })
              }
            />{" "}
            <label>Giá sản phẩm</label>
            <Input
              className="py-1 my-1"
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  price: e.target.value,
                })
              }
            />
            <label>Khuyến mãi</label>
            <Input
              className="py-1 my-1"
              value={selectedProduct.sale}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  sale: e.target.value,
                })
              }
            />{" "}
            <label>Tồn kho</label>
            <Input
              className="py-1 my-1"
              value={selectedProduct.count}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  count: e.target.value,
                })
              }
            />
            <label>Hãng sản xuất</label>
            <Select
              className=""
              value={selectedProduct.category}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  category: e,
                })
              }
            >
              {category &&
                category.map((e: any, i: any) => (
                  <Option key={i} value={e.category_id}>
                    {e.name}
                  </Option>
                ))}
            </Select>
          </div>
          <div className="d-flex col-5" style={{ flexDirection: "column" }}>
            <h4>Thông số sản phẩm</h4>
            <label>Màn hình</label>
            <Input
              className="py-2 my-2"
              value={selectedProduct.screen}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  screen: e.target.value,
                })
              }
            />{" "}
            <label>Hệ điều hành</label>
            <Input
              className="py-2 my-2"
              value={selectedProduct.os}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, os: e.target.value })
              }
            />{" "}
            <label>Camera sau</label>
            <Input
              className="py-2 my-2"
              value={selectedProduct.camara}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  camara: e.target.value,
                })
              }
            />{" "}
            <label>Camera trước</label>
            <Input
              className="py-2 my-2"
              value={selectedProduct.camaraFront}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  camaraFront: e.target.value,
                })
              }
            />{" "}
            <label>CPU</label>
            <Input
              className="py-2 my-2"
              value={selectedProduct.cpu}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, cpu: e.target.value })
              }
            />{" "}
            <label>RAM</label>
            <Input
              className="py-2 my-2"
              value={selectedProduct.ram}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, ram: e.target.value })
              }
            />{" "}
            <label>Bộ nhớ trong</label>
            <Input
              className="py-2 my-2"
              value={selectedProduct.rom}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, rom: e.target.value })
              }
            />{" "}
            <label>Sim</label>
            <Input
              className="py-2 my-2"
              value={selectedProduct.sim}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, sim: e.target.value })
              }
            />{" "}
            <label>Dung lượng pin</label>
            <Input
              className="py-2 my-2"
              value={selectedProduct.battery}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  battery: e.target.value,
                })
              }
            />{" "}
            <label>Giá bán ra</label>
            <Input
              className="py-2 my-2"
              value={vnd(+selectedProduct.price * +(1 - selectedProduct.sale))}
              readOnly
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdate;
