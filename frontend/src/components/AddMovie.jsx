import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMovie = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    director: '',
    release_date: '',
    genre: '',
    duration: '',
    synopsis: '',
    cast: '',
    poster: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:3001/Movies', {
        ...formData,
        duration: parseInt(formData.duration) // Convert to integer
      });
      
      alert('Film berhasil ditambahkan!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding movie:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Gagal menambahkan film. Silakan coba lagi.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '800px' }}>
      <h1 className="title">Tambah Film Baru</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Judul Film</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Masukkan judul film"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Sutradara</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="director"
              placeholder="Masukkan nama sutradara"
              value={formData.director}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Tanggal Rilis</label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  name="release_date"
                  value={formData.release_date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="column">
            <div className="field">
              <label className="label">Durasi (menit)</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="duration"
                  placeholder="Contoh: 120"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Genre</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="genre"
              placeholder="Contoh: Drama, Action, Horror"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Pemeran</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="cast"
              placeholder="Masukkan nama-nama pemeran (pisahkan dengan koma)"
              value={formData.cast}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Sinopsis</label>
          <div className="control">
            <textarea
              className="textarea"
              name="synopsis"
              placeholder="Masukkan sinopsis film"
              rows="4"
              value={formData.synopsis}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="field">
          <label className="label">URL Poster</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="poster"
              placeholder="Contoh: /uploads/posters/namafilm.jpg"
              value={formData.poster}
              onChange={handleChange}
            />
          </div>
          <p className="help">Upload poster ke folder backend/public/uploads/posters/ terlebih dahulu</p>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-primary">
              Simpan Film
            </button>
          </div>
          <div className="control">
            <button type="button" className="button is-light" onClick={handleCancel}>
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;