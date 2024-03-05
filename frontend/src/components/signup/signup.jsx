import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';


export default function Signup() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    //confirm password: "",
    birthdate: "",
    gender: "",
    bio: ""
  });

  const [error, setError] = useState();
  
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input}) => {
    setData({...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/auth/signup";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if(error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  }

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>Sign in</button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create an Account</h1>
            <input type="text" placeholder="First Name" name="firstName" value={data.firstName} onChange={handleChange} className={styles.input} required/>
            <input type="text" placeholder="Last Name" name="lastName" value={data.lastName} onChange={handleChange} className={styles.input} required/>
            <input type="text" placeholder="Username" name="firstName" value={data.username} onChange={handleChange} className={styles.input} required/>
            <input type="email" placeholder="Email" name="email" value={data.password} onChange={handleChange} className={styles.input} required/>
            <input type="password" placeholder="Password" name="password" value={data.password} onChange={handleChange} className={styles.input} required/>
            <input type="date" placeholder="Birthdate" name="birthdate" value={data.birthdate} onChange={handleChange} className={styles.input} required/>
            <textarea placeholder="tell us about yourself" rows="3" cols="30" name="bio" value={data.bio} className={styles.textarea} ></textarea>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type='submit' className={styles.green_btn}>Sign up</button>
          </form>
        </div>
      </div>
    </div>
  )
};
