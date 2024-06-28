import { useEffect } from "react";
import "./ideaBorad.scss";
import DataTable from "../../components/DataTable/DataTable";

const IdeaBorad = () => {

  useEffect(() => {
    const appElement = document.querySelector('.app');
    appElement.classList.add('ideaBoard-active');

    return () => {
      appElement.classList.remove('ideaBoard-active');
    };
  }, []);

  return (
    <div className="ideaBoard">
      <div className="box">
        <div className="bg"></div>
      </div>

      <div className="wrapp">
        <div className="sideMenu">
          <div className="menuNm">Menu 01</div>
          <div className="menuNm">Menu 01</div>
          <div className="menuNm">Menu 01</div>
          <div className="menuNm">Menu 01</div>
          <div className="menuNm">Menu 01</div>


        </div>
        <div className="contents">
          <h1>
            IdeaBorad
          </h1>
          <button>아이디어 등록</button>
          <DataTable />
        </div>

      </div>
      <div className="gap-60"></div>
    </div>
  )
}


export default IdeaBorad
