import React from 'react'
import SolutionBox from './SolutionBox';


export const SolutionList = ({ solutionData }) => {

  return (
    <div className="solutionList">
      <div className="gap-100" />
      <div className="titleText">Solution List</div>

      <div className="gap-20" />
      <div className="solutionsContainer">
        {solutionData.map((item) => (

          <div key={item.id}>
            <SolutionBox
              key={item.id}
              id={item.id}
              solName={item.sol_name}
              solFullName={item.sol_full_name}
              korName={item.kor_name}
              url={item.url}
            />
          </div>

        ))}

      </div>
      <div className="gap-60" />




    </div>
  )
}

export default SolutionList;
