import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';


export default function Login() {
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/auth/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.token);
      window.location = "/home";
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.Login_form_container}>
        <div className={styles.left} onSubmit={handleSubmit}>
          <form>
            <h1>Login</h1>
            <input type="text" placeholder="Username" name="username" value={data.username} onChange={handleChange} className={styles.input} required/>
            <input type="password" placeholder="Password" name="password" value={data.password} onChange={handleChange} className={styles.input} required/>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>Login</button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>Don't you have an account yet ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
