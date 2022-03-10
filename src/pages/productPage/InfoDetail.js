import React,{ memo } from "react";
import "./infoDetail.scss";

function InfoDetail({items,origin,brand,status,insurence,from}) {
  return (
    <div className="info-detail section">
      <div className="info-detail_header">
        <h1>THÔNG TIN CHI TIẾT</h1>
      </div>
      <div className="info-detail_table">
        <table className="table">
          <tbody>
          <tr className="table-row">
              <td className="table-col-1">Danh mục</td>
              <td className="table-col-2">{items}</td>
            </tr>
            <tr className="table-row">
              <td className="table-col-1">Xuất xứ</td>
              <td className="table-col-2">{origin}</td>
            </tr>
            <tr className="table-row">
              <td className="table-col-1">Thương hiệu</td>
              <td className="table-col-2">{brand}</td>
            </tr>
            <tr className="table-row">
              <td className="table-col-1">Bảo hành</td>
              <td className="table-col-2">{insurence}</td>
            </tr>
            <tr className="table-row">
              <td className="table-col-1">Tình trạng</td>
              <td className="table-col-2">{status}</td>
            </tr>
            <tr className="table-row">
              <td className="table-col-1">Gửi từ</td>
              <td className="table-col-2">{from}</td>
            </tr>
           
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(InfoDetail);
