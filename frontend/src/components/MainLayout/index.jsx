import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import AddSnippetModal from "../AddSnippetModal"; 

const MainLayout = ({ searchValue, onSearchChange}) => {
 

    return (
        <>
        <NavBar 
            searchValue={searchValue} 
            onSearchChange={onSearchChange} 
        />
        <div className="main-content">
                    <Outlet />
        </div>
        
        </>
    );
};

export default MainLayout;
