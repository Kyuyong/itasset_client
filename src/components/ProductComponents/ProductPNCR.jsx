import "./productComponents.scss";
import React from 'react'
import DataTable from '../DataTable/DataTable'

const productPNCR = (productID) => {
  return (
    <div className='productPNCR'>
      <div className="contentBox">
        <div className="container">

          <div className="gap-60"></div>

          <div className="title">PN/CR</div>
          <h4>게시판에 오류/버그(PN) 및 요청사항(CR)을 등록해주시면, 개발 담당자와 소통을 할 수 있습니다. </h4>
          <button>
            등록하기
          </button>
          <DataTable />


        </div>

      </div>
    </div>
  )
}

export default productPNCR