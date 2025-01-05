import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { Jumbotron } from "../../components/jumbotron";
import { Table } from "../../components/table";
import { Layout } from "../layout";
import { SubAdminsAreaTableWrapper, SubAdminsAreaWrapper } from "./styled";
import { retrieveSubAdmins } from "../../util/apis/retrieveSubAdmins";
import Cookies from "universal-cookie";

export const SubAdminsArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;

    const dropdownRefs = useRef({});
    const [subAdminsInfo, setSubAdminsInfo] = useState([]);
    const [activatedRowId, setActivatedRowId] = useState(null);

    const handleSelectedSubAdmin = (e, id) => {
        e.preventDefault();
        setActivatedRowId(id);
    };

    const handleActionItemClick = (e, action, id) => {
        e.stopPropagation();
        console.log(action, id);
    };

    const getDropdownRef = (email) => {
        if (!dropdownRefs.current[email]) {
            dropdownRefs.current[email] = createRef();
        }
        return dropdownRefs.current[email];
    };

    const handleDropDownClickOutside = useCallback((event) => {
        const activeRef = dropdownRefs.current[activatedRowId];
        if (activeRef && activeRef.current && !activeRef.current.contains(event.target)) {
            setActivatedRowId(null);
        }
    }, [activatedRowId]);

    useEffect(() => {
        const fetchSubAdmins = async () => {
            try {
                const response = await retrieveSubAdmins(token);
                setSubAdminsInfo(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSubAdmins();
    }, [token]);


    useEffect(() => {
        if (activatedRowId !== null) {
            document.addEventListener("mousedown", handleDropDownClickOutside);
        } else {
            document.removeEventListener("mousedown", handleDropDownClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleDropDownClickOutside);
        };
    }, [activatedRowId, handleDropDownClickOutside]);

    return (
        <Layout>
            <SubAdminsAreaWrapper>
                <Jumbotron
                    entity={"Sub-Admins"}
                />
                <SubAdminsAreaTableWrapper>
                    <Table
                        location={"subAdminsArea"}
                        columnTitles={["Email", "Actions"]}
                        rowItems={subAdminsInfo}
                        onSelectOption={(x, y, event) => event.preventDefault()}
                        subAdminModalRef={getDropdownRef}
                        activatedSubAdminEmail={activatedRowId}
                        handleSelectedSubAdmin={handleSelectedSubAdmin}
                        handleSubAdminModalActionItemClick={handleActionItemClick}
                    />
                </SubAdminsAreaTableWrapper>
            </SubAdminsAreaWrapper>
        </Layout>
    )
}