import React from 'react'

export const SolutionBox = ({ id, solName, solFullName, korName, url }) => {
  return (
    <div className="solutionBox">
      <div className="imgBox">
        <img src={process.env.PUBLIC_URL + "/image/solution/solution"
          + id + ".png"}
          alt="solutionImg" />
        <div className="overlayWrap">
          <div className="overlayBox">
            <div className="left">

              <a href={url} target="_blank" rel="noreferrer noopener">
                <img src={process.env.PUBLIC_URL + "/image/icons/live_preview.png"}
                  alt="solution-link" />
                <p>바로가기</p>
              </a>


            </div>
            <div className="right">
              <a href={"/product/" + id}>
                <img src={process.env.PUBLIC_URL + "/image/icons/more_detail.png"}
                  alt="solution-link" />
                <p>자세한 설명</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="solTitle">{solName}</p>
      <p className="solfullNm">{solFullName} </p>
      <p className="solTitleKr">{korName}</p>
    </div>
  )
}


export default SolutionBox;
