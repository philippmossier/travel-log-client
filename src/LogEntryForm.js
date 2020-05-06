import React from 'react'
import { useForm } from "react-hook-form";

import { createLogEntry} from './API';

const LogEntryForm = ({location})=>  {
  const { register, handleSubmit} = useForm();

  const onSubmit = async (data) => {
    try {
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntry(data);
      console.log(created) ;
    } catch (error) {
      console.log(error)
    }
    
  }
  return (   
      <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
        <label htmlFor="title">Title</label>
        <input name="title" required ref={register}></input>

        <label htmlFor="comments ">Comments</label>
        <textarea name="comments" id="" rows="3" ref={register}></textarea>

        <label htmlFor="description">Description</label>
        <textarea name="description" rows="3" ref={register}></textarea>

        <label htmlFor="image">Image</label>
        <textarea name="image" ref={register}></textarea>

        <label htmlFor="visitDate">Visit Date</label>
        <input name="visitDate" type="date" required ref={register}/>

        <button>Save entry</button>
      </form>

  )
}

export default LogEntryForm
