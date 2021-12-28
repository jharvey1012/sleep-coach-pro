import { ReactChild, ReactFragment, ReactPortal } from "react";
import Header from "../Header/Header";

const Layout = (props: { children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => (
    <div className="scp-layout">
        <Header />
        <div className="scp-content">
            { props.children }
        </div>
    </div>
)

export default Layout;