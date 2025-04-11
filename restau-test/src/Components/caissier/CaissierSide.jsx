import HeaderCaissier from "./Header";
import SideBarCaissier from "./SideBarCaissier";

const CaissierSide = () => {
    return(
        <div className="h-screen flex">
            <SideBarCaissier />
            <div className="flex-1 flex flex-col">
            <HeaderCaissier />
            </div>

            </div>
    )
}
export default CaissierSide