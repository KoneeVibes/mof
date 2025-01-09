import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Jumbotron } from "../../components/jumbotron";
import { Table } from "../../components/table";
import { Layout } from "../layout";
import { CollectionsAreaTableWrapper, CollectionsAreaWrapper } from "./styled";
import { getAllCollections } from "../../util/apis/getAllCollections";

export const CollectionsArea = () => {
    const columns = ["Collection", "Actions"];
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;

    const navigate = useNavigate();
    const dropdownRefs = useRef({});
    const [collectionsInfo, setCollectionsInfo] = useState([]);
    const [activatedRowId, setActivatedRowId] = useState(null);

    const handleSelectedCollection = (e, id) => {
        e.preventDefault();
        setActivatedRowId(id);
    };

    const handleActionItemClick = (e, action, collectionId) => {
        e.stopPropagation();
        if (action !== "edit") return;
        return navigate(`/update/collection/${collectionId}`)
    };

    const getDropdownRef = (id) => {
        if (!dropdownRefs.current[id]) {
            dropdownRefs.current[id] = createRef();
        }
        return dropdownRefs.current[id];
    };

    const handleDropDownClickOutside = useCallback((event) => {
        const activeRef = dropdownRefs.current[activatedRowId];
        if (activeRef && activeRef.current && !activeRef.current.contains(event.target)) {
            setActivatedRowId(null);
        }
    }, [activatedRowId]);

    useEffect(() => {
        const fetchAllCollections = async () => {
            try {
                const response = await getAllCollections(token);
                setCollectionsInfo(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllCollections();
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
            <CollectionsAreaWrapper>
                <Jumbotron
                    entity={"Collections"}
                />
                <CollectionsAreaTableWrapper>
                    <Table
                        location={"collectionsArea"}
                        columnTitles={columns}
                        rowItems={collectionsInfo}
                        onSelectOption={(x, y, event) => event.preventDefault()}
                        collectionModalRef={getDropdownRef}
                        activatedCollectionId={activatedRowId}
                        handleSelectedCollection={handleSelectedCollection}
                        handleCollectionModalActionItemClick={handleActionItemClick}
                    />
                </CollectionsAreaTableWrapper>
            </CollectionsAreaWrapper>
        </Layout>
    )
}