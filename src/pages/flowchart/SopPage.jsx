// import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import config from '../../env/config';

const SopPage = () => {
  const { title } = useParams(); // Menangkap parameter `title` dari URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModalDel, setShowModalDel] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [error, setError] = useState(null);
  const [currentItem, setCurrentItem] = useState({index: null, item: ''});
  const [currentInputValue, setInputValue] = useState({index: null, item: ''});
  const [currentAddInputValue, setAddInputValue] = useState('');

  const fetchSopData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.apiEndpoint}/data`); // API endpoint dengan title
      const result = response.data

      const titleToFind = decodeURIComponent(title); // Ganti dengan Title yang ingin dicari
      const filteredData = result.data
        .filter(item => item.Title === titleToFind);

      console.log("data nya")
      console.log(filteredData[0]['Body'])

      setData(filteredData[0]['Body']); // Simpan data yang sudah difilter langsung ke state
      setLoading(false);
    } catch (error) {
      

      setError('Error fetching data');
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchSopData();
  }, [title]);

  useEffect(() => {
    if (showModal || showModalAdd || showModalDel) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
}, [showModal, showModalAdd, showModalDel]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleEdit = (index, item) => {
    setCurrentItem({ index: index, item: item} );
    console.log(index, item)
    setShowModal(true); // Show the modal
  };

  const handleDelete = (index, item) => {
    setCurrentItem({index:index, item:item})
    setShowModalDel(true);
  };
  
  const handleAdd = () => {
    setShowModalAdd(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setInputValue({index: null, item: ''});
  }

  const handleCloseModalDel = () => {
    setShowModalDel(false);
    setInputValue({index: null, item: ''});
  }

  const handleCloseModalAdd = () => {
    setShowModalAdd(false);
  }

  const handleSubmit = async () => {
    console.log(currentInputValue['item'])
    try {
      const url = `${config.apiEndpoint}/data/${title}/body/${currentInputValue['index']}`

      await axios.put(url, {
        Body: currentInputValue['item']
      });

      console.log('Data berhasil diupdate')
      setShowModal(false);
      fetchSopData();
      setInputValue('');
    } catch (error) {
      console.log('Data gagal di update', error)
    }
  }

  const handleSubmitAdd = async () => {
    console.log(currentAddInputValue)

    try{
      const url = `${config.apiEndpoint}/data/${title}/body`

      await axios.post(url, {
        Body: currentAddInputValue
      });

      console.log('data berhasil di update');
      setShowModalAdd(false);
      fetchSopData();
      setAddInputValue('');
    } catch(error){
      console.log('data gagal ditambahkan')
    }
  }

  const handleDeleteSubmit = async () => {
    console.log(currentItem['item'])

    try {
      const url = `${config.apiEndpoint}/data/${title}/body/${currentItem['index']}`

      await axios.delete(url);
      console.log('Data berhasil dihapus')
      setShowModalDel(false);
      fetchSopData();
    } catch (error) {
      console.log('data gagal dihapus')
    }
  }



  return (
    <div>
      <div className=' my-3 py-3' >
        <h2 className=''>{decodeURIComponent(title)}</h2>
        <div className=' mt-5' >
          <button className='btn btn-primary' onClick={handleAdd} >Add Item</button>  
        </div>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th scope="col" className='col-1'>#</th>
                    <th scope="col" className='col'>Title</th>
                    <th scope="col" className='col-2'>Actions</th>
                </tr>
            </thead>

            <tbody>
            {data.length > 0 ? (
                data.map((item, index) => (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item}</td>
                    <td>
                        <div>
                            <button
                                className="btn btn-primary btn-sm me-2" // Tambahkan margin-end untuk jarak
                                onClick={() => handleEdit(index, item)} // Panggil fungsi handleEdit
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(index, item)} // Panggil fungsi handleDelete
                            >
                                Hapus
                            </button>

                        </div>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="3" className="text-center">
                    No data available
                </td>
                </tr>
            )}
            </tbody>
        </table>
      </div>

      {showModal && (
        <>
          <div className='modal-backdrop show'></div>

          <div className="modal show d-block" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Edit Item
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Edit item step ke : {currentItem['index'] + 1}</p>
                  {/* Tambahkan form untuk mengedit item di sini */}
                  <form action="" onSubmit={handleSubmit}>
                    <div className='input-group'>
                      <input 
                        type="text"  
                        className='form-control'
                        value={currentInputValue['item']}
                        onChange={(e) => setInputValue({index:currentItem['index'],item:e.target.value})}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showModalDel && (
        <>
        <div className='modal-backdrop show'></div>

        <div className="modal show d-block" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Delete Item
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModalDel}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin menghapus Item ke : {currentItem['index'] + 1}?</p>
                {/* Tambahkan form untuk mengedit item di sini */}
                
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModalDel}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteSubmit}>
                  Delete Item
                </button>
              </div>
            </div>
          </div>
        </div>
        </>
      )}

      {
        showModalAdd && (
          <>
          <div className='modal-backdrop show'></div>
            <div className="modal show d-block" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Add new Item
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleCloseModalAdd}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Tambahkan item baru ke {data.length + 1} disini</p>
                    {/* Tambahkan form untuk mengedit item di sini */}
                    <form action="" onSubmit={handleSubmit}>
                      <div className='input-group'>
                        <input 
                          type="text"  
                          className='form-control'
                          onChange={(e) => setAddInputValue(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseModalAdd}
                    >
                      Cancel
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmitAdd}>
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }

    </div>
  );
};

export default SopPage;
