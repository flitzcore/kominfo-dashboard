import { useState, useEffect } from 'react';
// import styles from '../style/Dashboard.module.css'
import axios from 'axios';
import config from '../env/config';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [data, setData] = useState([]); // Inisialisasi sebagai array kosong
  const [loading, setLoading] = useState(true); // Inisialisasi dengan true
  const [error, setError] = useState(null);
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [addInputValue, setAddInputValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.apiEndpoint}/add`);
        const result = response.data; // Axios sudah otomatis parsing JSON
        setData(result.data); // Menyimpan data dari response
        setLoading(false);
        console.log(result); // Lakukan logging di sini
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if(showModalAdd) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    }
  }, [showModalAdd]);

  // Jika masih loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Jika terjadi error
  if (error) {
    return <div>{error}</div>;
  }

  const handleEdit = (id)  => {
    console.log(`berjalan ke halaman ${id}`);
    navigate(`/dashboard/${encodeURIComponent(id)}`)
    
  }

  const openModalAdd = () => {
    setShowModalAdd(true);
  }

  const closeModalAdd = () => {
    setShowModalAdd(false);
  }

  const addFlowchart = async () => {
    console.log(addInputValue)

    try {
      const url = `${config.apiEndpoint}/add`;
      
      await axios.post(url, {
        Title: addInputValue
      });

      console.log('Data berhasil ditambahkan');
      navigate(`/dashboard/${encodeURIComponent(addInputValue)}`)
      setShowModalAdd(false);

    } catch(error) {
      console.log("gagal update data", error)
    }
  }

  // Jika data sudah di-load, render komponen
  return (
    <>
    <div className=' my-3 py-3' >
      <h2 className=''>Flowchart</h2>
      <div className=' mt-5' >
        <button className='btn btn-primary' onClick={openModalAdd}>Add FlowChart</button>  
      </div>
    </div>

    <div>
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
              <tr key={item.ID}>
                <th scope="row">{index + 1}</th>
                <td>{item.Title}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(item.Title)}
                  >
                    Edit
                  </button>
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

    {
      showModalAdd && (
        <>
          <div className='modal-backdrop show'></div>

          <div className='modal show d-block' tabIndex='-1' aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className='modal-dialog modal-dialog-centered'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h1 className='modal-title fs-5'>
                    Add new Flowchart
                  </h1>

                  <button
                    type='button'
                    className='btn-close'
                    onClick={closeModalAdd}
                    aria-label='close'
                  ></button>
                </div>

                <div className='modal-body'>
                  <p>Tambahkan Flowchart baru disini</p>

                  <form action="">
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
                      onClick={closeModalAdd}
                    >
                      Cancel
                    </button>
                    <button type="button" className="btn btn-primary" onClick={addFlowchart}>
                      Add Flowchart
                    </button>
                  </div>

              </div>
            </div>
          </div>
        </>
      )
    }
    
    </>
  );
}

export default Dashboard;
