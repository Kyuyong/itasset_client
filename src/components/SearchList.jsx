import React from 'react'
import SolutionBox from './SolutionBox';


export const SearchList = ({ searchResults }) => {

  console.log(searchResults)
  return (
    <div className="searchlist">
      <div className="gap-100" />

      <div className="titleText">검색 결과</div>
      {searchResults.length > 0 ? (
        <div className="solutionsContainer">
          {searchResults.map((item) => (
            <div key={item.id}>
              <SolutionBox
                id={item.id}
                solName={item.sol_name}
                solFullName={item.sol_full_name}
                korName={item.kor_name}
                url={item.url}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="noResults">
          검색된 결과가 없습니다. 다시 검색을 해보세요.
        </div>
      )}
      <div className="gap-60" />
    </div>
  )
}

export default SearchList;
