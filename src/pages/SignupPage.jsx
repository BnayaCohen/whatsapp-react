import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

export const SignupPage = () => {

  const onSignup = useOutletContext();

  const phoneRef = useRef()
  const nameRef = useRef()
  const statusRef = useRef()
  const getFormInputs = () => ({
    phone: phoneRef.current.value,
    name: nameRef.current.value,
    status: statusRef.current.value,
  })

  return (
    <section className='screen'>
    <form className='signup-page' onSubmit={(ev) => onSignup(ev,getFormInputs())}>
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
