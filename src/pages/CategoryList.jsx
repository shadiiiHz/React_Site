import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ReactPaginate from "react-paginate";
import { getCategories, getTypes } from "../redux/apiCalls";
import styled from "styled-components";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
const PaginationStyle = styled.div`
  margin: 20px;
`;
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container2 = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff8dc;
  position: relative;
  flex-direction: column;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Title = styled.h1`
  color: black;
  margin: 10px 0px 10px;
  font-size: 18px;
  font-family: Vazirmatn, sans-serif;
`;
const LatinTitle = styled.h1`
  color: black;
  margin: 10px 0px 10px;
  font-size: 18px;
`;
const Id = styled.h1`
  color: black;
  margin: 10px 0px 10px;
  font-size: 18px;
`;
const Desc = styled.h1`
  color: black;
  margin-bottom: 10px;
  font-size: 15px;
`;

const CategoryInfo = styled.h2`
  color: black;
  margin-bottom: 10px;
  font-size: 15px;
`;

const CategoryList = () => {
  const location = useLocation();
  const type = location.pathname.split("/")[2];
  console.log(type);
  const [pageCount, setpageCount] = useState(0);
  const [pageCount2, setpageCount2] = useState(0);
  const [pageCount3, setpageCount3] = useState(0);

  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(1);
  const [page3, setPage3] = useState(1);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const types = useSelector((state) => state.type.types);

  const lastPage = useSelector((state) => state.category.lastPage);
  const lastPage2 = useSelector((state) => state.type.lastPage);
  //   const lastPage3 = useSelector((state) => state.type.lastPage);
  useEffect(() => {
    if (type === "all") {
      setpageCount(lastPage);
      getCategories(dispatch, page);
    }
  }, [dispatch, page, type]);
  useEffect(() => {
    if (type != "all") {
      setpageCount2(lastPage2);
      getTypes(dispatch, type, page2);
    }
  }, [dispatch, page2, type, lastPage2]);
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };
  const handlePageClick2 = async (data) => {
    let currentPage = data.selected + 1;
    setPage2(currentPage);
  };
  //   const handlePageClick3 = async (data) => {
  //     let currentPage = data.selected + 1;
  //     setPage3(currentPage);
  //   };
  return (
    <>
      {/* <Navbar /> */}
      {/* <Announcement /> */}
      <Container>
        {type === "all" &&
          categories.map((category) => {
            return (
              <Container2>
                <Id>{category.id}</Id>
                <Title> {category.title}</Title>
                <LatinTitle>
                  {category.latin_title && category.latin_title}
                </LatinTitle>
                <CategoryInfo>type : {category.type}</CategoryInfo>
                <Info>
                  <Icon>
                    <SearchOutlined />
                  </Icon>
                  <Icon>
                    <FavoriteBorderOutlined />
                  </Icon>
                </Info>
              </Container2>
            );
          })}
      </Container>
      {type === "all" && (
        <PaginationStyle>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </PaginationStyle>
      )}
      <Container>
        {type != "all" &&
          types.map((category) => {
            return (
              <Container2>
                <Id>{category.id}</Id>
                <Title> {category.title}</Title>
                <LatinTitle>
                  {category.latin_title && category.latin_title}
                </LatinTitle>
                <CategoryInfo>type : {category.type}</CategoryInfo>
                <Info>
                  <Icon>
                    <SearchOutlined />
                  </Icon>
                  <Icon>
                    <FavoriteBorderOutlined />
                  </Icon>
                </Info>
              </Container2>
            );
          })}
      </Container>

      {type != "all" && (
        <PaginationStyle>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount2}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick2}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </PaginationStyle>
      )}
      {/* <Container>
        {type === "%D9%85%D8%B4%D8%A7%D8%BA%D9%84" &&
          types.map((category) => {
            return (
              <Container2>
                <Id>{category.id}</Id>
                <Title> {category.title}</Title>
                <LatinTitle>
                  {category.latin_title && category.latin_title}
                </LatinTitle>
                <CategoryInfo>type : {category.type}</CategoryInfo>
                <Info>
                  <Icon>
                    <SearchOutlined />
                  </Icon>
                  <Icon>
                    <FavoriteBorderOutlined />
                  </Icon>
                </Info>
              </Container2>
            );
          })}
      </Container>

      {type === "%D9%85%D8%B4%D8%A7%D8%BA%D9%84" && (
        <PaginationStyle>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount3}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick3}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </PaginationStyle>
      )} */}

      <Footer />
    </>
  );
};

export default CategoryList;
