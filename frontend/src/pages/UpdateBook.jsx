import { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const UpdateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('Error occured, please check console');
        console.log(error);
      });
  }, []);

  const handleUpdateBook = () => {
    const data = { title, author, publishYear };
    const fetchDetails = async () => {
      try {
        setLoading(true);
        await axios.put(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/${id}`,
          data
        );
        enqueueSnackbar('Book Updated Successfully', { variant: 'success' });
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
      <h1 className="text-3xl my-4">Update Book</h1>
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
          <button className="p-2 bg-sky-300 m-8" onClick={handleUpdateBook}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateBook;
