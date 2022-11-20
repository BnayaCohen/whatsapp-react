import { useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

export const SignupPage = () => {

  const onSignup = useOutletContext();

  const phoneRef = useRef()
  const nameRef = useRef()
  const statusRef = useRef()
  const navigate = useNavigate()

  const getFormInputs = () => ({
    phone: phoneRef.current.value,
    name: nameRef.current.value,
    status: statusRef.current.value,
  })

  const onCloseModal = () => {
    navigate('/')
  }

  return (
    <section className='screen' onClick={onCloseModal}>
      <form className='signup-page' onSubmit={(ev) => onSignup(ev, getFormInputs())} onClick={(e) => e.stopPropagation()}>
        <h1 className='signup-title'>Sign Up to WusApp</h1>
        
        <section className='form-input'>
          <label htmlFor="phone">Phone</label>
          <input ref={phoneRef} name='phone' type='text' />
        </section>

        <section className='form-input'>
          <label htmlFor="name">Name</label>
          <input ref={nameRef} name='name' type="text" />
        </section>

        <section className='form-input'>
          <label htmlFor="status">Status</label>
          <input ref={statusRef} name='status' type='text' />
        </section>
        <button className='btn'>Sign Up</button>
      </form>
    </section>
  )
}
