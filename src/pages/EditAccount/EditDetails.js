import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getUser, updateUser, userLogin } from "../../api/Auth";
import { userSignUp, saveUserPic } from "../../api/Auth";
import moment from "moment";
import DatePicker from "react-date-picker";
import { saveUser } from "../../api/Auth";
import { toast } from "react-toastify";
import { UserDataContext } from "../../Contexts/UserContext";

//Images
import userImage from "../../assets/png/userImage.png";
import cameraIcon from "../../assets/vector/camera_icon.svg";
import lockIconBlue from "../../assets/vector/lock_outline_blue.svg";
import locationIconBlue from "../../assets/vector/location_blue.svg";
import arrowRightBlue from "../../assets/vector/arrow_right_blue.svg";
import defaultUserImage from "../../assets/png/default_user_image.png";

//Component
import UpdateModal from "../../components/ModalComponenr/UpdateModal";

toast.configure();
const EditDetails = ({ profileDetails = true, setModalDataMobile, profilePicUpdate }) => {
  const [disabled, setDisabled] = useState(false);
  const matches = useMediaQuery("(min-width:768px)");
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [profilePic, setProfilePic] = useState({ locataion: "" });
  const [newProfilePic, setNewProfilePic] = useState(null);
  const { userContext, setUserContext } = useContext(UserDataContext);

  useEffect(() => {
    if (userContext && userContext.profilePic) {
      setProfilePic(userContext.profilePic);
    } else if (newProfilePic !== null) {
      setProfilePic(newProfilePic);
    } else {
      setProfilePic(defaultUserImage);
    }
  }, [userContext, newProfilePic]);

  const [displayInfo, setDisplayInfo] = useState({
    user_Full_Name: "",
    user_ph_Number: "",
    user_Email: "",
    user_Birth_Date: "",
  });

  const [secondaryData, setSecondaryData] = useState({
    user_Full_Name: "",
    user_ph_Number: "",
    user_Email: "",
    user_Birth_Date: "",
  });

  const [modalData, setModalData] = useState({
    number: null,
    oldData: "",
    newData: "",
    userName: displayInfo.user_Full_Name,
  });

  useEffect(() => {
    if (userContext) {
      setDisplayInfo({
        user_Full_Name: userContext.fullName,
        user_ph_Number: userContext.mobileNumber,
        user_Email: userContext.email,
      });
      setSecondaryData({
        user_Full_Name: userContext.fullName,
        user_ph_Number: userContext.mobileNumber,
        user_Email: userContext.email,
      });

      if (useContext.dob) {
        let bday = new Date(userContext.dob)
        setDisplayInfo(prev => ({
          ...prev,
          user_Birth_Date: bday,
        }))
        setSecondaryData(prev => ({
          ...prev,
          user_Birth_Date: bday,
        }))
      }
      // if (userContext.dob) {
      //   if (typeof (userContext.dob) === 'string') {
      //     let bdayRecieved = userContext.dob
      //     let seperateDOB = bdayRecieved.split('-')
      //     let yearRecieved = parseInt(seperateDOB[0])
      //     let monthRecieved = parseInt(seperateDOB[1])
      //     let dateRecieved = parseInt(seperateDOB[2])
      //     // let dateSep = dateWhole.slice(0, 2)
      //     // console.log(seperateDOB);
      //     // console.log(`
      //     // ${bdayRecieved}
      //     //   year: ${yearRecieved},
      //     //   month: ${monthRecieved},
      //     //   whole date: ${dateRecieved}

      //     // `);
      //     setSelectedDay({
      //       year: yearRecieved,
      //       month: monthRecieved,
      //       day: dateRecieved,
      //     })
      //   } else if (typeof (userContext.dob) === 'object') {
      //     setSelectedDay({
      //       year: userContext.dob.year,
      //       month: userContext.dob.month,
      //       day: userContext.dob.day,
      //     })
      //   }
      // } else if (userContext.dob === null) {
      //   setSelectedDay(null)
      // }
    }
  }, [userContext]);

  // console.log(userContext);

  const handleUpdate = (prop) => {
    if (prop === "number") {
      if (displayInfo.user_ph_Number !== secondaryData.user_ph_Number) {
        userSignUp(displayInfo.user_ph_Number, displayInfo.user_Full_Name).then((res) => {
          if (res) {
            setUserContext((prev) => ({
              ...prev,
              id: res.userId,
              fullName: displayInfo.fullName,
              mobileNumber: displayInfo.user_ph_Number,
            }));
          }
        });

        userLogin(secondaryData.user_ph_Number)
          .then((res) => {
            if (res) {
              setUserContext((prev) => ({
                ...prev,
                id: res.userId,
              }));
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setNewProfilePic(reader.result);
          setUserContext((prev) => ({
            ...prev,
            profilePic: e.target.files[0],
          }));
          // console.log(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // const userProfile = {
  //   userImage: userImage,
  //   userName: 'Rohan khamkar',
  //   userPhone: '+91-3987760925',
  //   userMail: 'rohankhamkar@gmail.com',
  //   Birthdate: '22-06-1998'
  // }

  const editPageOptions = [
    {
      image: locationIconBlue,
      title: "My Address",
      link: "/myaddress",
    },
  ];

  const validateForm = () => {
    displayInfo.user_Full_Name !== "" && displayInfo.user_ph_Number !== "" && displayInfo.user_Email !== "" && selectedDay !== null && userContext.profilePic && profilePicUpdate
      ? setDisabled(false)
      : setDisabled(true);
  };
  // console.log(selectedDay);
  // console.log(userContext.profilePic, profilePicUpdate);

  const handleModal = (prop) => {
    if (prop === "email") {
      setModalData({
        number: false,
        oldData: secondaryData,
        newData: displayInfo,
      });
    } else {
      setModalData({
        number: true,
        oldData: secondaryData,
        newData: displayInfo,
      });
    }
    setShowModal(true);
  };

  const handleInput = (prop, e) => {
    e.target ? setDisplayInfo({ ...displayInfo, [prop]: e.target.value }) : setDisplayInfo({ ...displayInfo, [prop]: e.label });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserContext((prev) => ({
      ...prev,
      fullName: displayInfo.user_Full_Name,
      email: displayInfo.user_Email,
      dob: selectedDay,
      mobileNumber: displayInfo.user_ph_Number,
    }));
    updateUser(userContext, displayInfo.user_Birth_Date)
      .then(res => res ? toast.success('Details Updated Successfully') : toast.error('Incomplete Data'))
    saveUserPic(userContext.newProfilePic)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          toast.success("Profile Updated");
        }
      })
      .catch((err) => console.log(err))
    getUser()
      .then(res => {
        if (res) {
          let user = res
          setUserContext(prev => ({
            ...prev,
            id: user._id,
            fullName: user.fullName,
            mobileNumber: user.mobileNumber,
            email: user.email,
            dob: user.dob,
          }))
        }
      })
  };


  const handleDate = (e, type, key) => {
    type((prev) => ({ ...prev, [key]: e }));
  };
  // console.log(displayInfo);

  return (
    <>
      <div className="page_Wrapper edit_Page_Wrapper">
        {profileDetails && (
          <div className="profile_User_Details">
            <div className="user_Profile_Pic_Container">
              <div className="user_Profile_Pic">
                <img src={profilePic} alt="" />
              </div>
              <div className="user_Camera_Icon">
                <img src={cameraIcon} alt="" />
                <form action="" encType="multipart/form-data">
                  <input type="file" name="Profile Image" id="Profile Image" onChange={handleImageChange} className="profile_Image" accept=".jpg, .jpeg, .png" />
                </form>
              </div>
            </div>
          </div>
        )}
        <form action="" className="profile_edit_form" onChange={validateForm} onSubmit={handleSubmit}>
          <div className="edit_input_container">
            <label className="edit_input_label">Name</label>
            <input type="text" placeholder="Text" className="input-field" value={displayInfo.user_Full_Name} onChange={(value) => handleInput("user_Full_Name", value)} />
          </div>
          <div className="edit_input_container">
            <label className="edit_input_label">Phone number</label>
            <input type="text" placeholder="Text" className="input-field" value={displayInfo.user_ph_Number} onChange={(value) => handleInput("user_ph_Number", value)} />
            {matches ? (
              <div
                className="edit_input_update"
                onClick={() => {
                  handleUpdate("number");
                  handleModal("number");
                }}
              >
                Update
              </div>
            ) : (
              <Link
                to={"/update-details/number"}
                className="edit_input_update"
                onClick={() =>
                  setModalDataMobile({
                    number: true,
                    oldData: secondaryData,
                    newData: displayInfo,
                  })
                }
              >
                Update
              </Link>
            )}
          </div>
          <div className="edit_input_container">
            <label className="edit_input_label">Email Id</label>
            <input type="text" placeholder="Text" className="input-field" value={displayInfo.user_Email} onChange={(value) => handleInput("user_Email", value)} />
            {matches ? (
              <div
                className="edit_input_update"
                onClick={() => {
                  handleUpdate("email");
                  handleModal("email");
                }}
              >
                Update
              </div>
            ) : (
              <Link
                to={"/update-details/email"}
                className="edit_input_update"
                onClick={() =>
                  setModalDataMobile({
                    number: false,
                    oldData: secondaryData,
                    newData: displayInfo,
                  })
                }
              >
                Update
              </Link>
            )}
          </div>
          <div className="edit_input_container">
            <label className="edit_input_label">Birthday (dd/mm/yyyy)</label>
            <div>
              <DatePicker value={displayInfo.user_Birth_Date} onChange={(e) => handleDate(e, setDisplayInfo, "user_Birth_Date")} format="dd/MM/y" className={"input-field custom-date-picker"} />
            </div>
          </div>
          {matches && (
            <div>
              <button type="submit" className="submit-button profile_Submit_Button" disabled={false}>
                <p>SAVE DETAILS</p>
              </button>
            </div>
          )}
        </form>
        <div className="profile_Options edit_Extra_Options">
          {editPageOptions.map((option, index) => (
            <Link to={option.link} className={`profile_Option edit_Profile_Option ${option.title === "Logout" ? "logout_Styles" : ""}`} key={index}>
              <div>
                <img src={option.image} alt="" />
                <p>{option.title}</p>
              </div>
              <img src={arrowRightBlue} alt="" className="profile_arrow" />
            </Link>
          ))}
        </div>
        <div className="address_Footer tab_None">
          <button type="submit" className="submit-button" onClick={() => handleSubmit()} disabled={disabled}>
            <p>SAVE DETAILS</p>
          </button>
        </div>
      </div>
      {matches && <UpdateModal showModal={showModal} setShowModal={setShowModal} modalData={modalData} />}
    </>
  );
};

export default EditDetails;
