import { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = { title, author, publishYear };
    const fetchDetails = async () => {
      try {
        setLoading(true);
        await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books`,
          data
        );
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      } catch (error) {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log('Error occured while creating book', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="felx flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label htmlFor="title" className="text-xl mr-4 text-gray-500">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={title}
              onChange={(eve) => setTitle(eve.target.value)}
              placeholder="Enter title"
            />
          </div>
          <div className="my-4">
            <label htmlFor="author" className="text-xl mr-4 text-gray-500">
              Author
            </label>
            <input
              type="text"
              name="author"
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={author}
              onChange={(eve) => setAuthor(eve.target.value)}
              placeholder="Enter author"
            />
          </div>
          <div className="my-4">
            <label htmlFor="publishYear" className="text-xl mr-4 text-gray-500">
              Publish Year
            </label>
            <input
              type="text"
              name="publishYear"
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={publishYear}
              onChange={(eve) => setPublishYear(eve.target.value)}
              placeholder="Enter publish year"
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateBook;
