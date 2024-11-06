import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FiUpload } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { IoCloudUploadOutline, IoPerson } from 'react-icons/io5';
import { getDatabase, push, ref as projectref, onValue, set, remove } from "firebase/database";
import { ErrorToast, SuccessToast } from '../../Utilities/Toastify/Toastify';
import moment from 'moment';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {RotatingLines } from 'react-loader-spinner'
import { MdDelete, MdRequestPage } from 'react-icons/md';
import { FaCode } from 'react-icons/fa';
import { CiLink } from 'react-icons/ci';
import { useTheme } from '../Theme/ThemeContext';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const customStyles = {
  content: {
    width: '50%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    borderRadius: '8px',
    padding: '20px 25px',
    transform: 'translate(-50%, -50%)',
  },
};
const customStylesProject = {
  content: {
    width: '40%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    borderRadius: '8px',
    padding: '20px 25px',
    transform: 'translate(-50%, -50%)',
  },
};

export const Home = () => {
  const db = getDatabase();
  const {darkMode} = useTheme();

  // State declarations
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteproject, setdeleteproject] = useState (false);
  const [projectShowModal, setprojectShowModal] = useState(false);
  const [image, setimage] = useState (false);
  const [project, setproject] = useState ([]);
  const [itemProject, setitemProject] = useState ('');
  const [loading, setloading] =useState (false);
  const [progress, setprogress] = useState (null);
  const [previewImage, setPreviewImage] = useState(null);
  const [projectNameInput, setprojectNameinput] = useState('');
  const [projectTypeInput, setprojectTypeInput] = useState('');
  const [projectLanguageInput, setprojectLanguageInput] = useState('');
  const [projetLiveLinkInput, setprojetLiveLinkInput] = useState('');
  const [previewImageError, setPreviewImageError] = useState(false);
  const [projectNameInputError, setprojectNameinputError] = useState(false);
  const [projectTypeInputError, setprojectTypeInputError] = useState(false);
  const [projectLanguageInputError, setprojectLanguageInputError] = useState(false);
  const [projetLiveLinkInputError, setprojetLiveLinkInputError] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeProjectModal = () =>{
    setprojectShowModal(false);
    setdeleteproject(false);
  }
  const closeModal = () => setIsOpen(false);
  const handleOnChangeImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      ErrorToast("Please upload an image file.");
      return;
    }
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setprogress(progress);
      },
      (error) => {
        console.error('Upload failed:', error);
        ErrorToast(`Image upload failed: ${error.message}`);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log('File available at', downloadURL);
            setPreviewImage(downloadURL); 
            setimage(downloadURL);
            setprogress(''); 
          })
          .catch((error) => {
            console.error('Failed to get download URL:', error);
            ErrorToast("Failed to retrieve download URL.");
          });
      }
    );
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };
  const handleUploadButton = () => {
    if (!projectNameInput) {
      setprojectNameinputError(true);
    } else if (!projectTypeInput) {
      setprojectNameinputError(false);
      setprojectTypeInputError(true);
    } else if (!projectLanguageInput) {
      setprojectTypeInputError(false);
      setprojectLanguageInputError(true);
    } else if (!projetLiveLinkInput) {
      setprojectLanguageInputError(false);
      setprojetLiveLinkInputError(true);
    }else if(!previewImage){
      setPreviewImageError(true);
      setprojectLanguageInputError(false);
      setprojetLiveLinkInputError(false);
    }else if (!image){
      setPreviewImageError(false);
      setprojectLanguageInputError(false);
      setprojetLiveLinkInputError(false);
    }else {
      setloading(true);
      setprojectNameinputError(false);
      setprojectTypeInputError(false);
      setprojectLanguageInputError(false);
      setprojetLiveLinkInputError(false);
      setPreviewImageError(false);
      setPreviewImage(null)
      const projectRef = projectref(db, 'Project');
      set(push(projectRef), {
        ProjectName: projectNameInput,
        ProjectType: projectTypeInput,
        ProjectLanguage: projectLanguageInput,
        ProjectLiveLink: projetLiveLinkInput,
        ProjectImage: image,
        CreatedAt: moment().format("MM DD YYYY, h:mm:ss a"),
      })
      .then(() => 
        SuccessToast('Project uploaded successfully'
        )).catch((err) => {
          ErrorToast(err.message)
        }).finally(() =>{
          setloading(false);
          setimage(false);
          setPreviewImage(null);
          setprojectNameinput('');
          setprojectTypeInput('');
          setprojectLanguageInput('');
          setprojetLiveLinkInput('');
          setprojectNameinputError(false);
          setprojectTypeInputError(false);
          setprojectLanguageInputError(false);
          setprojetLiveLinkInputError(false);
          setPreviewImageError(false);
          setIsOpen(false);
        })
    }
  };
