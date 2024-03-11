import React, { useEffect, useState } from 'react'
import SolutionBox from './SolutionBox';


export const WorkField = ({ solutionData }) => {

  const [titleText, setTitleText] = useState('');
  const [count, setCount] = useState(0);
  useEffect(() => {
    const replacedTitleText = {
      'rm': 'RM',
      'access': 'Access',
      'wire': '전송',
      'infra': 'Infra설비',
      'asset': '자산',
      'so': 'SO',
      'mgmt': '경영'
    }[solutionData[0].work_field];
    setTitleText(replacedTitleText);
    setCount(solutionData.length);
  }, [solutionData]);

  return (
    <div className="workfield">
      <div className="gap-100" />
      <div className="titleText">{titleText} Solution List</div>
      <div className="subText">{titleText} Solution의 목록은 {count}개 입니다.</div>
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
              img={item.img}
            />
          </div>
        ))}
      </div>
      <div className="gap-60" />
    </div>
  )
}

export default WorkField;
