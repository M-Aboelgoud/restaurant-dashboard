import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import Slider from "../components/BooksSlider";
import AddItemButton from "../components/BooksSlider/AddItemButton";
import Modal from "../components/Modal";
import { API_BASE_URL } from "../constants/api";


function useFetchData(url, token) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(url, axiosConfig);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      setData(null);
    };
  }, [url, token]);

  return { data, error };
}

const Dashboard = () => {
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const { data, error } = useFetchData(
    `${API_BASE_URL}/api/v1/dashboard`,
    token
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token, navigate]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Modal open={openModal} onClose={() => setOpenModal(false)} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner />
            <div className="flex justify-center flex-col pb-6 ">

              {data &&(
                <Slider zindex={0} title=" Restaurant">
                  {/* Add the button as the first item */}
                  <AddItemButton onClick={() => setOpenModal(true)} />

                  {/* The rest of the items */}
                  {data.reverse().map((book, index) => (
                    <Slider.Item book={book} key={index}></Slider.Item>
                  ))}
                </Slider>
              )}
            </div>


            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"></div>

          </div>

        </main>
      </div>

    </div>
  );
};

export default Dashboard;