// ================handleimage function implement
const handleimage =((item) =>{
  setprojectShowModal(true);
  setitemProject(item);
});
 
useEffect (() => {
  const projectRefarence = projectref(db, 'Project/');
  onValue(projectRefarence, (snapshot) => {
    const projectArr = [];
    snapshot.forEach((item) =>{
      projectArr.push({...item.val() , projectKey : item.key})
    
    });
    setproject(projectArr);
  });
}, [])

// const projectObject = project.find((item) => item.ProjectImage);

const handledeletebutton = (() =>{
  setdeleteproject(!deleteproject);
 
});
const handleDelete =((itemProject = {}) =>{
 const ProjectRemove = projectref(db, "Project/" + itemProject.projectKey);
  remove(ProjectRemove).then(() => {
    setprojectShowModal(false);
    SuccessToast(`${itemProject.ProjectName} Project Delete successful`)
  }).then(() =>{
    setdeleteproject(false);
  }).catch((err) => {
      ErrorToast(err);
  });
});

console.log(deleteproject);
console.log('asldkfjl');

useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}, [darkMode]);
console.log(darkMode, 'sdfsdf');

  return (
<div>
<div className=' fixed top-5 left-10'>
  <Link to={'/'}><h2 className='relative loadingtext after:absolute after:w-full after:h-full after:top-0 after:left-0 after:text-3xl after:cursor-pointer after:text-blue-500 after:font-semibold after:font-Inkut'></h2></Link>
</div>
<div className={`${!darkMode ? 'Day-Background' : 'Night-Background'} w-full min-h-screen flex justify-center items-center flex-col`}>
      <div className='my-16'>
        <h2 className={`${!darkMode ? 'day-text' : 'night-text'} text-6xl font-black font-Inkut uppercase`}>
          My <span className='text-blue-500'>Portfolio</span>
        </h2>
      </div>
      <div className='w-[80%] flex justify-center items-center flex-wrap gap-7'>
        <div className='w-[320px] h-[197px] overflow-hidden relative zoom-div cursor-pointer flex justify-center items-center rounded-lg bg-gray-300' onClick={openModal}>
          <span className='text-5xl text-gray-500'><FiUpload /></span>
          <div className=''>
        <h2 className='zoom-image-text w-full h-full flex justify-center items-center text-[18px] text-white font-Poppins font-semibold uppercase absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  opacity-0 bg-[#ffb400] transition-all duration-500'><span className='w-full h-full text-5xl text-white flex justify-center items-center translate-y-[20px]'><FiUpload /></span></h2>
      </div>
        </div>
        {project?.length > 0 ? (
  project.map((item, index) => (

    <div className='relative zoom-div rounded-lg overflow-hidden cursor-pointer' onClick={() => handleimage(item)} >
            <picture>
        <img 
          className="w-[320px] h-[197px] rounded-lg" 
          src={item?.ProjectImage}
          alt={`Project Image ${index + 1}`} 
          
        />
      </picture>
      <div className=''>
        <h2 className='zoom-image-text w-full h-full flex justify-center items-center text-[18px] text-white font-Poppins font-semibold uppercase absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  opacity-0 bg-[#ffb400] transition-all duration-500'><span className='w-full h-full flex justify-center items-center translate-y-[-20px]'>{item?.ProjectName}</span></h2>
      </div>    
    </div>

  ))
) : (
  <div className='w-full flex justify-center items-center'>
    <h2 className='text-xl text-red-400 font-Poppins font-medium'>Upload Your Project</h2>
  </div>
)}
      </div>

      {<Modal
          onRequestClose={closeModal}
          isOpen={modalIsOpen}
          style={customStyles}
         >
                    <button className='w-full h-full flex justify-end text-3xl text-red-500' onClick={closeModal}>
            <RxCross2 />
          </button>
          <div>
            <div className='mb-10'>
              <h2 className={`${!darkMode ? 'day-text' : 'night-text' } text-4xl font-Inkut font-extrabold text-center`}>
                Upload <span className='text-blue-500'>Project</span>
              </h2>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className='flex flex-col gap-y-5'>
                <div className='flex justify-between items-center gap-x-8'>
                  <div className='flex items-center gap-x-3 w-full'>
                    <label className={`${!darkMode ? 'day-text' : 'night-text' } text-base font-semibold font-Poppins`}>Project Name :</label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      className={`${!projectNameInputError? 'border-gray-400' : '!border-red-400'} ${!darkMode ? 'text-black' : 'inputboxshadow text-white'} flex-grow outline-0 border-[1px] rounded-md px-3 py-[4px]`}
                      onChange={((e) => setprojectNameinput(e.target.value))}
                      value={projectNameInput}
                    />
                  </div>
                  <div className='flex items-center gap-x-3 w-full'>
                    <label className={`${!darkMode ? 'day-text' : 'night-text' } text-base font-semibold font-Poppins`}>Project Type :</label>
                    <select
                      name='projectType'
                      id='projectType'
                      className={`${!projectTypeInputError? 'border-gray-400' : 'border-red-400'} ${!darkMode ? 'text-black' : 'inputboxshadow text-white'} flex-grow outline-0 border-[1px] rounded-md border-gray-400 px-3 py-[4px] h-[33px] text-base text-black font-medium font-Poppins`}
                    defaultValue={''}
                    value={projectTypeInput}
                      onChange={((e) => setprojectTypeInput(e.target.value))}
                    >
                      <option className={`${!darkMode ? 'text-black' : 'text-white'} text-base font-Inkut font-medium`} value="" disabled hidden>Choose Project Type</option>
                      <option className={`${!darkMode ? 'text-black' : 'text-white'} text-base font-Inkut font-medium`} value='client Project'>Client Project</option>
                      <option className={`${!darkMode ? 'text-black' : 'text-white'} text-base font-Inkut font-medium`} value='personal Project'>Personal Project</option>
                    </select>
                  </div>
                </div>
                <div className='flex justify-between items-center gap-x-8'>
                  <div className='flex items-center gap-x-3 w-full'>
                    <label className={`${!darkMode ? 'day-text' : 'night-text' } text-base font-semibold font-Poppins`}>Language :</label>
                    <select
                      name='projectLanguage'
                      id='projectLanguage'
                      className={`${!projectLanguageInputError? 'border-gray-400' : 'border-red-400'} ${!darkMode ? 'text-black' : 'inputboxshadow text-white'} flex-grow outline-0 border-[1px] rounded-md border-gray-400 px-3 py-[4px] h-[33px] text-base text-black font-medium font-Poppins`}
                      defaultValue={''}
                      onChange={((e) => setprojectLanguageInput(e.target.value))}
                      value={projectLanguageInput}
                    >
                      <option className={`${!darkMode ? 'text-black' : 'text-white'} text-base font-Inkut font-medium`} value="" disabled hidden>Choose Project Language</option>
                      <option className={`${!darkMode ? 'text-black' : 'text-white'} text-base font-Inkut font-medium`} value='HTML / CSS'>HTML / CSS</option>
                      <option className={`${!darkMode ? 'text-black' : 'text-white'} text-base font-Inkut font-medium`} value='REACT'>REACT</option>
                    </select>
                  </div>
                  <div className='flex items-center gap-x-3 w-full'>
                    <label className={`${!darkMode ? 'day-text' : 'night-text' } text-base font-semibold font-Poppins`}>Live Link :</label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      className={`${!projetLiveLinkInputError? 'border-gray-400' : 'border-red-400'} ${!darkMode ? 'text-black' : 'inputboxshadow text-white'} flex-grow outline-0 border-[1px] rounded-md border-gray-400 px-3 py-[4px]`}
                      onChange={((e) => setprojetLiveLinkInput(e.target.value))}
                      value={projetLiveLinkInput}
                    />
                  </div>
                </div>
              </div>
              <div className='mt-10 mb-5 w-full h-full flex justify-center items-center gap-x-4'>
                <div className='relative w-full rounded-md h-[213px] bg-gray-300'>
                  <input
                    type="file"
                    id="file"
                    className="file-input absolute inset-0 opacity-0 cursor-pointer z-[999]"
                    onChange={handleOnChangeImage}
                  />
                  <span className={`${!previewImageError? 'text-black' : 'text-red-500'} text-4xl  absolute top-[42%] left-[46%]`}><IoCloudUploadOutline /></span>
                </div>
                <div className='w-full h-[213px]'>
                  <picture>
                    <img className='w-full h-full rounded-md object-cover bg-slate-300' src={previewImage || ''} alt="" />
                  </picture>
                </div>
              </div>
              {
  progress >= 1 ? (
    <div>
    <button style={{width: `${Math.ceil(progress)}%`}}
     className='w-full h-[45px] rounded-lg bg-blue-500 flex justify-center items-center text-xl text-white font-medium font-Poppins' onClick={handleUploadButton}>{Math.ceil(progress)}%</button>
    </div>
  ) : (
    <div>
    <button className='w-full h-[45px] rounded-lg bg-blue-500 flex justify-center items-center text-xl text-white font-medium font-Poppins' onClick={handleUploadButton}>
      
      {loading? (
(<RotatingLines
visible={true}
height="32"
width="32"
color="white"
strokeWidth="5"
animationDuration="0.75"
ariaLabel="rotating-lines-loading"
wrapperStyle={{}}
wrapperClass=""
/>)
      ) : (
        'Upload'
      )}
      </button>
  </div>
  )
}
            </form>
          </div>
        </Modal>}
        {<Modal
          onRequestClose={closeProjectModal}
          isOpen={projectShowModal}
          style={customStylesProject}
          contentLabel="Example Modal"
        >
          <div className='flex justify-between items-center'>
            <div className='relative'>
            <button className={`${!darkMode ? 'day-text' : 'night-text' } text-[22px]`} onClick={handledeletebutton} >      
      <HiOutlineDotsVertical/>
      </button>
      {!deleteproject ? ('') : (
                  <div className={`${!darkMode ? 'Day-Background' : 'Night-Background shadow-button-night-shadow' } absolute top-[5px] right-[-170px] w-[170px] flex flex-col justify-center items-center py-[10px] bg-white shadow-day-span-shadow rounded-lg z-20`}>
                       <button className='text-gray-400 hover:text-commonBackground font-medium font-openSans text-[16px] w-full flex items-center py-[4px] hover:bg-[#8080803d] group' onClick={() =>handleDelete(itemProject)}>
                           <span className={`${!darkMode ? 'day-text' : 'night-text' } text-[18px] pl-[15px] pr-[10px] group-hover:text-commonBackground`}><MdDelete /></span> Delete
                       </button>
                  </div>
      )}

            </div>
            <div>
            <button className='w-full h-full flex justify-end text-3xl text-red-500' onClick={closeProjectModal}>
            <RxCross2 />
          </button>
            </div>
          </div>
          
          <div>
            <div className='mb-10'>
              <h2 className={`${!darkMode ? 'day-text' : 'night-text' } text-4xl font-Inkut font-extrabold text-center uppercase`}>
                My <span className='text-blue-500'>Project</span>
              </h2>
            </div>
            <div className='flex flex-col gap-y-3'>
            <div className='flex justify-between items-center'> 
            <div className='flex gap-x-[5px]'>
            <div className='flex items-center gap-[5px]'>
            <span className={`${!darkMode ? 'day-text' : 'night-text' } text-[18px]`}><MdRequestPage/></span>
                    <span className={`${!darkMode ? 'day-text' : 'night-text' } text-base font-normal font-Poppins`}>Project Name :</span>
            </div>
            <div>
              <h3 className={`${!darkMode ? 'day-text' : 'night-text' } text-base font-semibold font-Poppins`}>{itemProject?.ProjectName}</h3>
            </div>
            </div>
            <div className='flex gap-x-[5px]'>
            <div className='flex items-center gap-[5px]'>
            <span className={`${!darkMode ? 'day-text' : 'night-text' } text-[18px]`}><IoPerson/></span>
                    <span className={`${!darkMode ? 'day-text' : 'night-text' } text-base font-normal font-Poppins`}>Client Name :</span>
            </div>
            <div>
              <h3 className={`${!darkMode ? 'day-text' : 'night-text' } text-base font-semibold font-Poppins`}>{itemProject?.ProjectType}</h3>
            </div>
            </div>
            </div>
            <div className='flex justify-between items-center'> 
            <div className='flex gap-x-[5px]'>
            <div className='flex items-center gap-[5px]'>
            <span className={`${!darkMode ? 'day-text' : 'night-text' } text-[18px]`}><FaCode/></span>
                    <span className={`${!darkMode ? 'day-text' : 'night-text' } text-base font-normal font-Poppins`}>Language :</span>
            </div>
            <div>
              <h3 className={`${!darkMode ? 'day-text' : 'night-text' } text-base font-semibold font-Poppins`}>{itemProject?.ProjectLanguage}</h3>
            </div>
            </div>
            <div className='flex gap-x-[5px]'>
            <div className='flex items-center gap-[5px]'>
            <span className={`${!darkMode ? 'day-text' : 'night-text' } text-[18px]`}><CiLink/></span>
                    <span className={`${!darkMode ? 'day-text' : 'night-text' } text-base font-normal font-Poppins`}>Live Link :</span>
            </div>
            <div>
              <a href={itemProject?.ProjectLiveLink} className={`${!darkMode ? 'day-text' : 'night-text' } text-base font-semibold font-Poppins`}>{'www.website.com'}</a>
            </div>
            </div>
            </div>
            </div>
            <div className='w-full modalimageParrent'>
              <picture><img className='w-full max-h-[400px] object-cover rounded-lg mt-8 cursor-pointer modalimage' src={itemProject?.ProjectImage} alt={itemProject?.ProjectImage} /></picture>
            </div>
          </div>
        </Modal>}
       
    </div>
</div>
  );
};





